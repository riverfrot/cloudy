const Router = require("koa-router");
const auth = new Router();
const authCtrl = require("./auth.ctrl");

auth.post("/register/local", authCtrl.localRegister);
auth.post("/login/local", authCtrl.localLogin);
auth.post("/login/third", authCtrl.thirdLogin);
auth.post("/logout", authCtrl.logout);
auth.get("/check", authCtrl.check);

module.exports = auth;
