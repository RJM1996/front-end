
import { getParams } from '@/libs/util'

// 模拟数据定义
export const demo = req => {
  req = getParams(req.body)
  const content = {}
  return {
    code: 200,
    msg: '',
    data: content
  }
}
