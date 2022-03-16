import { Modal } from 'antd'
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 60000,
  responseType: 'blob' // 设置响应类型为 blob
})

// 创建 a 标签进行下载
function createAtagDownload(fileName, data) {
  let blob = new Blob([data])
  let elink = document.createElement('a')
  elink.download = fileName
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href) // 释放URL对象
  document.body.removeChild(elink)
}

export default function aTagDownload(url = '/download') {
  request
    .get(url)
    .then((result) => {
      console.log(result)
      const { data, headers } = result
      if (data.type === 'application/json') {
        // 返回的是json数据
        const reader = new FileReader() // 创建读取文件对象
        reader.addEventListener('loadend', function () {
          const res = JSON.parse(reader.result) // 返回的数据
          if (res.code === -1) {
            Modal.error('文件不存在')
          }
        })
        reader.readAsText(data, 'utf-8') // 设置读取的数据以及返回的数据类型为utf-8
      } else {
        // 返回的是文件流
        // 获取文件名并解码
        let fileName = headers['content-disposition']
        fileName = decodeURI(fileName)
        createAtagDownload(fileName, data)
      }
    })
    .catch((err) => {
      console.log(err, err.message)
      Modal.error({
        content: '服务器异常'
      })
    })
}
