const fs = require('fs');

exports.getMime = extname => {
	switch (extname) {
		case '.html':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
			return 'text/javascript';
		default:
			return 'text/html';
	}
};

exports.getFileMime = extname => {
	// return new Promise((resolve, reject) => {
	// 	fs.readFile('./data/mime.json', (err, data) => {
	// 		if (err) {
	// 			// throw new Error(err);
	// 			reject(err);
	// 			return false;
	// 		}
	// 		// console.log(data.toString());
	// 		let mimeObj = JSON.parse(data.toString());

	// 		resolve(mimeObj[extname]);
	// 	});
	// });
	var data = fs.readFileSync('./data/mime.json'); // 同步读取数据
	let mimeObj = JSON.parse(data.toString());
	return mimeObj[extname];
};
