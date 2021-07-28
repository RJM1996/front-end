const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const cors = require('@koa/cors')
const multer = require('@koa/multer')
const Router = require('@koa/router')

const app = new Koa()
const router = new Router()
const PORT = 3000
// 上传后资源的URL地址
const RESOURCE_URL = `http://localhost:${PORT}`
// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, '/public/upload')

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    // 设置文件名
    cb(null, `${file.originalname}`)
  }
})

const multerUpload = multer({ storage })

router.get('/', async (ctx) => {
  ctx.body = '欢迎使用文件服务（by rjm）'
})

router.post(
  '/upload/single',
  async (ctx, next) => {
    try {
      await next()
      ctx.body = {
        code: 1,
        msg: '文件上传成功',
        url: `${RESOURCE_URL}/${ctx.file.originalname}`
      }
    } catch (error) {
      ctx.body = {
        code: 0,
        msg: '文件上传失败'
      }
    }
  },
  multerUpload.single('file')
)

// 注册中间件
app.use(cors())
app.use(serve(UPLOAD_DIR))
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`app starting at port ${PORT}`)
})
