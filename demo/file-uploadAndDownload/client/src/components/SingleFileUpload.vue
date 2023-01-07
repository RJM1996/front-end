<template>
  <div id="SingleFileUpload">
    <h1>单文件上传</h1>
    <div>
      <input id="uploadFile" type="file" accept="image/*" />
      <button id="submit" @click="uploadFile()">上传文件</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SingleFileUpload',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    uploadFile() {
      const uploadFileEle = document.querySelector('#uploadFile')
      console.log(111, uploadFileEle, uploadFileEle.files)
      if (!uploadFileEle.files.length) return
      const file = uploadFileEle.files[0] // 获取单个文件
      // 省略文件的校验过程，比如文件类型、大小校验
      this.upload({
        url: '/single',
        file,
      })
    },

    upload({ url, file, fieldName = 'file' }) {
      const request = axios.create({
        baseURL: 'http://localhost:3000/upload',
        timeout: 60000,
      })
      let formData = new FormData()
      formData.set(fieldName, file)
      console.log(formData)
      request
        .post(url, formData, {
          // 监听上传进度
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log('进度', percentCompleted)
          },
        })
        .then((result) => {
          console.log(result.data)
          const { code, data, msg } = result.data
          if (code == 200) {
            alert(`${msg}, 地址: ${data.docPath}`)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  created() {},
}
</script>

<style lang="less" scoped></style>
