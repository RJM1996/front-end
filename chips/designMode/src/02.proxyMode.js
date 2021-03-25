// 策略模式

{
  // 主体，发送消息
  function sendMsg(msg) {
    console.log(msg)
  }

  // 代理，对消息进行过滤
  function proxySendMsg(msg) {
    // 无消息则直接返回
    if (typeof msg === 'undefined') {
      console.log('deny')
      return
    }

    // 有消息则进行过滤
    msg = ('' + msg).replace(/傻\s*逼/g, '大笨蛋')

    sendMsg(msg)
  }

  sendMsg('你是个傻逼') // 你是个傻逼
  proxySendMsg('你是个傻逼') // 你是个大笨蛋
  proxySendMsg() // deny
}

{
  // 函数防抖，频繁操作中不处理，直到操作完成之后（再过 delay 的时间）才一次性处理
  function debounce(fn, delay) {
    delay = delay || 200

    var timer = null

    return function () {
      var arg = arguments

      // 每次操作时，清除上次的定时器
      clearTimeout(timer)
      timer = null

      // 定义新的定时器，一段时间后进行操作
      timer = setTimeout(function () {
        fn.apply(this, arg)
      }, delay)
    }
  }

  let count = 0

  // 主体
  function scrollHandle(e) {
    console.log(e.type, ++count) // scroll
  }

  // 代理
  var proxyScrollHandle = (function () {
    return debounce(scrollHandle, 500)
  })()

  window.onscroll = proxyScrollHandle
  // window.onscroll = () => {
  //   console.log('onscroll')
  // }
}
