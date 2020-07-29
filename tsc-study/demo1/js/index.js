"use strict";
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
var a = [];
push(a, 1, 2, 3);
function reverse(x) {
    var res;
    if (typeof x == 'string') {
        res = x
            .toString()
            .split('')
            .reverse()
            .join('');
    }
    else {
        res = +x
            .toString()
            .split('')
            .reverse()
            .join('');
    }
    return res;
}
console.log(typeof reverse('sasd'));
