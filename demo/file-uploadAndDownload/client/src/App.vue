<template>
  <div id="app">
    <SingleFileUpload />
    <MultipleFileUpload />
    <DirFileUpload />
    <ZipDirUpload />
    <ATagDownload />
    <BigFileDownload />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SingleFileUpload from './components/SingleFileUpload.vue';
import MultipleFileUpload from './components/MultipleFileUpload.vue';
import DirFileUpload from './components/DirFileUpload.vue';
import ZipDirUpload from './components/ZipDirUpload.vue';
import ATagDownload from './components/download/ATag-Download.vue';
import BigFileDownload from './components/download/BigFileDownload.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    SingleFileUpload,
    MultipleFileUpload,
    DirFileUpload,
    ZipDirUpload,
    ATagDownload,
    BigFileDownload
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

#app>* {
  width: 500px;
  padding: 20px;
  border: 1px solid;
}
</style>
