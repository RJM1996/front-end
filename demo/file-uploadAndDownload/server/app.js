const path = require('path')
const Koa = require('koa')
const util = require('util')
const static = require('koa-static')
const cors = require('@koa/cors')
const multer = require('@koa/multer')
const Router = require('@koa/router')
const fse = require('fs-extra')
const fs = require('fs')
const readdir = util.promisify(fs.readdir)
const unlink = util.promisify(fs.unlink)

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
    cb(null, file.originalname)
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
      ctx.body = {
        code: 200,
        msg: '文件上传成功',
        data: {
          docPath: `${RESOURCE_URL}/${ctx.file.originalname}`
        }
      }
    } catch (error) {
      console.log(error)
      ctx.body = {
        code: 500,
        msg: '文件上传失败',
        data: {}
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

const TMP_DIR = path.join(__dirname, '/public/upload') // 临时目录
const bigFileStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let fileMd5 = file.originalname.split('-')[0]
    const fileDir = path.join(TMP_DIR, fileMd5)
    await fse.ensureDir(fileDir)
    cb(null, fileDir)
  },
  filename: function (req, file, cb) {
    let chunkIndex = file.originalname.split('-')[1]
    cb(null, `${chunkIndex}`)
  }
})

const multerBigFileUpload = multer({ storage: bigFileStorage })
// 大文件分片上传
router.post('/upload/bigFile', multerBigFileUpload.single('file'), async (ctx, next) => {
  try {
    ctx.body = {
      code: 1,
      msg: '分片上传成功',
      data: ctx.file
    }
  } catch (error) {
    console.log(error)
    ctx.body = {
      code: 0,
      msg: '分片上传失败',
      data: error
    }
  }
})
// mergeChunks
router.get('/upload/mergeChunks', async (ctx) => {
  const { fileName, token } = ctx.query
  await mergeFiles(fileName, token)
  ctx.body = {
    code: 200,
    data: {
      url: `http://localhost:${PORT}/${fileName}`
    }
  }
})

async function mergeFiles(fileName, token) {
  // 存储分片的目录
  const sourceDir = path.join(TMP_DIR, token)
  // 合成的文件存放的路径
  const targetPath = path.join(UPLOAD_DIR, fileName)
  // 1. 定义一个函数用来读取文件,并向一个地址写入文件
  function readFile(file, ws) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .on('data', (data) => {
          // console.log(typeof data, data, data.size)
          return ws.write(data)
        })
        .on('end', resolve)
        .on('error', reject)
    })
  }
  // 2. 读取存放分片的目录
  const files = await readdir(sourceDir)
  const sortFiles = files.sort((a, b) => a - b)
  // 3. 根据目标路径创建一个写文件流,往进写文件
  const ws = fs.createWriteStream(targetPath)
  // 4. 遍历分片文件, 依次写入目标文件
  for (const file of sortFiles) {
    let filePath = path.join(sourceDir, file)
    await readFile(filePath, ws)
    await unlink(filePath)
  }
  ws.end()
}

// 判断文件是否存在
router.get('/upload/exist', async (ctx) => {
  const { fileName, token } = ctx.query
  const filePath = path.join(UPLOAD_DIR, fileName)
  const isExists = await fse.pathExists(filePath)
  console.log('存在: ', isExists)
  if (isExists) {
    ctx.body = {
      status: 'success',
      data: {
        isExist: true,
        url: `http://localhost:8080/${fileName}`
      }
    }
  } else {
    let chunkIds = []
    const chunksPath = path.join(TMP_DIR, token)
    const hasChunksPath = await fse.pathExists(chunksPath)
    if (hasChunksPath) {
      let files = await readdir(chunksPath)
      chunkIds = files.map((f) => Number(f))
      console.log('chunkIds', chunkIds)
    }
    ctx.body = {
      status: 'success',
      data: {
        isExist: false,
        chunkIds
      }
    }
  }
})

const send = require('koa-send')

router.get('/download', async (ctx) => {
  const req = ctx.query
  console.log(req)

  let name = '20210621案件-listing-success.xlsx'
  // let name = 'success.xlsx'

  let path = `${UPLOAD_DIR}/${name}`
  if (fs.existsSync(path)) {
    // 中文名需要先编码
    name = encodeURIComponent(name)
    ctx.attachment(name)
    ctx.set('content-disposition', name)
    ctx.set('Access-Control-Expose-Headers', 'Content-Disposition')
    await send(ctx, name, { root: __dirname + '/public/upload' })
  } else {
    ctx.body = {
      code: -1,
      data: '文件不存在'
    }
  }
})

router.post('/user/login', (ctx) => {
  console.log('/user/login', ctx)
  ctx.body = {
    code: 200,
    data: 'ok'
  }
})

// 注册中间件
app.use(cors())
app.use(static(UPLOAD_DIR))
app.use(router.routes()).use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`app starting at: ${RESOURCE_URL}`)
})
