const Koa = require('koa')

const Router = require('koa-router')

const moment = require('moment')

const koaBody = require('koa-body')

const cors = require('koa-cors')

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200
  } else {
    await next()
  }
})

app.use(
  koaBody({
    multipart: true
  })
)

let logArr = [
  'warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx',
  'warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx',
  'warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx',
  'warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx',
  'warning_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx'
]
const getlog = function () {
  const time = moment().format()
  logArr.push(
    time + ' error_log: aaaaaaaaaaa-vvvvvvvvvvvv-ccccccccccccc-xxxxxxxxxxxxxxx'
  )
  return logArr
}

const router = new Router()
let response = {
  resp_code: 200,
  resp_msg: 'OK',
  data: {
    fromLineNum: 1,
    toLineNum: 3,
    logContent: `2020-07-22 10:16:46 [com.xxl.job.core.thread.JobThread#run]-[125]-[Thread-24] <br>----------- xxl-job job execute start -----------<br>----------- Param:22\n
      2020-07-22 10:16:46 [com.xxl.job.core.thread.JobThread#run]-[159]-[Thread-24] <br>----------- xxl-job job execute end(finish) -----------<br>----------- ReturnT:ReturnT [code=200, msg=null, content=null]\n
      2020-07-22 10:16:46 [com.xxl.job.core.thread.TriggerCallbackThread#callbackLog]-[185]-[xxl-job, executor TriggerCallbackThread] <br>----------- xxl-job job callback finish.\n`,
    end: false //是否结束
  }
}
for (let i = 0; i < 1; i++) {
  response.data.logContent +=
    '2020-07-22 10:16:46 [com.xxl.job.core.thread.JobThread#run]-[125]-[Thread-24] <br>----------- xxl-job job execute start -----------<br>----------- Param:22\n'
}
let num = 1
router.post('/getlog', (ctx) => {
  num++
  if (num === 10) {
    response.data.logContent += '-----日志打印完毕-----'
    response.data.end = true
  }
  ctx.body = response
})

let statusNum = 0
let statusResp = {
    data: {
      modelId: 43,
      modelStatus: 'toRun',
      reading: '', // 训练数据读取
      processing: '', // 数据预处理
      training: '', // 模型训练
      evaluation: '' // 模型评估
    },
    resp_code: 200,
    resp_msg: 'OK'
  }
router.post('/getTaskStatus', (ctx) => {
  statusNum += 1
  if(statusNum === 2) {
    statusResp.data = {
      modelId: 43,
      modelStatus: 'running',
      reading: 'runSuccess', // 训练数据读取
      processing: 'running', // 数据预处理
      training: '', // 模型训练
      evaluation: '' // 模型评估
    }
  }
  if(statusNum === 4) {
    statusResp.data = {
      modelId: 43,
      modelStatus: 'running',
      reading: 'runSuccess', // 训练数据读取
      processing: 'runSuccess', // 数据预处理
      training: 'running', // 模型训练
      evaluation: '' // 模型评估
    }
  }
  if(statusNum === 6) {
    statusResp.data = {
      modelId: 43,
      modelStatus: 'toRun',
      reading: 'runSuccess', // 训练数据读取
      processing: 'runSuccess', // 数据预处理
      training: 'runSuccess', // 模型训练
      evaluation: 'runSuccess' // 模型评估
    }
  }
  
  ctx.body = statusResp
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('open server localhost:3000')
})
