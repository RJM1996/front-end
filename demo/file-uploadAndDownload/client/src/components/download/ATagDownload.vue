<template>
  <div>
    <h3>a 标签下载示例</h3>
    <div>
      <img src="../../assets/images/body.png" />
      <img src="../../assets/images/eyes.png" />
      <img src="../../assets/images/mouth.png" />
    </div>
    <img id="mergedPic" src="http://via.placeholder.com/256" />
    <button onclick="merge()">图片合成</button>
    <button onclick="download()">图片下载</button>

  </div>
</template>

<script>
export default {
  name: 'name',

  components: {},

  props: {},

  data () {
    return {
    }
  },

  computed: {},

  methods: {},

  created () { },
}

</script>

<style lang='less' scoped>
</style>