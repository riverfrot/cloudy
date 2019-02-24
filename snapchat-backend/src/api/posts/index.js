const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId ,postsCtrl.read);
posts.delete('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId ,postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkLogin, postsCtrl.checkObjectId ,postsCtrl.update);

module.exports = posts;