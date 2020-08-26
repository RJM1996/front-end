<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>我的 vue 应用</h1>
    <div>
      <input v-model.number="stepValue" style="width: 60px;">
      <button @click="addCount" style="margin: 0 20px;">累加器</button>
      <span>{{count}}</span>
    </div>
    
    <div style="width: 200px; margin: 20px auto;">
      <ul>
         <li>
          <router-link to="/">Go to Home</router-link>
        </li>
        <li>
          <router-link to="/foo">Go to Foo</router-link>
        </li>
        <li>
          <router-link to="/bar">Go to Bar</router-link>
        </li>
      </ul>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      stepValue: 0
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    addCount() {
      this.$store.dispatch('setCount', +this.stepValue)
    }
  },
  created() {
    console.log('router: ', this.$router)
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
  margin-top: 60px;
}
</style>
