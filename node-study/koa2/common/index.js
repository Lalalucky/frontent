exports.getPostData = ctx => {
	return new Promise((resolve, reject) => {
		// 获取异步数据
		try {
			let data = '';
			ctx.req.on('data', chunk => {
				data += chunk;
			});
			ctx.req.on('end', chunk => {
				resolve(data);
			});
		} catch (error) {
			reject(error);
		}
	});
};
