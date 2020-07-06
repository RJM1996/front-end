
function sayHello(person: string) {
  return 'Hello, ' + person
}

let user = 'Tom Jerry'
console.log(sayHello(user))

/**
 * 原始数据类型
 */

// 1. 布尔类型
let createdByNewBoolean: Boolean = new Boolean(1) // 布尔对象
let createdByNewboolean: boolean = Boolean(1) // 布尔值
console.log(createdByNewBoolean, createdByNewboolean)

// 2. 数值类型
let decLiteral: number = 10
let hexLiteral: number = 0xf00d

// 3. 字符串类型
let myName: string = 'Tom'
let age: number = 20
let sentence: string = `Hello, my name is ${myName}, 
i am ${age} years old`
console.log(sentence)

// 4. 空值: void
function alertName(): void {
  console.log('My name is Tom')
}
alertName()
let unusable: void = undefined
console.log(unusable)

// 5. undefined 和 null 是所有类型的子变量, 即可以给任何类型赋值; 但 void 不行
let u: undefined = undefined
let n: null = null

/**
 * 任意值 any
 */

// 任意类型的变量可以被赋值为任意类型
let anyNumber: any = 'seven'
anyNumber = 7

let anyThing: any = 'Hello'
// 任意值上可以访问任意属性
console.log(anyThing.name)
console.log(anyThing)