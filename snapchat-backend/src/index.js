require("dotenv").config();

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const mongoose = require("mongoose");

const session = require("koa-session");

const {
  PORT: port = 4000, // 값이 존재하지 않는다면 기본적으로 포트는 4000번을 열도록 함.
  MONGO_URI: MONGO_URI,
  COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise; //Node 의 Promise를 사용하도록 설정
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connecgt to mongoDB");
  })
  .catch(e => {
    console.log(e);
  });

const api = require("./api");

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());

app.use(bodyParser());

// 세션/키 적용

const sessionConfig = {
  maxAge: 86400000 // 하루
  // signed: true (기본으로 설정 되어 있습니다.)
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

// // 라우터 설정
// router.get('/', (ctx)=> {
//     ctx.body = '홈';
// });

// router.get('/about/:name?', (ctx)=> {
//     const { name } = ctx.params;
//     // name의 존재 유무에 따라 다른 결과 출력

//     ctx.body = name ? `${name}의 소개` : '소개';

// });

// router.get('/posts', (ctx) => {
//     const { id } = ctx.query;

//     // id의 존재 유무에 따라 다른 결과 출력

//     ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다';

// });

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log("listening to port ", port);
});
