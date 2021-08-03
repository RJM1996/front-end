import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://localhost:3000/upload',
  timeout: 60000
})

export const downloadRequest = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000
})
