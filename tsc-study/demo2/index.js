function Person() {
	this.name = '张三';
	this.age = 20;
	this.run = function() {
		console.log(this.name);
	};
}
Person.getInfo = function() {
	// 静态方法
	console.log('----getInfo------');
};
Person.prototype.sex = '男';
Person.prototype.work = function() {
	console.log(this.name);
};

let p = new Person();
// p.work();
// Person.run();    // error
Person.getInfo(); // -----getInfo----
// Person.work();   // error

p.run();
// p.getInfo();     // error
p.work();
