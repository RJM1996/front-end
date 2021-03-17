function add() {
  var arg = [].slice.call(arguments)

  return arg.reduce(function (a, b) {
    return a + b
  })
}

// 代理
var proxyAdd = (function () {
  var cache = []

  return function () {
    var arg = [].slice.call(arguments).join(',')
    // console.log(arg)

    // 如果有，则直接从缓存返回
    if (cache[arg]) {
      console.log('cache', arg)
      return cache[arg]
    } else {
      var ret = add.apply(this, arguments)
      cache[arg] = ret
      return ret
    }
  }
})()

console.log(
  add(1, 2, 3, 4),
  add(1, 2, 3, 4),

  proxyAdd(10, 20, 30, 40),
  proxyAdd(10, 20, 30, 40),
  proxyAdd(10, 20, 30, 50)
) // 10 10 100 100
