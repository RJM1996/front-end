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
let arr = [1, 2, 3]
let { 0: first, 1: second, 2: last } = arr
console.log(first, second, last)

// 字符串的解构
var [a, b, c, d, e] = 'Hello, world'
console.log(a, b, c, d, e)
let { length: len } = 'Hello, world'
console.log(len)

// 函数参数的解构赋值
const arr01 = [[1, 2], [3, 4]].map(([a, b]) => a + b)
console.log(arr01)