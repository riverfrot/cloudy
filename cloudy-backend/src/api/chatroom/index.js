const Router = require("koa-router");
const chatroom = new Router();
const chatroomCtrl = require("./chatroom.ctrl");

chatroom.get("/", chatroomCtrl.list);
chatroom.post("/register", chatroomCtrl.register);
chatroom.post("/register/dummy", chatroomCtrl.dummyregister);

module.exports = chatroom;
