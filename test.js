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

// 高阶函数: 一个函数可以接收另一个函数为参数
var x = -5,
    y = 6,
    foo = Math.abs;
function addAbs(x, y, foo) {
    return foo(x) + foo(y);
}
// 这里把指向函数 Math.abs 的变量 foo 作为参数传入了函数addAbs
console.log(addAbs(x, y, foo));

// Array的map方法: 将函数作为参数, 对Array中的每个元素执行该函数, 生成一个新的Array
function pow(x) {
    return x * x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow);
console.log(results);
// 将Array中的所有元素转化为字符串
results = arr.map(String);
console.log(results);
var num = 100;
num = String(num);
console.log(num);

// Array的reduce方法: 对Array中的元素做累积计算
function add(x, y) {
    return x + y;
}
// 上面函数的两个参数是必填的
// x表示Array的第一个元素/计算完成后的返回值
// y表示当前元素
// 也就是从数组的第一个元素开始和后面一个元素进行相加
// 相加结果赋给x, 然后又用x和下一个元素进行累积计算, 直到所有元素计算完毕
var res = arr.reduce(add);
console.log(res);
// 利用reduce求积
res = arr.reduce(
    function (x, y) {
        return x * y;
    }
);
console.log(res);
// 将Array变成Number
var arr = [1, 3, 5, 7, 9];
console.log(typeof arr);
arr = ['1', '3', '5', '7', '9'];
arr = arr.reduce(
    function (x, y) {
        return x * 10 + y * 1;
    }
);
console.log(typeof arr);
// 将字符串"13579"变成Array[1,3,5,7,9]
var string = "13579";
var arr = [];
for (let i = 0; i < string.length; i++) {
    arr.push(string.charAt(i));
}
console.log(arr);

function string2int(str) {
    var arr = new Array();
    for (let i = 0; i < str.length; i++) {
        arr.push(str.charAt(i) * 1);
    }
    return arr.reduce(
        function (x, y) {
            return x * 10 + y * 1;
        }
    );
}
var a = string2int('0');
console.log(a === 0);
console.log(string2int('12345'));
console.log(string2int('12300'));

// 测试:
if (string2int('0') === 0 && string2int('12345') === 12345 && string2int('12300') === 12300) {
    if (string2int.toString().indexOf('parseInt') !== -1) {
        console.log('请勿使用parseInt()!');
    } else if (string2int.toString().indexOf('Number') !== -1) {
        console.log('请勿使用Number()!');
    } else {
        console.log('测试通过!');
    }
}
else {
    console.log('测试失败!');
}

