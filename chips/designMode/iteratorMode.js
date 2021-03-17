{
  ;[1, 2, 3].forEach(function (item, index, arr) {
    // console.log(item, index, arr)
  })
}

{
  function each(obj, cb) {
    let value

    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; ++i) {
        const item = obj[i]
        const index = i
        value = cb.call(item, index, item)
        if(value === false) break
      }
    } else {
      for (let i in obj) {
        value = cb.call(obj[i], i, obj[i])
        if (value === false) {
          break
        }
      }
    }
  }

  each([1, 2, 3], function (index, item) {
    console.log(this)
    console.log(index, item)
  })

  each({ a: 1, b: 2 }, function (index, value) {
    console.log(this)
    console.log(index, value)
  })
}
