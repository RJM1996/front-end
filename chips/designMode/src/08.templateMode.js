// 模板方法模式
{
  // 体育运动
  function Sport() {}

  Sport.prototype = {
    constructor: Sport,

    // 模板，按顺序执行
    init: function () {
      this.stretch()
      this.jog()
      this.deepBreath()
      this.start()

      let free = this.end()

      // 运动后还有空的话，就拉伸一下
      if (free !== false) {
        this.stretch()
      }
    },

    // 拉伸
    stretch: function () {
      console.log('拉伸')
    },

    // 慢跑
    jog: function () {
      console.log('慢跑')
    },

    // 深呼吸
    deepBreath: function () {
      console.log('深呼吸')
    },

    // 开始运动
    start: function () {
      throw new Error('子类必须重写此方法')
    },

    // 结束运动
    end: function () {
      console.log('运动结束')
    }
  }

  // 篮球
  function Basketball() {}

  Basketball.prototype = new Sport()

  // 重写相关的方法
  Basketball.prototype.start = function () {
    console.log('--篮球运动--\n先投上几个三分')
  }

  Basketball.prototype.end = function () {
    console.log('运动结束了，有事先走一步\n--篮球运动结束--')
    return false
  }

  // 马拉松
  function Marathon() {}

  Marathon.prototype = new Sport()
  Marathon.prototype.start = function () {
    console.log('--马拉松开始--\n')
  }
  Marathon.prototype.end = function () {
    console.log('--马拉松结束--\n需要做拉伸')
    return true
  }

  let basketball = new Basketball()
  let marathon = new Marathon()

  // 子类调用，最终会按照父类定义的顺序执行
  basketball.init()
  marathon.init()
}
