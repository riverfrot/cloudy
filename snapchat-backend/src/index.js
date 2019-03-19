require("dotenv").config(); // .env 파일에서 환경변수 불러오기

// const hashmap = require("./lib/hashmap");
const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4001번을 사용합니다.

const HashMap = require("HashMap");
const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const api = require("./api");
const { jwtMiddleware } = require("./lib/token");
const ChatMessage = require("./model/ChatMessage");

const app = new Koa();
const router = new Router();
const chatRoomHashMap = new HashMap(); //채팅 방을 저장 하기 위한 용도
//첫번째 인자에는 닉네임, 두번째에는 방이름이 들어가있음

mongoose.Promise = global.Promise; // Node의 네이티브 Promise 사용
mongoose
  .connect(process.env.MONGO_URI)
  .then(response => {
    console.log("Success connected to mongoDB");
  })
  .catch(error => {
    console.log(error);
  });

app
  .use(jwtMiddleware)
  .use(bodyParser()) // bodyParser는 라우터 코드보다 상단에 있어야 합니다.
  .use(router.routes())
  .use(router.allowedMethods());

const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg, nickname) => {
    console.log("message: sender" + msg);

    socket.broadcast
      .to(chatRoomHashMap.get(nickname))
      .emit("chat message", msg, nickname); // 나를 제외한 그룹 전체

    const text = msg;
    const userID = nickname;
    const roomID = chatRoomHashMap.get(nickname);

    //  새 채팅방을 인스턴스를 만듭니다.
    const chatMessage = new ChatMessage({
      roomID,
      text,
      userID
    });

    try {
      chatMessage.save(); // 데이터베이스에 등록합니다.
    } catch (e) {
      // 데이터베이스의 오류가 발생할 경우 에러 처리하는 구문.,
      console.log(e);
    }
  });
  // socket.on("chat message", msg => {
  //   socket.broadcast.emit("chat message", msg);
  //   console.log("message: " + msg);
  // });
  socket.on("join room", (roomname, nickname) => {
    socket.join(roomname);
    chatRoomHashMap.set(nickname, roomname);
    console.log(chatRoomHashMap.size);
    // socket.broadcast.emit("chat message", msg);
    console.log("RoomName: " + roomname);
  });
});

// io.on("connection", function(socket) {
//   socket.on("chat message", function(msg) {
//     socket.broadcast.emit("chat message", msg);
//     console.log("message: " + msg);
//   });
// });

server.listen(port, () => {
  console.log("Koa server is listening to port: " + port);
});

router.use("/api", api.routes());
