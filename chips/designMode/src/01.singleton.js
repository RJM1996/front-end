// 1. 单例模式
function SetManager(name) {
  this.manager = name
}

SetManager.prototype.getName = function () {
  console.log(this.manager)
}

var SingletonSetManager = (function () {
  var manager = null

  return function (name) {
    if (!manager) {
      manager = new SetManager(name)
    }

    return manager
  }
})()

SingletonSetManager('a').getName() // a
SingletonSetManager('b').getName() // a
SingletonSetManager('c').getName() // a

// a. 懒汉模式
{
  var Singleton = (function () {
    var instantiated //比较懒，在类加载时，不创建实例，因此类加载速度快，但运行时获取对象的速度慢
    console.log('懒汉:', instantiated)
    function init() {
      /*这里定义单例代码*/
      return {
        publicMethod: function () {
          console.log('helloworld 懒汉')
        },
        publicProperty: 3
      }
    }
    return {
      getInstance: function () {
        if (!instantiated) {
          instantiated = init()
        }
        return instantiated
      }
    }
  })()
  const singleton = Singleton.getInstance()
  console.log(singleton)
  /*可在其他类调用公有的方法或属性来获取实例:*/
  Singleton.getInstance().publicMethod()
  Singleton.getInstance().publicProperty = 4
  // console.log(Singleton.getInstance().publicProperty)
}

// b. 饿汉模式
{
  var Singleton = (function () {
    var instantiated = init() //比较饿，在类加载时就完成了初始化，所以类加载较慢，但获取对象的速度快
    console.log('饿汉:', instantiated)
    function init() {
      /*这里定义单例代码*/
      return {
        publicMethod: function () {
          console.log('helloworld 饿汉')
        },
        publicProperty: 3
      }
    }
    return {
      getInstance: function () {
        return instantiated
      }
    }
  })()

  const singleton = Singleton.getInstance()
  console.log(singleton)
  Singleton.getInstance().publicMethod()
}
