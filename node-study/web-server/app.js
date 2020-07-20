const http = require('http');
const fs = require('fs');
const path = require('path');
const common = require('./module/common.js');
const url = require('url');

// common.getFileMime('.html');

http
	.createServer(function(req, rep) {
		debugger;
		// http:localhost:8081/index.html
		// 1. 获取地址
		let pathname = url.parse(req.url).pathname;
		pathname = pathname == '/' ? '/index.html' : pathname;
		// 获取后缀名
		let extname = path.extname(pathname);
		// 2.fs来读取文件
		if (pathname != '/favicon.ico') {
			fs.readFile('./static' + pathname, async (err, data) => {
				if (err) {
					rep.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
					rep.end('没有此页面');
					return;
				}
				let mime = common.getFileMime(extname);
				rep.writeHead(200, { 'Content-Type': '' + mime + ';charset=utf-8' });
				rep.end(data);
			});
		}
	})
	.listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
