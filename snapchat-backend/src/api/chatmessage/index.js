const Router = require("koa-router");
const chatmessage = new Router();
const chatmessageCtrl = require("./chatmessage.ctrl");

chatmessage.get("/", chatmessageCtrl.list);

module.exports = chatmessage;