// 将输入不规范的英文名变为首字母大写, 其他小写的英文名
// 先将所有字母小写
function toLower(str) {
    return str.toLowerCase();
}
var name = ['adam', 'LISA', 'barT'];
// 再将首字母大写
function firstToUpper(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function normalize(arr) {
    arr = arr.map(toLower);
    return arr.map(firstToUpper);
}
name = normalize(name);
console.log(name)

// 注意: Array的map方法传递3个参数(元素, 元素下标, 数组)
// 给传入其中的函数
var arr = ["1", "2", "3"];
// 这里向parseInt函数传递了3个参数, 但实际只会接收前两个
// 第二个参数意为: 以几进制为基础, 将第一个参数转为Int
// 因为这里第二个参数是元素下标, 即: 0 1 2
// 分别意为: 以10进制 1进制 2进制来转换为Int
// 所以后两个数转换结果为 NaN
var res = arr.map(parseInt);
console.log(res);
// 解决方法
// 1. 使用自定义函数, 指定第二个参数
function returnInt(num) {
    return parseInt(num, 10);
}
res = arr.map(returnInt);
console.log(res);
// 2. 使用箭头函数, 只传一个参数, 则第二个参数默认为10
res = arr.map(str => parseInt(str));
console.log(res);
// 3. 使用Number
res = arr.map(Number);
console.log(res);

// Array的filter函数: 用于过滤某些元素
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
function isOdd(x) {
    return x % 2 !== 0;
}
console.log(isOdd(3));
// 对于每个元素调用函数isOdd
// 结果为true则保留, 为false则丢弃
arr = arr.filter(isOdd);
console.log(arr);
arr = ['A', '', 'B', null, undefined, 'C', '  '];
// 过滤空字符串
function isNotBlank(str) {
    var bool = (str && str.trim());
    console.log(bool);
    return bool;
}
arr = arr.filter(isNotBlank);
console.log(arr);
var a = ' ';
if (a) {
    console.log(a + "is true");
} else {
    console.log(a + "is false");
}
// 和map一样, filter也传递3个参数给回调函数: 元素 索引 数组
var arr = ['A', 'B', 'C'];
var r = arr.filter(function (element, index, self) {
    console.log(element); // 依次打印'A', 'B', 'C'
    console.log(index); // 依次打印0, 1, 2
    console.log(self); // self就是变量arr
    return true;
});
var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
// Array的indexOf方法只会返回在数组中第一次出现的元素下标
// 可以利用这个特性来去除Array中的重复元素
console.log(arr.indexOf("apple"));
function isFirstElement(element, index, self) {
    // 当前元素不是数组中第一个出现的, 返回false, 则丢弃
    return self.indexOf(element) === index;
}
arr = arr.filter(isFirstElement);
console.log(arr);

// 使用 filter 筛选出素数: 除了1和本身, 不能被其他数整除
function isPrimeNum(num) {
    if (num === 1) {
        return false;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
console.log(isPrimeNum(8));
var arr = new Array();
for (let i = 0; i < 100; i++) {
    arr.push(i);
}
arr = arr.filter(isPrimeNum);
console.log(arr);

// Array的sort函数: 默认把所有元素先转为string再排序
// 它也是一个高阶函数, 可以接收一个比较函数来实现自定义排序
var arr = [10, 20, 1, 2];
// 这样的排序结果是: 1,10,2,20
console.log(arr.sort());
// 为了让他能够从小到大排序, 需要定义一个比较函数
function ascSort(x, y) {
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    }
    return 0;
}
console.log(arr.sort(ascSort));

// Array对象的其他高阶函数
// every(): 判断数组的所有元素是否满足某个条件
var arr = ['Apple', 'pear', 'orange'];
// 判断数组中的每个元素是否都为小写
console.log(arr.every(
    function (s) {
        return s.toLowerCase() === s;
    }
));
// find(): 查找数组中符合条件的第一个元素. 找到返回这个元素, 否则返回 undefined
console.log(arr.find(
    function (s) {
        // return s.toLowerCase() === s;
        return s.toUpperCase() === s;
    }
));
// findIndex(): 和find类似, 找到了返回索引, 否则返回-1
console.log(arr.findIndex(function (s) {
    return s.toUpperCase() === s;
}));
// forEach(): 类似map, 但不会返回新的数组, 常用于遍历数组
arr.forEach(console.log);

// 闭包
// 高阶函数除了可以接收函数作为参数, 还可以将函数作为结果返回
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}
var arr = [1, 2, 3, 4, 5];
var foo = lazy_sum(arr);
console.log(foo);
console.log(foo());

// 借助闭包, 可以封装一个私有变量
// 闭包就是一个携带私有变量的函数
function create_counter(initial) {
    var x = initial || 0;
    return {
        inc: function () {
            return x += 1;
        }
    }
}
var c1 = create_counter(3);
console.log(c1.inc());
console.log(c1.inc());
console.log(c1.inc());

// 闭包还可以把多参数的函数变为单参数的函数
// 计算x的y次方
function make_pow(y) {
    var pow = function (x) {
        return Math.pow(x, y);
    }
    return pow;
}
console.log(typeof make_pow);
// 创建两个函数, 通过传入参数y, 可以指定计算x的多少次方
var pow2 = make_pow(2); // 函数pow2(): 计算平方
var pow3 = make_pow(3); // 函数pow2(): 计算立方
console.log(pow2(3));
console.log(pow3(3));

function pow2(x) {
    return Math.pow(x, 2);
}
console.log(pow2(3));

function count01() {
    var arr = [];
    for (var i = 1; i <= 3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}
// 在这里count01的类型是number
console.log(typeof count01);
console.log(count01 instanceof Number);
console.log(count01 instanceof Function);
console.log(count01 instanceof Array);
console.log(count01 instanceof Object);
// console.log(typeof count());
// var res = count();
// console.log(res);

// 箭头函数
var foo = x => x * x;
console.log(foo(5));
// 多个参数需要用括号
(x, y) => {
    return x + y;
}
var arr = [10, 20, 1, 2];
arr.sort(
    (x, y) => {
        return x > y ? 1 : -1;
    }
)
console.log(arr);

// 箭头函数的 this: 总是指向词法作用域, 也就是外层调用者obj
var obj = {
    birth: 1990,
    getAge: function () {
        var b = this.birth; // 1990
        var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
        // return fn();
        // 这里的this不会指向 { birth: 2000 }
        // 而是指向obj, 因此birth仍然是1990
        return fn.call({ birth: 2000 });
    }
};
console.log(obj.getAge());

// 生成器 generator: 使用function*定义
// 除了return语句, 还可以用yield返回多次
// 举例: 生成斐波那契数列
function* fib(max) {
    var a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n++;
    }
    return;
}
// 这里fib(5)只是创建了一个generator对象, 还没有执行
var foo = fib(5);
console.log(foo);
// 使用 generator 的 next() 方法执行
// 这只是执行了一次, 遇到yield a;就返回了
// 如果要执行完毕, 需要调用6次next(), 直到遇到return;
console.log(foo.next());

// 使用 for...of 循环迭代 generator 对象
for (const iterator of fib(10)) {
    console.log(iterator);
}

// 生成一个自增的id
function* next_id() {
    var count = 0;
    while (1) {
        yield ++count;
        if (count === 100) {
            return;
        }
    }
}
console.log(next_id().next());
for (const iterator of next_id()) {
    console.log(iterator);
}

// 标准对象: number string boolean function 和 undefined
// 包装对象: Number String Boolean 使用new创建 他们的类型是 object
// 对number对象使用toString需要注意
// 123.toString(); 语法错误
// 正确写法
123..toString();
(123).toString();

// Date对象
var now = new Date();
// 显示本地时间
console.log(now.toLocaleString());

if (Date.now) {
    console.log(Date.now()); // 老版本IE没有now()方法
} else {
    console.log(new Date().getTime());
}
console.log(Date.now());
console.log(new Date().getTime());

var today = new Date();
console.log(today);
console.log(today.getMonth());
console.log(today.getDate());
// 在JS中月份从0开始 0代表1月 11代表12月
if (today.getMonth() + 1 === 2 && today.getDate() === 14) {
    alert('亲爱的，我预定了晚餐，晚上6点在餐厅见！');
}

// JS 正则表达式
// 创建方式: 1. 直接使用 /正则表达式/ 
var regexp = /^\d{3}\-\d{3,8}$/;
// 2. 使用new RegExp('正则表达式')
var regexp01 = new RegExp('^\\d{3}\\-\\d{3,8}$');
// 使用RegExp对象的test方法判断是否匹配
console.log(regexp.test('010-1234567'));
console.log(regexp01.test('010-12345'));

// 使用正则表达式切分字符串
var string = 'adc   cs ac';
// 使用固定字符切分 不能识别连续的空格
console.log(string.split(' '));
// 使用正则切分
console.log(string.split(/\s+/));

// 使用正则表达式提取子串: ()中表示的就是要提取的分组
regexp01 = /^(\d{3})-(\d{3,8})$/;
var arr = regexp01.exec('010-12345');
console.log(arr);
// 识别合法时间
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
console.log(re.exec('15:34:24'));
// exec()如果匹配失败会返回null
console.log(re.exec('15:84:24')); // null

// 贪婪匹配: 尽可能匹配多的字符(默认为贪婪匹配)
var re = /^(\d+)(0*)$/;
// 上面的正则表达式匹配数字和数字后面的0, 但因为是贪婪匹配
// 第一个分组中匹配到的内容就是 1023000, 第二个分组只能匹配空字符串了
console.log(re.exec(1023000));
// 使用?来切换为非贪婪匹配
re = /^(\d+?)(0*)$/;
console.log(re.exec(1023000));

// 全局搜索 g
var s = 'JavaScript, VBScript, JScript and ECMAScript';
// var re = /[a-zA-Z]+Script/g;
var re = /[a-zA-Z]+Script/;

// 使用全局匹配: 会记录上次匹配到的位置 从上次的位置开始匹配
// 如果不使用全局匹配 就只能匹配到第一个符合要求的字符串
var a = re.exec(s); // ['JavaScript']
re.lastIndex; // 10

a = re.exec(s); // ['VBScript']
re.lastIndex; // 20

a = re.exec(s); // ['JScript']
re.lastIndex; // 29

a = re.exec(s); // ['ECMAScript']
re.lastIndex; // 44

a = re.exec(s); // null，直到结束仍没有匹配到

// 匹配邮箱
var re = /^\w+\.?\w+\@\w+\.\w+$/;
console.log(re.test('rjm96@foxmail.com')); // true
console.log(re.test('rjm@96@foxm@ail.com')); // false
// 提取名字
var re = /^\<(\w+\s?\w+)\>\s?(\w+\.?\w+\@\w+\.\w+)$/;
console.log(re.exec('<Tom Paris> rjm96@foxmail.com'));
console.log(re.exec('rjm@96@foxm@ail.com'));

// JSON 
// 序列化: 将js对象序列化为json字符串
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp']
};
var s = JSON.stringify(xiaoming, null, ' ');
console.log(s);
// JSON.stringify() 的第2个参数可以传入一个Array, 用于指定输出的属性
// 第三个参数指定输出缩进格式
s = JSON.stringify(xiaoming, ['name', 'age', 'skills'], ' ');
console.log(s);
// 第2个参数还可以传入一个函数, 每个键值对都会先被函数处理
function convert(key, value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    }
    return value;
}
s = JSON.stringify(xiaoming, convert, '  ');
console.log(s);

