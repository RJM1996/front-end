<template>
  <div>
    <h1>目录压缩上传</h1>
    <input id="ZipDirUpload" type="file" accept="image/*" webkitdirectory />
    <button id="submit" @click="uploadFile()">上传文件</button>
  </div>
</template>

<script>
import { request } from '../common/axios';
import JSZip from 'jszip';

export default {
  name: 'ZipDirUpload',

  components: {},

  props: {},

  data () {
    return {
    }
  },

  computed: {},

  methods: {
    async uploadFile () {
      const uploadFileEle = document.getElementById('ZipDirUpload')
      let fileList = uploadFileEle.files;
      if (!fileList.length) return;
      let webkitRelativePath = fileList[0].webkitRelativePath;
      let zipFileName = webkitRelativePath.split("/")[0] + ".zip";
      let zipFile = await this.generateZipFile(zipFileName, fileList);
      console.log(zipFileName, zipFile)
      this.upload({
        url: "/zipDirUpload",
        file: zipFile,
        fileName: zipFileName
      });
    },

    upload ({ url, file, fileName, fieldName = 'file' }) {
      let formData = new FormData()
      formData.append(fieldName, file, fileName)
      console.log('formData: ', formData)
      formData.forEach((value, key) => {
        console.log(key, value)
      })
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
    },

    // 压缩文件
    generateZipFile (
      zipName, files,
      options = { type: "blob", compression: "DEFLATE" }
    ) {
      return new Promise((resolve, reject) => {
        const zip = new JSZip();
        for (let i = 0; i < files.length; i++) {
          zip.file(files[i].webkitRelativePath, files[i]);
        }
        zip.generateAsync(options).then(function (blob) {
          zipName = zipName || Date.now() + ".zip";
          const zipFile = new File([blob], zipName, {
            type: "application/zip",
          });
          resolve(zipFile);
        }).catch((err) => {
          reject(err)
        })
      });
    }

  }
}

</script>

<style lang='less' scoped>
</style>