import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    setCount(state, data) {
      state.count += data
    },
  },
  actions: {
    setCount(context, data) {
      context.commit('setCount', data)
    }
  }
});

export default store;
