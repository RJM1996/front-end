
import config from '@/config'
import { demo } from '@/api/CCCCCCCC/cccccccc'

const state = {

}

const mutations = {
  setDemo (state, data) {
    
  }
}

const actions = {
  demo ({ state, commit }, req) {
    return new Promise((resolve, reject) => {
      try {
        demo(req)
          .then(res => {
            const data = res.data
            if (+data.code === config.httpStatus) {
              commit('setDemo', data.data)
              resolve()
            } else {
              reject(data.msg)
            }
          })
          .catch(err => {
            reject(err)
          })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
