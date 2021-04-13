// 中介者模式

{
  let A = {
    name: 'A',
    score: 10,

    changeTo: function (score) {
      this.score = score

      // 自己获取
      this.getRank()
    },

    // 直接获取
    getRank: function () {
      let scores = [this.score, B.score, C.score].sort(function (a, b) {
        return a < b
      })

      console.log(this.name, scores.indexOf(this.score) + 1)
    }
  }

  let B = {
    name: 'B',
    score: 20,

    changeTo: function (score) {
      this.score = score

      // 通过中介者获取
      rankMediator(B)
    }
  }

  let C = {
    name: 'C',
    score: 30,

    changeTo: function (score) {
      this.score = score

      rankMediator(C)
    }
  }

  // 中介者，计算排名
  function rankMediator(person) {
    let scores = [A.score, B.score, C.score].sort(function (a, b) {
      return a < b
    })

    console.log(person.name, scores.indexOf(person.score) + 1)
  }

  // A通过自身来处理
  A.changeTo(100) // 1
  // B和C交由中介者处理
  B.changeTo(200) // 1
  C.changeTo(300) // 1
}
