// 事件循环机制
function eventLoop() {
  // 主线程
  console.log(1)
  // 微队列
  process.nextTick(() => {
    console.log(8)
    // 宏队列
    setTimeout(() => {
      console.log(9)
    })
  })
  // 宏队列
  setTimeout(() => {
    console.log(2)
    // 主线程任务
    new Promise(() => {
      console.log(11)
    })
  })
  // requestIdleCallback(() => {
  //   console.log(7)
  // })
  // 特殊说明： new Promise（）属于主线程任务
  let promise = new Promise((resolve, reject) => {
    // 宏队列
    setTimeout(() => {
      console.log(10)
    })
    resolve()
    // 这个console也属于主线程任务
    console.log(4)
  })
  fn()
  console.log(3)
  promise.then(() => {
    console.log(12)
  })
  function fn() {
    console.log(6)
  }
}

eventLoop()