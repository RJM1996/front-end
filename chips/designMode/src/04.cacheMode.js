{
  // 主体
  function add() {
    let arg = [].slice.call(arguments) // 将 arguments 转为数组

    return arg.reduce(function (a, b) {
      return a + b
    })
  }

  // 代理
  const proxyAdd = (function () {
    let cache = []

    return function () {
      let arg = [].slice.call(arguments).join(',')

      // 如果有，则直接从缓存返回
      if (cache[arg]) {
        console.log('cache: ', arg, cache[arg])
        return cache[arg]
      } else {
        let ret = add.apply(this, arguments)
        cache[arg] = ret // 将结果进行缓存
        return ret
      }
    }
  })()

  console.log(
    add(1, 2, 3, 4),
    add(1, 2, 3, 4),

    proxyAdd(10, 20, 30, 40),
    proxyAdd(10, 20, 30, 40)
  ) // 10 10 100 100
}
