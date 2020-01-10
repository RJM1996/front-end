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

getQueryStringArgs ()
