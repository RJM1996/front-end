import Cookies from 'js-cookie'
import config from '@/config'

const { cookieExpires, TOKEN_KEY } = config

// 操作 token
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}
export const delToken = () => {
  Cookies.remove(TOKEN_KEY)
}

// 获取当前日期days天之前的日期, 返回日期字符串: 2020-01-01
export const getDate = (days = 0) => {
  const gap = days * 24 * 60 * 60 * 1000
  let day = new Date()
  day.setTime(day.getTime() - gap)
  let month = day.getMonth() + 1
  let date = day.getDate()
  if (month < 10) month = '0' + month
  if (date < 10) date = '0' + date
  return day.getFullYear() + '-' + month + '-' + date
}

/**
 * 文件下载
 * @param {下载链接} url /download
 * @param {拼接参数对象} params {id:1, type:2}
 */
export const download = (url, params) => {
  let downloadUrl = url + '?'
  Object.keys(params).forEach((key) => {
    downloadUrl += `${key}=${params[key]}&`
  })
  downloadUrl = downloadUrl.substring(0, downloadUrl.length - 1)
  console.log(downloadUrl)
}

// 传入 ?name=sunyuxia&age=18
// 返回 {name: "sunyuxia", age: "18"}
export const getSearchParams = (search) => {
  const searchParams = {}
  const searchStr = search.substring(1) // 如果location中有search值，去除search值中的第一个字符‘?’
  const searchArr = searchStr.length ? searchStr.split('&') : [] // 以 & 符为分隔符，解析出key value 组合，组合的形式为'key=value'
  searchArr.forEach((item) => {
    let keyAndValue = item.split('=') // 以 = 为分隔符，解析出key 和 value,其中数组的第一项为key，数组的第二项为value
    let key = decodeURIComponent(keyAndValue[0]) // 如果查询参数中包含中文，会被编码成一串字符串，需要使用decodeURIComponent进行解码
    let value = decodeURIComponent(keyAndValue[1])
    if (key) {
      searchParams[key] = value
    }
  })
  return searchParams
}

// 判读是不是对象字面量(纯对象)。对象字面量创建方式有{}、new Object()创建
function isPlainObject(obj) {
  // 判读是否是自身属性
  function isHasPro(obj, pro) {
    return obj.hasOwnProperty(pro) ? true : false
  }
  // 若值为null，或者不是对象，return false;
  if (obj == null || typeof obj != 'object') {
    return false
  }
  if (isHasPro(obj.constructor.prototype, 'isPrototypeOf')) {
    return true
  }
  return false
}
// 遍历对象
export const eachObject = function eachObject(obj, callback) {
  if (!isPlainObject(obj)) throw new TypeError('obj must be an plain object')
  if (typeof callback !== 'function') callback = Function.prototype
  let keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)),
    i = 0,
    len = keys.length,
    key,
    value,
    result
  for (; i < len; i++) {
    key = keys[i]
    value = obj[key]
    result = callback(value, key)
    if (result === false) break
  }
  return obj
}
