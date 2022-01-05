function foo() {
  // okay to capture 'a'
  return a
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo()

let a
