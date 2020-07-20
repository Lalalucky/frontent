const fs = require('fs');
const path = require('path');
const url = require('url');

let getFileMime = extname => {
	var data = fs.readFileSync('./data/mime.json'); // 同步读取数据
	let mimeObj = JSON.parse(data.toString());
	return mimeObj[extname];
};

exports.static = (req, rep, staticPath) => {
	// debugger;
	// http:localhost:8081/index.html
	// 1. 获取地址
	let pathname = url.parse(req.url).pathname;
	pathname = pathname == '/' ? '/index.html' : pathname;
	// 获取后缀名
	let extname = path.extname(pathname);
	// 2.fs来读取文件
	if (pathname != '/favicon.ico') {
		fs.readFile('./' + staticPath + pathname, async (err, data) => {
			// if (err) {
			// 	rep.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
			// 	rep.end('没有此页面');
			// 	return;
			// }
			if (!err) {
				let mime = getFileMime(extname);
				rep.writeHead(200, { 'Content-Type': '' + mime + ';charset=utf-8' });
				rep.end(data);
			}
		});
	}
};
