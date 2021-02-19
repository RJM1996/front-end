#!/usr/bin/env node

const cmd = require('commander')
const chalk = require('chalk')
const downGit = require('./src/downloadGit')

cmd
  .command('init <name>')
  .description('初始化模板')
  .action(async (name) => {
    typeof name !== 'string' &&
      (console.log(chalk.red('请在init后填写项目名称\n')), process.exit(1))
    console.log('开始创建项目:', chalk.green(name))
    await downGit(name)
  })

cmd.parse(process.argv)
