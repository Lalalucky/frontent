const http = require('http');
const routes = require('./module/common');
const url = require('url');
const ejs = require('ejs')

// common.getFileMime('.html');

http
	.createServer(function(req, rep) {
		routes.static(req, rep, 'static');
	})
	.listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
