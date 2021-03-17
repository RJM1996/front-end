{
  // 订阅
  document.body.addEventListener(
    'dblclick',
    function () {
      console.log('dblclick 01')
    },
    false
  )

  document.body.addEventListener(
    'dblclick',
    function () {
      console.log('dblclick 02')
    },
    false
  )

  // 发布
  document.body.click()
}

{
  // 观察者
  var observer = {
    // 订阅集合
    subscribes: [],

    // 订阅
    subscribe: function (type, fn) {
      if (!this.subscribes[type]) {
        this.subscribes[type] = []
      }

      // 收集订阅者的处理
      typeof fn === 'function' && this.subscribes[type].push(fn)
    },

    // 发布  可能会携带一些信息发布出去
    publish: function () {
      var type = [].shift.call(arguments),
        fns = this.subscribes[type]

      // 不存在的订阅类型，以及订阅时未传入处理回调的
      if (!fns || !fns.length) {
        console.log('无人订阅', type)
        return
      }

      // 挨个处理调用
      for (var i = 0; i < fns.length; ++i) {
        fns[i].apply(this, arguments)
      }
    },

    // 删除订阅
    remove: function (type, fn) {
      // 删除全部
      if (typeof type === 'undefined') {
        this.subscribes = []
        return
      }

      var fns = this.subscribes[type]

      // 不存在的订阅类型，以及订阅时未传入处理回调的
      if (!fns || !fns.length) {
        return
      }

      if (typeof fn === 'undefined') {
        fns.length = 0
        return
      }

      // 挨个处理删除
      for (var i = 0; i < fns.length; ++i) {
        if (fns[i] === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }

  // 订阅岗位列表
  function jobListForA(jobs) {
    console.log('A', jobs)
  }

  function jobListForB(jobs) {
    console.log('B', jobs)
  }

  // A订阅了笔试成绩
  observer.subscribe('job', jobListForA)
  // B订阅了笔试成绩
  observer.subscribe('job', jobListForB)

  // A订阅了笔试成绩
  observer.subscribe('examinationA', function (score) {
    console.log(score)
  })

  // B订阅了笔试成绩
  observer.subscribe('examinationB', function (score) {
    console.log(score)
  })

  // A订阅了面试结果
  observer.subscribe('interviewA', function (result) {
    console.log(result)
  })

  observer.publish('examinationA', 100) // 100
  observer.publish('examinationB', 80) // 80
  observer.publish('interviewA', '备用') // 备用

  observer.publish('job', ['前端', '后端', '测试']) // 输出A和B的岗位

  // B取消订阅了笔试成绩
  observer.remove('examinationB')
  // A取消订阅了岗位
  observer.remove('job', jobListForA)

  observer.publish('examinationB', 80) // 没有可匹配的订阅，无输出
  observer.publish('job', ['前端', '后端', '测试']) // 输出B的岗位
}
