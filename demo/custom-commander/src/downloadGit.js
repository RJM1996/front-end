// git包
const downLoad = require('download-git-repo')
// 动画
const ora = require('ora')
const chalk = require('chalk')

let url = 'RJM1996/temperature-monitoring'
let clone = false
let downGit = (name) => {
  const spinner = ora('正在拉取模板...')
  spinner.start()

  downLoad(
    url,
    name,
    {
      clone
    },
    (err) => {
      if (err) {
        console.log(chalk.red(err))
      } else {
        const str = `${chalk.green(name)} 创建成功`
        spinner.succeed(str)
      }
      process.exit(1)
    }
  )
}
module.exports = downGit
