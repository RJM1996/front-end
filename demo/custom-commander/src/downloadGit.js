// git包
const downLoad = require('download-git-repo')
// 动画
const ora = require('ora')
const chalk = require('chalk')

// 模板项目github地址
// const url = 'RJM1996/manage-system-template'
const url = 'direct:https://gitee.com/rjm1996/manage-system-template.git'
let downGit = (name) => {
  const spinner = ora('正在拉取模板...')
  spinner.start()

  downLoad(
    url,
    name,
    {
      clone: true,
    },
    (err) => {
      if (err) {
        const str = chalk.red(err)
        spinner.fail(str)
      } else {
        const str = `${chalk.green(name)} 创建成功`
        spinner.succeed(str)
      }
      process.exit(1)
    }
  )
}
module.exports = downGit
