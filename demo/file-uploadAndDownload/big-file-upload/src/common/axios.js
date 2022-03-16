import axios from 'axios'
import config from '@/config'
import { setToken, delToken } from './util'
import store from '@/store'
import { Modal } from 'antd'

const BaseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
  constructor(baseUrl = BaseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        this.queue[url] = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        this.destroy(url)
        const { data, code } = res
        if (data.code === config.expiryStatus) {
          delToken()
          window.location.reload(true)
        }

        if (data.code > 200) {
          Modal.error({
            title: '错误提示',
            content: data.msg || '服务器异常'
          })
        }
        return { data, code }
      },
      (error) => {
        this.destroy(url)
        Modal.error({
          title: '错误提示',
          content: error.message || '服务器异常'
        })
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    const instance = axios.create()
    let { data, method } = options
    if (options.headers) {
      // 包含文件流
      const formData = new FormData()
      for (const k in data) {
        formData.append(k, data[k])
      }
      data = formData
    }
    if (method.toLowerCase() === 'get') {
      // get 请求参数直接拼接在URL后面
      options = Object.assign(this.getInsideConfig(), options, { params: data })
    } else {
      options = Object.assign(this.getInsideConfig(), options, { data })
    }
    const { url } = options
    console.log(`--- req ---${url}\n` + JSON.stringify(options.data))
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

const createApi = (options) => {
  const axios = new HttpRequest()
  return axios.request(options)
}

export const createAction = (req, apiOptions, action, apiType) => {
  // 1. 根据 req 和 apiOptions 生成 axios 请求函数
  const reqFunc = (reqData) =>
    createApi({
      ...apiOptions,
      data: reqData
    })
  // 2. 使用 promise 封装请求函数的调用, 并返回
  return new Promise((resolve, reject) => {
    try {
      reqFunc(req)
        .then((res) => {
          const data = res.data
          if (+data.code === 200) {
            if (action) {
              store.dispatch(action(data.data))
            }
            if (apiType === 'login') {
              setToken('token')
            }
            if (apiType === 'logout') {
              delToken()
            }
            resolve(data.data)
          } else {
            reject(data.msg)
          }
        })
        .catch((err) => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

export default createApi
