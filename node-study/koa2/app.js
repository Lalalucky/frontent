const Koa = require('koa'),
	router = require('koa-router')(),
	views = require('koa-views');

let app = new Koa();

// app.use(views('views', { map: { html: 'ejs' } }))  这种方式后缀名是 .html
app.use(
	views('views', {
		extension: 'ejs'
	})
);

router.get('/', async ctx => {
	// ctx.body = '首页';
	await ctx.render('index', {
		title: 'hello'
	});
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
