<template>
  <div>
    <h1>多文件上传</h1>
    <input id="MutipleFileUpload" type="file" accept="image/*" multiple />
    <button id="submit" @click="uploadFile()">上传文件</button>
  </div>
</template>

<script>
import { request } from '../common/axios';

export default {
  name: 'MutipleFileUpload',

  components: {},

  props: {},

  data () {
    return {
    }
  },

  computed: {},

  methods: {
    async uploadFile () {
      const uploadFileEle = document.querySelector('#MutipleFileUpload')
      console.log('file: ', uploadFileEle, uploadFileEle.files)
      if (!uploadFileEle.files.length) return
      const files = Array.from(uploadFileEle.files)
      // 省略文件的校验过程，比如文件类型、大小校验
      this.upload({
        url: '/multiple',
        files
      })
    },

    upload ({ url, files, fieldName = 'file' }) {
      let formData = new FormData()
      files.forEach(f => {
        formData.append(fieldName, f)
      })
      console.log(formData)
      request
        .post(url, formData, {
          // 监听上传进度
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log('进度', percentCompleted)
          }
        })
        .then((result) => {
          console.log(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}

</script>

<style lang='less' scoped>
</style>