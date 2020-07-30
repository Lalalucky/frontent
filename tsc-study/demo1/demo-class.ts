/** @format */

/** 
 * interface Animal {
    name: string
    eat(str: string): void
}

    class Dog implements Animal {
        name: string
        constructor(name: string) {
            this.name = name
        }
        eat() {
            console.log(this.name + '吃食物')
        }
    }

    var d = new Dog('小黑')
    d.eat()
*/

// 泛型接口
// interface ConfigFn {
// 	(key: string, value: string): string;
// }

// var setData: ConfigFn = function(key: string, value: string): string {
// 	return key + value;
// };

// setData('wang', 'dsf');

// interface ConfigFn {
// 	<T>(value: T): T;
// }

// var getData: ConfigFn = function<T>(value: T): T {
// 	return value;
// };

// getData<string>('张三');

interface ConfigFn<T> {
	(value: T): T;
}

function getData<T>(value: T): T {
	return value;
}

var myGetData: ConfigFn<string> = getData;
myGetData('4');
