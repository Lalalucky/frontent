const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controllers = require('./controllers.js');
const router = require('koa-router')();
const static = require('koa-static');
const app = new Koa();

app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});

// parse request body:
app.use(bodyParser());

// add controllers:
app.use(controller());

app.listen(3000);

// app.post('/phoneLocation', (req, res) => {
// 	setTimeout(() => {
// 		res.json({
// 			success: true,
// 			obj: {
// 				province: '安徽',
// 				city: '合肥'
// 			}
// 		});
// 	}, 1000);
// });

// app.post('/faceList', (req, res) => {
// 	setTimeout(() => {
// 		res.json({
// 			success: true,
// 			obj: ['20元', '30元', '40元']
// 		});
// 	}, 1000);
// });
