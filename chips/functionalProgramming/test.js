{
  let student = {
    firstName: 'testing',
    lastName: 'testing',
    marks: 500
  }

  function changeName(student) {
    // student.firstName = "testing11" //should not do it
    let copiedStudent = Object.assign({}, student)
    copiedStudent.firstName = 'testing11'
    return copiedStudent
  }

  console.log(changeName(student))

  console.log(student)
}

{
  let student = {
    firstName: 'testing',
    lastName: 'testing',
    marks: 500
  }

  // 非纯函数
  function appendAddress() {
    student.address = { streetNumber: '0000', streetName: 'first', city: 'somecity' }
  }

  console.log(appendAddress())

  // 纯函数
  function appendAddress(student) {
    let copystudent = Object.assign({}, student)
    copystudent.address = { streetNumber: '0000', streetName: 'first', city: 'somecity' }
    return copystudent
  }

  console.log(appendAddress(student))

  console.log(student)
}

{
  let cities = ['irving', 'lowell', 'houston']

  // we can get the comma separated list
  console.log(cities.join(','))
  // irving,lowell,houston

  // if we want to get cities start with i
  const citiesI = cities.filter((city) => city[0] === 'i')
  console.log(citiesI)
  // [ 'irving' ]

  // if we want to capitalize all the cities
  const citiesC = cities.map((city) => city.toUpperCase())
  console.log(citiesC)
  // [ 'IRVING', 'LOWELL', 'HOUSTON' ]
}

{
  const numbers = [10, 20, 30, 40, 50, 60, 70, 80]

  const out1 = numbers.map((num) => num * 100)
  console.log(out1)
  // [ 1000, 2000, 4000, 5000, 6000, 7000, 8000 ]

  // const out2 = numbers.filter((num) => num > 50)
  const out2 = numbers.filter((num) => num > 50)
  console.log(out2)
  // [ 60, 70, 80 ]

  const out3 = numbers.reduce((out, num) => out + num)
  console.log(out3)
  // 330
}

{
  function printMyName(name, count) {
    if (count <= name.length) {
      console.log(name.substring(0, count))
      printMyName(name, ++count)
    }
  }

  printMyName('Bhargav', 1)

  /*
B
Bh
Bha
Bhar
Bharg
Bharga
Bhargav
*/

  // withotu recursion
  var name = 'Bhargav'
  var output = ''
  for (let i = 0; i < name.length; i++) {
    output = output + name[i]
    console.log(output)
  }
}
