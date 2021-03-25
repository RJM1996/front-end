// 享元模式
{
  // 健康测量
  function Fitness(name, sex, age, height, weight) {
    this.name = name
    this.sex = sex
    this.age = age
    this.height = height
    this.weight = weight
  }

  // 开始评判
  Fitness.prototype.judge = function () {
    let ret = this.name + ': '

    if (this.sex === 'male') {
      ret += this.judgeMale()
    } else {
      ret += this.judgeFemale()
    }

    console.log(ret)
  }

  // 男性评判规则
  Fitness.prototype.judgeMale = function () {
    let ratio = this.height / this.weight

    return this.age > 20 ? ratio > 3.5 : ratio > 2.8
  }

  // 女性评判规则
  Fitness.prototype.judgeFemale = function () {
    let ratio = this.height / this.weight

    return this.age > 20 ? ratio > 4 : ratio > 3
  }

  let a = new Fitness('A', 'male', 18, 160, 80)
  let b = new Fitness('B', 'male', 21, 180, 70)
  let c = new Fitness('C', 'female', 28, 160, 80)
  let d = new Fitness('D', 'male', 18, 170, 60)
  let e = new Fitness('E', 'female', 18, 160, 40)

  // 开始评判
  // a.judge() // A: false
  // b.judge() // B: false
  // c.judge() // C: false
  // d.judge() // D: true
  // e.judge() // E: true
}

{
  // 健康测量
  function Fitness(sex) {
    this.sex = sex
  }

  // 工厂，创建可共享的对象
  let FitnessFactory = {
    objs: [],

    create: function (sex) {
      if (!this.objs[sex]) {
        this.objs[sex] = new Fitness(sex)
      }

      return this.objs[sex]
    }
  }

  // 管理器，管理非共享的部分
  let FitnessManager = {
    fitnessData: {},

    // 添加一项
    add: function (name, sex, age, height, weight) {
      let fitness = FitnessFactory.create(sex)
      // console.log(fitness)

      // 存储变化的数据
      this.fitnessData[name] = {
        age: age,
        height: height,
        weight: weight
      }
      console.log(this.fitnessData)
      return fitness
    },

    // 从存储的数据中获取，更新至当前正在使用的对象
    updateFitnessData: function (name, obj) {
      let fitnessData = this.fitnessData[name]

      for (let item in fitnessData) {
        if (fitnessData.hasOwnProperty(item)) {
          obj[item] = fitnessData[item]
        }
      }
    }
  }

  // 开始评判
  Fitness.prototype.judge = function (name) {
    // 操作前先更新当前状态（从外部状态管理器中获取）
    FitnessManager.updateFitnessData(name, this)

    let ret = name + ': '

    if (this.sex === 'male') {
      ret += this.judgeMale()
    } else {
      ret += this.judgeFemale()
    }

    console.log(ret)
  }

  // 男性评判规则
  Fitness.prototype.judgeMale = function () {
    let ratio = this.height / this.weight

    return this.age > 20 ? ratio > 3.5 : ratio > 2.8
  }

  // 女性评判规则
  Fitness.prototype.judgeFemale = function () {
    let ratio = this.height / this.weight

    return this.age > 20 ? ratio > 4 : ratio > 3
  }

  let a = FitnessManager.add('A', 'male', 18, 160, 80)
  let b = FitnessManager.add('B', 'male', 21, 180, 70)
  let c = FitnessManager.add('C', 'female', 28, 160, 80)
  let d = FitnessManager.add('D', 'male', 18, 170, 60)
  let e = FitnessManager.add('E', 'female', 18, 160, 40)

  // 开始评判
  a.judge('A') // A: false
  b.judge('B') // B: false
  c.judge('C') // C: false
  d.judge('D') // D: true
  e.judge('E') // E: true
}
