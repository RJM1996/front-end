'use strict'; // 使用严格模式

// 多行字符串
var string = `这是一个
多行的
字符串`;
console.log(string);

// 数组
var arr = [1, 2, 4, 112, 'hello', null, true];
console.log(arr.length);
arr.length = 9;
console.log(arr);
arr[9] = "第十个元素";
console.log(arr)
// 获得指定元素的下标
console.log(arr.indexOf(112))
// 从下标为3的元素开始到结束
console.log(arr.slice(3))
// 下标1开始, 3结束, 不包括3
console.log(arr.slice(1, 3))
// 多维数组
var arr = [[1, 2, 3], [400, 500, 600], '-'];
console.log(arr[1][1])

var arr = ['小明', '小红', '大军', '阿黄'];
arr.sort();
console.log("欢迎" + arr[0] + arr[1] + arr[2] + '和' + arr[3] + "同学!")

// 对象
var xiaoming = {
    name: "小明",
    age: 12
}
// hasOwnProperty: 用来判断一个属性是否是一个对象本身的, 而不是继承的
console.log(xiaoming.hasOwnProperty('name'))
console.log(xiaoming.hasOwnProperty('toString'))

// 条件判断 if else 和其他语言一样
var s = '123'
if (s.length) {
    console.log(true)
}
// JavaScript把null、undefined、0、NaN和空字符串''视为false
// 其他值一概视为true，因此上述代码条件判断的结果是true

// 循环: for while do...while 和其他语言一样
// for ... in 循环
for (var key in xiaoming) {
    console.log(key)
}
// Array也是对象，它的每个元素的索引被视为对象的属性
var arr = [1, 2, 4, 112, 'hello', null, true];
for (var key in arr) {
    // console.log(key)
    console.log(arr[key])
}

// Map 和 Set
var map = new Map()
// 使用Array来初始化Set
var set = new Set([1, 3, 4, 5, 6, 6, 7, 7])
map.set('tom', 21)
map.set('jack', 30)
map.set('lucy', 19)
console.log(map)
console.log(set)

// iterable 类型
// Array、Map和Set都属于iterable类型
// 具有iterable类型的集合可以通过新的for ... of循环来遍历
for (const iterator of map) {
    console.log(iterator)
}
for (const iterator of arr) {
    console.log(iterator)
}
arr.forEach(function (element, index, array) {
    console.log(element + ' index=' + index)
})

// 函数
function abs(x) {
    // if(typeof x !== 'number'){
    //     throw 'Not a number';
    // }
    // if(arguments.length !== 1){
    //     throw '参数个数不匹配';
    // }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
console.log(abs(-99))
console.log(abs())

var sum = function (a, b, ...rest) {
    console.log(rest);
    return a + b;
}
console.log(sum(10, 99, 22, 44));

function area_of_circle(r, pi) {
    // 如果不传pi,则默认为3.14
    if (arguments.length == 1) {
        pi = 3.14;
    }
    return pi * r * r;
}

function max(a, b) {
    if (a > b) {
        return {
            a
        }

    } else {
        // JS会自动给语句末尾加上 ;
        // 所以return后面不能啥也没有
        return
        b;
    }

}
console.log(max(10, 2))

// JavaScript的函数定义有个特点
// 它会先扫描整个函数体的语句
// 把所有申明的变量“提升”到函数顶部
function foo() {
    // 该语句不会报错, 因为变量y的声明已经提升到了函数顶部
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}
foo()

// 在函数内部定义变量时
// 请严格遵守“在函数内部首先申明所有变量”这一规则
// 最常见的做法是用一个var申明函数内部用到的所有变量
function foo1() {
    var x = 1,
        y = x + 1,
        z = 10,
        i;
    console.log(x, y, z, i);
}
foo1()

// 全局作用域
// 在浏览器 JavaScript 中，通常 window 是全局对象
// 而 Node.js 中的全局对象是 global
// 所有全局变量（除了 global 本身以外）都是 global 对象的属性
// 但是, 在 Node.js 中你不可能在最外层定义变量
// 因为所有用户代码都是属于当前模块的
// 而模块本身不是最外层上下文
var course = "learn JavaScript";
console.log(course);
// 因此这里的 global.course 是未定义的
console.log(global.course);
console.log(__filename)
console.log(__dirname)

// 命名空间
// 因为全局函数都会绑定到全局对象window上, 那么如果不同的JS文件
// 使用了相同的全局变量, 或者定义了同名函数, 就会造成命名冲突
// 为了减少冲突, 可以把自己所有的变量和函数都绑定到一个全局变量中
var MYAPP = {};
MYAPP.name = 'myapp';
MYAPP.version = 'V1.0';
MYAPP.foo = function () {
    return 'fun';
};

// 块级作用域
// 在JS中, 要想定义一个块级作用域的变量, 需要使用关键字let
function foo() {
    var sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += i;
    }
    // 使用let, 在这里 i 就不能访问了, 使用var则可以
    // console.log(i);
}
foo();

// 常量: 不能被修改
const PI = 3.14;
// PI = 3.1415; // 会报错或者不生效
console.log(PI);

// 解构赋值: 同时对一组变量进行赋值
var array = ['hello', 'JavaScript', 'ES6'];
var [x, y, z] = array;
console.log(x, y, z)
// 从一个对象中取出若干属性, 也可以使用解构赋值
var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var { name, age, passport } = person;
console.log(name, age, passport)
// 快速交换两个变量的值
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);

function buildDate({ year, month, day, hour = 0, minute = 0, second = 0 }) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
var date = buildDate({ year: 2019, month: 10, day: 15 });
console.log(date);
console.log(date.getTime());

// 方法: 在一个对象中绑定函数, 称为这个对象的方法
var xiaoming = {
    name: "小明",
    birth: 1996,
    age: function () {
        var year = new Date().getUTCFullYear();
        return year - this.birth;
    }
};

console.log(xiaoming.age())

function getAge() {
    var year = new Date().getUTCFullYear();
    return year - this.birth;
}
var xiaoming = {
    name: "小明",
    birth: 1996,
    age: getAge
};
console.log(xiaoming.age())
// console.log(getAge()) // 会报错, 因为在严格模式下, 函数的this指向undefined

// 指定函数的 this 指向
// 使用apply方法, this指向xiaoming, 参数为空
console.log(getAge.apply(xiaoming, []));
// 与apply类似的方法 call]
// 区别: apply将参数作为array传入, call将参数顺序传入
var max = Math.max.call(null, 3, 2, 4)
console.log(max)

// 统计函数parse的调用次数
var count = 0;
function parse() {
    console.log('hello')
}
var oldParse = parse; // 先保存原函数

var parse = function () {
    count++;
    return oldParse.apply(null, arguments);
}
for (let i = 0; i < 5; i++) {
    parse();
}
console.log(count)
