<template>
  <div>
    <h3>a 标签下载示例</h3>
    <div>
      <img src="../../assets/images/body.png" />
      <img src="../../assets/images/eyes.png" />
      <img src="../../assets/images/mouth.png" />
    </div>
    <img id="mergedPic" src="http://via.placeholder.com/256" />
    <br />
    <button @click="merge()">图片合成</button>
    <button @click="download()">图片下载</button>
    <button @click="downloadA()">下载A</button>
    <button @click="downloadB()">下载B</button>
  </div>
</template>

<script>
import mergeImages from 'merge-images'
import body from '../../assets/images/body.png'
import eyes from '../../assets/images/eyes.png'
import mouth from '../../assets/images/mouth.png'
import { downloadRequest } from '../../common/axios'

export default {
  name: 'ATagDownload',

  components: {},

  props: {},

  data() {
    return {
      mergePicEle: null,
      mergeFileUrl: null,
    }
  },
  computed: {},

  methods: {
    merge() {
      mergeImages([
        { src: body, x: 0, y: 0 },
        { src: eyes, x: 32, y: 0 },
        { src: mouth, x: 16, y: 0 },
      ])
        .then((result) => {
          console.log(typeof result)
          this.mergeFileUrl = result
          this.mergePicEle.src = result
        })
        .catch((err) => {
          console.log(err)
        })
    },
    download() {
      if (!this.mergeFileUrl) {
        alert('请先合成')
        return
      }
      const imgBlob = this.dataUrlToBlob(this.mergeFileUrl, 'image/png')
      console.log(imgBlob)
      this.saveFile(imgBlob, 'face.png')
    },
    dataUrlToBlob(base64, mimeType) {
      let bytes = window.atob(base64.split(',')[1])
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      // console.log(bytes, ab, ia)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      console.log(ab, [ab])
      return new Blob([ab], { type: mimeType })
    },
    saveFile(blob, filename) {
      const aTag = document.createElement('a')
      aTag.download = filename
      const downloadUrl = URL.createObjectURL(blob)
      console.log('url: ', downloadUrl)
      aTag.href = downloadUrl
      aTag.click()
      URL.revokeObjectURL(downloadUrl)
    },
    downloadA() {
      const url = '/success.xlsx'
      // window.open(url)
      downloadRequest
        .get(url)
        .then((result) => {
          console.log(result.data)
          let contentType = result.headers['content-type']
          if (contentType && contentType.indexOf(';') !== -1) {
            contentType = contentType.substr(0, contentType.indexOf(';'))
          }
          console.log(contentType)
          // const blob = new Blob([result.data], contentType)
          const blob = this.dataUrlToBlob(result.data, contentType)
          this.saveFile(blob, 'logo.png')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    downloadB() {
      const url = 'http://localhost:3000/success.xlsx'
      window.open(url)
    },
  },
  mounted() {
    this.mergePicEle = document.getElementById('mergedPic')
  },

  created() {},
}
</script>

<style lang="less" scoped></style>
