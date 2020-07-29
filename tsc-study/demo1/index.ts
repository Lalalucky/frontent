function push(array: any[], ...items: any[]) {
	items.forEach(function(item) {
		array.push(item);
	});
}

let a: any[] = [];
push(a, 1, 2, 3);

function reverse(x: number | string): number | string {
	let res: any;
	if (typeof x == 'string') {
		res = x
			.toString()
			.split('')
			.reverse()
			.join('');
	} else {
		res = +x
			.toString()
			.split('')
			.reverse()
			.join('');
	}
	return res;
}
console.log(typeof reverse('sasd'));
