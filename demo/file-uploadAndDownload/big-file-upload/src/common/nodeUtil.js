const columns = []

// 根据 columns 批量生成 list
const createList = () => {
  let list = []
  for (let i = 1; i <= 10; i++) {
    const item = {}
    columns.forEach((column) => {
      item[column.key] = column.title + i
    })
    list.push(item)
  }

  console.log(JSON.stringify(list))
}

createList()
