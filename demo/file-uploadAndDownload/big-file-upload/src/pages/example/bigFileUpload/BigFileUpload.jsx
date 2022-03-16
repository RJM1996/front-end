import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'
import asyncPool from 'tiny-async-pool'
const SparkMD5 = require('spark-md5')

const NEED_SPLIT = 10 * 1024 // 文件大于该值时才需要进行分片
const request = axios.create({
  baseURL: 'http://localhost:3000/upload',
  timeout: 60000
})

// 大文件上传
class BigFileUpload extends Component {
  chunkSize = 2 * 1024 // 分片大小 2kb
  fileChunks = [] // 文件分片列表
  alreadySendCount = 0 // 已上传分片个数
  md5Percent = 0 // 生成MD5的进度

  // 文件分片并上传
  async splitUpload(file) {
    this.initData()
    // 每次点击上传就生成一个该文件的md5, 作为该文件的唯一标识
    const token = await this.calcFileMD5(file)
    console.log('token: ', token, token.length)
    const fileName = file.name
    // 判断是否需要分片
    if (file.size > NEED_SPLIT) {
      // 1. 大文件分片
      let start = 0
      let end = 0
      let chunkSize = 0
      while (1) {
        end += this.chunkSize
        const chunk = file.slice(start, end)
        chunkSize += chunk.size
        start = end
        if (!chunk.size) break
        this.fileChunks.push(chunk)
      }
      console.log('size: ', file.size, chunkSize)
      // 2. 判断文件在服务器上是否已存在
      const fileStatus = await this.checkFileExist(token, fileName)
      // 3. 上传分片
      if (fileStatus.data && fileStatus.data.isExist) {
        // 文件已存在, 等价于秒传
        message.success('文件已存在, 秒传成功')
        this.onSuccess({ msg: '文件已存在, 秒传成功' })
        return
      } else {
        // 文件不存在, 开始分片上传
        this.upload(token, fileName, fileStatus)
      }
    } else {
      // 不需要分片, 直接上传
      console.log(file.size, '不需要分片, 直接上传')
      this.singleFileUpload(file)
    }
  }

  // 每次上传前初始化数据
  initData() {
    this.alreadySendCount = 0
    this.fileChunks = []
    this.md5Percent = 0
  }

  // 计算文件的md5, 这种方式对于大体积的文件计算更加稳定, 还可以获得计算进度
  calcFileMD5(file) {
    return new Promise((resolve, reject) => {
      let chunkSize = this.chunkSize,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader()

      fileReader.onload = (e) => {
        spark.append(e.target.result)
        currentChunk++
        // 获取计算进度
        this.md5Percent = Math.floor((currentChunk / chunks) * 100).toFixed(2)
        // console.log('md5Percent: ', this.md5Percent + '%')
        if (currentChunk < chunks) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }

      fileReader.onerror = (e) => {
        reject(fileReader.error)
        fileReader.abort()
      }

      function loadNext() {
        let start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(file.slice(start, end))
      }
      loadNext()
    })
  }

  // 循环上传所有分片
  upload(token, fileName, fileStatus) {
    const { chunkIds } = fileStatus.data
    const poolLimit = 4 // 并发数限制
    console.log('array: ', [...new Array(this.fileChunks.length).keys()])
    return asyncPool(poolLimit, [...new Array(this.fileChunks.length).keys()], (i) => {
      // console.log(chunkIds, i, chunkIds.includes(i))
      if (chunkIds.includes(i)) {
        console.log('分片已存在', chunkIds, i)
        // 已上传分片数+1
        this.alreadySendCount += 1
        this.updateProgress()
        if (this.alreadySendCount === this.fileChunks.length) {
          this.mergeFileRequest(fileName, token)
        }
        // 该分片已存在, 直接跳过
        return Promise.resolve()
      }
      return this.uploadChunk(token, fileName, i)
    })
  }

  // 上传单个分片
  uploadChunk(token, fileName, i) {
    const fd = new FormData() //构造FormData对象
    fd.append('file', this.fileChunks[i], `${token + '-' + i}`)

    return request
      .post('/bigFile', fd)
      .then((result) => {
        this.alreadySendCount += 1
        this.updateProgress()
        if (this.alreadySendCount === this.fileChunks.length) {
          message.success('分片全部上传完成, 开始合并文件')
          // 全部分片上传完成后,再发请求通知后端合并文件
          this.mergeFileRequest(fileName, token)
        }
      })
      .catch((err) => {
        console.log(err)
        this.onError(err)
      })
  }

  mergeFileRequest(fileName, token) {
    request
      .get('/mergeChunks', {
        params: {
          fileName,
          token: token
        }
      })
      .then((result) => {
        message.success('文件上传完成')
        this.onSuccess(result.data)
        console.log(result.data)
        const { url } = result.data ? result.data.data : { url: '' }
        console.log('文件地址: ', url)
      })
      .catch((err) => {
        console.log(err)
        this.onError(err)
      })
  }

  // 无需分片的文件, 直接上传
  singleFileUpload(file) {
    const fd = new FormData()
    fd.append('file', file)
    request
      .post('/single', fd)
      .then((result) => {
        console.log(result)
        this.onSuccess(result.data)
      })
      .catch((err) => {
        console.log(err)
        this.onError(err)
      })
  }

  // 检查文件是否已存在服务器上
  checkFileExist(token, fileName) {
    return request
      .get('/exist', {
        params: {
          token,
          fileName
        }
      })
      .then((result) => {
        return result.data
      })
      .catch((err) => {
        console.log(err)
        this.onError(err)
      })
  }

  // 更新上传进度
  updateProgress() {
    const percent = (this.alreadySendCount / this.fileChunks.length) * 100
    this.onProgress({ percent: percent.toFixed(2) })
  }

  uploadProps = {
    customRequest: (options) => {
      console.log(options)
      const { file, onError, onProgress, onSuccess } = options
      this.onError = onError
      this.onSuccess = onSuccess
      this.onProgress = onProgress
      this.splitUpload(file)
    },
    // beforeUpload: (file, fileList) => {
    //   console.log(file, fileList)
    //   // 在这里获取到file对象, 并返回 false 阻止默认上传
    //   this.splitUpload(file)
    //   return false
    // },
    onRemove: (file) => {
      console.log('删除文件: ', file.name)
      // 删除文件时, 可发起请求, 同时删除服务器上的该文件
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: (percent) => `${percent}%`
    },
    multiple: false // 是否可选多个文件
  }
  render() {
    return (
      <div>
        <Upload {...this.uploadProps}>
          <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
      </div>
    )
  }
}

export default BigFileUpload
