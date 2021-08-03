const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const cors = require('@koa/cors')
const multer = require('@koa/multer')
const Router = require('@koa/router')
const fse = require('fs-extra')

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

// 目录上传的存储逻辑
const dirStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // images@image-1.jpeg => images/image-1.jpeg
    let relativePath = file.originalname.replace(/@/g, path.sep)
    let index = relativePath.lastIndexOf(path.sep)
    let fileDir = path.join(UPLOAD_DIR, relativePath.substr(0, index))
    // 确保文件目录存在，若不存在的话，会自动创建
    await fse.ensureDir(fileDir)
    cb(null, fileDir)
  },
  filename: function (req, file, cb) {
    // console.log('dirStorage', req, file)
    let parts = file.originalname.split('@')
    cb(null, `${parts[parts.length - 1]}`)
  }
})

const multerUpload = multer({ storage })
const multerDirUpload = multer({ storage: dirStorage })

router.get('/', async (ctx) => {
  ctx.body = '欢迎使用文件服务（by rjm）'
})

// 单文件上传
router.post(
  '/upload/single',
  async (ctx, next) => {
    try {
      await next()
      console.log('file: ', ctx.file)
      ctx.body = {
        code: 1,
        msg: '文件上传成功',
        url: `${RESOURCE_URL}/${ctx.file.originalname}`,
        ctx
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
// 多文件上传
router.post(
  '/upload/multiple',
  async (ctx, next) => {
    try {
      await next()
      urls = ctx.files.file.map((file) => `${RESOURCE_URL}/${file.originalname}`)
      ctx.body = {
        code: 1,
        msg: '文件上传成功',
        urls
      }
    } catch (error) {
      ctx.body = {
        code: 0,
        msg: '文件上传失败'
      }
    }
  },
  multerUpload.fields([
    {
      name: 'file' // 与FormData表单项的fieldName想对应
    }
  ])
)
// 目录上传
router.post(
  '/upload/dir',
  async (ctx, next) => {
    try {
      await next()
      console.log('file2: ', ctx.files)
      urls = ctx.files.file.map((file) => `${RESOURCE_URL}/${file.originalname.replace(/@/g, path.sep)}`)
      ctx.body = {
        code: 1,
        msg: '文件上传成功',
        urls
      }
    } catch (error) {
      ctx.body = {
        code: 0,
        msg: '文件上传失败'
      }
    }
  },
  multerDirUpload.fields([
    {
      name: 'file' // 与FormData表单项的fieldName想对应
    }
  ])
)
// 目录压缩上传
router.post(
  '/upload/zipDirUpload',
  async (ctx, next) => {
    try {
      await next()
      console.log('file3: ', ctx.files)
      ctx.body = {
        code: 1,
        msg: '文件上传成功',
        url: `${RESOURCE_URL}/${ctx.files.file[0].originalname}`
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 0,
        msg: '文件上传失败',
        error: error
      }
    }
  },
  multerUpload.fields([
    {
      name: 'file' // 与FormData表单项的fieldName想对应
    }
  ])
)

// 注册中间件
app.use(cors())
app.use(serve(UPLOAD_DIR))
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`app starting at: ${RESOURCE_URL}`)
})
