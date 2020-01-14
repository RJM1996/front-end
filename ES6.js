// 数组的解构赋值 (根据位置取值)
var [a, b, c] = [1, 2, 3]
console.log(a, b, c)

// 对象的结构赋值 (根据属性名取值)
let { foo, bar } = { foo: "aaa", bar: "ccc" }
console.log(foo, bar)

// 内部机制: 先找到同名属性, 再赋值给对应的变量(fo, ba)
let { foo: fo, bar: ba } = { foo: "aaa", bar: "bbb" }
console.log(fo, ba)

// 默认值生效的条件: 对象的属性值严格等于 undefined
var { message: msg = "msg" } = {}
console.log(msg)

let { log, sin, cos } = Math
console.log(log(10))
console.log(sin(10))

// 对数组进行对象属性的解构
var arr = [1, 2, 3]
var { 0: first, 1: second, 2: last } = arr
console.log(first, second, last)

// 字符串的解构
var [a, b, c, d, e] = 'Hello, world'
console.log(a, b, c, d, e)
let { length: len } = 'Hello, world'
console.log(len)

// 函数参数的解构赋值
const arr01 = [[1, 2], [3, 4]].map(([a, b]) => a + b)
console.log(arr01)

var map = new Map()
map.set('name', 'tom')
map.set('age', '12')
for (let [key, value] of map) {
  console.log(key, value)
}

var s = 'a'
console.log(s.codePointAt(0))

// 字符串可遍历
for (let codePoint of 'foo') {
  console.log(codePoint)
}

console.log('string'.includes('str'))
console.log('string'.startsWith('str'))
console.log('string'.endsWith('str'))

console.log('hello'.repeat(3))

// 补全字符串
const date = '31'.padStart('YYYY-MM-DD'.length, 'YYYY-MM-DD')
console.log(date)

const tip = 'Hello, world'
const obj = {
  a: 1111,
  b: 2222,
  c: 3333
}
// 模板字符串 使用反引号 `str`
console.log(`
  1. aaaaa
  2. bbbbb
  3. ccccc
  4. ${tip}
  5. ${obj}
`)

console.log(String.raw`Hello?"//?\n`)

var num = 0.1 + 0.2 - 0.3
console.log(num.toFixed(20))
// Number.EPSILON 用于为浮点数计算提供误差范围
if (num < Number.EPSILON) {
  console.log(true)
}

console.log(Math.trunc(4.123))
console.log(Math.trunc(4.911))

function getQueryStringArgs() {
  // 获取查询字符串并去掉开头的?
  // let search = location.search,
  let search = '?name=tom&age=12&sex=man',
    queryString = search.length > 0 ? search.substring(1) : "",
    // 保存查询参数的对象
    queryArgs = {},
    // 获取每一项, 存为数组
    itemsArray = queryString.length ? queryString.split('&') : []
  // 循环"查询参数数组"
  itemsArray.forEach((Element) => {
    let item = Element.split('='),
      name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1])
    if (name.length) {
      queryArgs[name] = value
    }
  })
  console.log(JSON.stringify(queryArgs))
  return queryArgs
}

getQueryStringArgs()

console.log(Math.max(...[12, 23, 34]))
console.log(new Date(...[2019, 0, 1]))
console.log(new Date('2019-01-23'))
console.log(new Date())

// 将扩展运算符用于数组赋值, 只能放在参数最后一位
var [first, ...rest] = [1, 2, 3, 4, 5, 6, 7]
// var [...rest, last] = [1,2,3,4,5,6,7]  报错
console.log(first)
console.log(rest)
console.log([...'hello'])

let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}

arrayLike = Array.from(arrayLike)
console.log(arrayLike)

var fun = function () { }
console.log(fun.name) // fun

var fun = function baz() { }
console.log(fun.name) // baz
console.log((new Function).name)

const headAndTail = (head, ...tail) => [head, tail];

console.log(headAndTail(1, 2, 3, 4, 5))

// 箭头函数体内的this对象总是指向函数定义生效时所在的对象!
function func() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 111
// func.call({ id: 21 })
// func.call({})
// func()

// 箭头函数中没有自己的this对象,而是引用的外层代码的this
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => { this.s1++ }, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

// var timer = new Timer();

// setTimeout(() => console.log('s1: ', timer.s1, '\nthis.s1: ', this.s1), 3100);
// setTimeout(() => console.log('s2: ', timer.s2, '\nthis.s2: ', this.s2), 3100);
// setTimeout(() => console.log('s2: ', timer.s2), 3100);

function fibonaci(n, ac1 = 1, ac2 = 1) {
  return n <= 1 ? ac2 : fibonaci(n - 1, ac2, ac1 + ac2)
}
console.log(fibonaci(100))

console.log(Object.is({}, {}))
console.log(Object.is(111, 111))
console.log(Object.is(+0, -0))
console.log(+0 === -0)
console.log(NaN === NaN)
console.log(Object.is(NaN, NaN))