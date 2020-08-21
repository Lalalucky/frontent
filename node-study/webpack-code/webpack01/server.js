const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const app = new Koa();

//设置静态资源的路径
const staticPath = '/build';

app.use(static(path.join(__dirname, staticPath)));

app.use(async ctx => {
	ctx.body = 'hello world';
});

app.listen(3001, () => {
	console.log('server is starting at port 3001');
});
