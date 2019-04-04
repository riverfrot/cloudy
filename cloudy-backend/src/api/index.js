const Router = require("koa-router");
const posts = require("./posts");
const auth = require("./auth");
const chatroom = require("./chatroom");
const chatmessage = require("./chatmessage");

const api = new Router();

api.use("/posts", posts.routes());
api.use("/auth", auth.routes());
api.use("/chatroom", chatroom.routes());
api.use("/chatmessage", chatmessage.routes());

//라우터를 내보냅니다.
module.exports = api;
