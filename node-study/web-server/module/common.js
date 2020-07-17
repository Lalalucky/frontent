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
	fs.readFile('./data/mime.json', (err, data) => {
		if (err) {
			// throw new Error(err);
			console.log(err);
			return false;
		}
		// console.log(data.toString());
		let mimeObj = JSON.parse(data.toString());
		// console.log(mimeObj);

		console.log('-----');
		// console.log(mimeObj[extname]);
	});
};
