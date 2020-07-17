let http = require('http');
let fs = require('fs');
let path = require('path');
const common = require('./module/common.js');
http
	.createServer(function(req, rep) {
		// http:localhost:8081/index.html
		// 1. 获取地址
		let pathname = req.url;
		pathname = pathname == '/' ? '/index.html' : pathname;
		// 获取后缀名
		let extname = path.extname(pathname);
		// 2.fs来读取文件
		if (pathname != '/favicon.ico') {
			fs.readFile('./static' + pathname, (err, data) => {
				if (err) {
					rep.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
					rep.end('没有此页面');
					return;
				}
				let mime = common.getMime(extname);
				rep.writeHead(200, { 'Content-Type': '' + mime + ';charset=utf-8' });
				rep.end(data);
			});
		}
	})
	.listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
