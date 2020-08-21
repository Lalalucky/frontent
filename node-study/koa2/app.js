const Koa = require('koa'),
	path = require('path'),
	router = require('koa-router')(),
	views = require('koa-views'),
	static = require('koa-static'),
	render = require('koa-art-template'),
	bodyParser = require('koa-bodyparser');

const DB = require('./common/db.js');

let app = new Koa();
// 模板引擎
render(app, {
	root: path.join(__dirname, 'views'), // 视图的位置
	extname: '.html', // 后缀名
	debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});
// console.log(DB);

// app.use(views('views', { map: { html: 'ejs' } }))  这种方式后缀名是 .html
// app.use(
// 	views('views', {
// 		extension: 'ejs' //  后缀名是ejs
// 	})
// );

// 获得响应数据
app.use(bodyParser());

// 中间件可以配置多个
app.use(static(__dirname + '/static'));

// ejs
// router.get('/', async ctx => {
// 	// ctx.body = '首页';
// 	let list = ['aaaaaaaaa', 'bbbbbbbbbbbbbbbb', 'cccccccccccccc'];
// 	await ctx.render('index', {
// 		title: 'hello',
// 		list: list
// 	});
// });

// MongoClient.connect(dbUrl, (err, client) => {
// 	if (err) {
// 		console.log(err);
// 		return false;
// 	}
// 	let db = client.db(dbName);
// 	db.collection('user').insertOne({ username: 'caowu', age: '88', sex: '男' }, (error, res) => {
// 		if (!error) {
// 			console.log('增加成功');
// 			client.close();
// 		}
// 	});
// });

// MongoClient.connect(dbUrl, (err, client) => {
// 	if (err) {
// 		console.log(err);
// 		return false;
// 	}
// 	let db = client.db(dbName);
// 	let res = db.collection('user').find({});
// 	res.toArray((err, docs) => {
// 		console.log(docs);
// 	});
// });

router.get('/', async ctx => {
	let data = await DB.find('user', {});
	console.log(data);
	// ctx.body = '首页';
	// let list = ['aaaaaaaaa', 'bbbbbbbbbbbbbbbb', 'cccccccccccccc'];
	// let container = '<h2>我是 html</h2>';
	await ctx.render('index', {
		data
	});
});

router.get('/add', async ctx => {
	await ctx.render('add');
});

router.get('/edit', async ctx => {
	let _id = ctx.query.id;
	let data = await DB.find('user', { _id: DB.getObjectID(_id) });
	// console.log(data);
	await ctx.render('edit', { data: data[0] });
});

router.post('/doEditUser', async ctx => {
	let req = ctx.request.body;
	const { id, username, age, sex } = req;
	console.log(username);
	// 5f1a897f9192f724189494c4
	let result = await DB.update('user', { _id: DB.getObjectID(id) }, { username, age, sex });
	// console.log(data);
	try {
		if (result.result.ok) {
			ctx.redirect('/');
		}
	} catch (error) {
		console.log(error);
		return;
	}
	// await ctx.render('edit', { data: data[0] });
});

router.post('/doAdd', async ctx => {
	console.log(ctx.request.body);
	ctx.body = ctx.request.body;
});

router.post('/doAddUser', async ctx => {
	let data = ctx.request.body;
	let result = await DB.insert('user', data);
	// ctx.body = result;
	try {
		if (result.result.ok) {
			ctx.redirect('/');
		}
	} catch (error) {
		console.log(error);
		return;
	}
});

router.post('/getIndexBanner', async ctx => {
	let data = ctx.request.body;
	console.log('获取banner++++++++++++++++++++++++++');
	// let result = await DB.insert('user', data);
	// ctx.body = result;
	// try {
	// 	if (result.result.ok) {
	// 		ctx.redirect('/');
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// 	return;
	// }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000);
