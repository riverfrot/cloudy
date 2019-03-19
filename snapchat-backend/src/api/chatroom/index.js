const Router = require("koa-router");
const chatroom = new Router();
const chatroomCtrl = require("./chatroom.ctrl");

chatroom.get("/", chatroomCtrl.list);
chatroom.post("/register", chatroomCtrl.register);

module.exports = chatroom;
