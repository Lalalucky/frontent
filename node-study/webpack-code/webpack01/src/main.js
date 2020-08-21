// index.js  webpack的入口起点文件

import './data.json';

import './asset/css/common.css';
import './asset/css/base.less';

import './asset/iconfont/iconfont.css';

const fn = (a, b) => {
	return a + b;
};

import print from './print.js';
print();

console.log(fn(1, 2));

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker,js')
			.then(() => {
				console.log('注册好了');
			})
			.catch(() => {
				console.log('注册失败');
			});
	});
}