// 如果想要精确控制如何序列化一个对象, 可以在对象内定义一个toJSON()方法
var xiaoming = {
    name: '小明',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
    toJSON: function () {
        return { // 只输出name和age，并且改变了key：
            'Name': this.name,
            'Age': this.age
        };
    }
};
s = JSON.stringify(xiaoming, null, '  ');
console.log(s);

// 反序列化: 将一个JSON字符串变成一个JavaScript对象
var s = '{"name":"小明","age":14}';
console.log(typeof s); // string
var xiaoming = JSON.parse(s);
console.log(typeof xiaoming); // object
// JSON.parse()的第二个参数可以接收一个函数
// 来对每个键值对进行一些操作

// const jsdom = require("jsdom");
// const {JSDOM} = jsdom;
// const {window} = new JSDOM('<!DOCTYPE html>');
// const $ = require('jQuery')(window);
// console.log($);

// 访问天气api
var url = 'https://api.openweathermap.org/data/2.5/forecast?q=Beijing,cn&appid=800f49846586c3ba6e7052cfc89af16c';
function WeatherInfo(data){
    var info = {
        city: data.city.name,
        weather: data.list[0].weather[0].main,
        time: data.list[0].dt_txt
    };
    console.log(JSON.stringify(info, null, "  "));
}
// $.getJSON(url, WeatherInfo);

