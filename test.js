var arr = [
  {
    age: 111,
    name: 'tom'
  }
]

var tmp = [].concat(arr)

tmp[0].age = 222

console.log(JSON.stringify(arr))

let value = '62'
console.log(value.indexOf('2') > -1)