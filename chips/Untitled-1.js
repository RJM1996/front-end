const getMonthBetween = function(start, end) {
  let result = []
  let s = start.split('-')
  let e = end.split('-')
  let min = new Date()
  let max = new Date()
  min.setFullYear(s[0], s[1] * 1 - 1, 1) // 开始日期
  max.setFullYear(e[0], e[1] * 1 - 1, 1) // 结束日期
  let cur = min
  // 2018-11 ~ 2019-11
  while (cur <= max) {
    let year = cur.getFullYear()
    let month = cur.getMonth()
    let yearMonth = year.toString() + '-' + (month+1).toString()
    result.push(yearMonth)
    cur.setMonth(month + 1)
  }
  return result
}

let dateArr = ['2018-11', '2019-11']
let start = dateArr[0]
let end = dateArr[1]
let monthList = getMonthBetween(start, end)
console.log(monthList)

// 引用类型可以动态添加属性
var arr = [1, 2, 3]
arr.age = 123
console.log(arr)

// 引用类型的复制(两个变量指向同一个对象)
var obj01 = new Object()
var obj02 = obj01
obj02.name = 'name'
console.log(obj01)

var str = "string"
console.log(str instanceof String) // false 因为基本类型不是对象
console.log(getMonthBetween instanceof Function)
console.log(typeof getMonthBetween)

const set = new Set()
set.add('1')
console.log(set)

for (let i = 0; i < 3; i++) {
  let i = 'abc'
  console.log(i)
}