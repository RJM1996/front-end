// 获取申请人下拉列表
export const getApplicantList = {
  method: 'POST',
  url: '/case/getBasicData'
}

// 获取上方8张卡片的数据
export const getCardInfoList = {
  method: 'POST',
  url: '/homePage/getCardInfoList'
}

// 根据申请人获取单独卡片的数据
export const getOneCardInfo = {
  method: 'POST',
  url: '/homePage/getOneCardInfo'
}

// 获取案件状态统计数据
export const getCaseStatus = {
  method: 'POST',
  url: '/homePage/getCaseStatus'
}

// 获取案件金额统计数据
export const getCaseAmount = {
  method: 'POST',
  url: '/homePage/getCaseAmount'
}