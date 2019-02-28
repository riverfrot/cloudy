// require("dotenv").config();

// const Koa = require("koa");
// const Router = require("koa-router");
// const bodyParser = require("koa-bodyparser");

// const mongoose = require("mongoose");

// const session = require("koa-session");

// const {
//   PORT: port = 4000, // 값이 존재하지 않는다면 기본적으로 포트는 4000번을 열도록 함.
//   MONGO_URI: MONGO_URI,
//   COOKIE_SIGN_KEY: signKey
// } = process.env;

// mongoose.Promise = global.Promise; //Node 의 Promise를 사용하도록 설정
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("connecgt to mongoDB");
//   })
//   .catch(e => {
//     console.log(e);
//   });

// const api = require("./api");

// const app = new Koa();
// const router = new Router();

// router.use("/api", api.routes());

// app.use(bodyParser());

// // 세션/키 적용

// const sessionConfig = {
//   maxAge: 86400000 // 하루
//   // signed: true (기본으로 설정 되어 있습니다.)
// };

// app.use(session(sessionConfig, app));
// app.keys = [signKey];

// app.use(router.routes()).use(router.allowedMethods());

// app.listen(port, () => {
//   console.log("listening to port ", port);
// });

require("dotenv").config(); // .env 파일에서 환경변수 불러오기
const port = process.env.PORT || 4000; // PORT 값이 설정되어있지 않다면 4001번을 사용합니다.

const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const api = require("./api");
const { jwtMiddleware } = require("./lib/token");

const app = new Koa();
const router = new Router();

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

app.listen(port, () => {
  console.log("Koa server is listening to port: " + port);
});

// router.get("/", (ctx, next) => {
//   ctx.body = "루트 페이지 입니다.";
// });

router.use("/api", api.routes());
