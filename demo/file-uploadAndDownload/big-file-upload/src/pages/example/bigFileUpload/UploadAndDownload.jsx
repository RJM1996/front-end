import React, { Component } from 'react'
import BigFileUpload from './BigFileUpload'
import { Button, Space } from 'antd'
import download from '@/common/download.js'
import Test from './Test'

class UploadAndDownload extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  download = () => {
    const url = 'http://localhost:8080/download?name=success'
    download(url)

    // window.open('http://localhost:8080/download', '__blank')
  }

  render() {
    return (
      <div>
        <div className='g-content'>
          <Space>
            <BigFileUpload></BigFileUpload>
            <div>
              <Button onClick={this.download}>下载文件</Button>
            </div>
          </Space>
        </div>

        <div>
          <Test />
        </div>
      </div>
    )
  }
}

export default UploadAndDownload
