import { createAction } from '@/common/axios.js'
import * as API from '@/api/homePage/homePage.api.js'

export const getApplicantList = (req) => {
  return createAction(req, API.getApplicantList)
}

export const getCardInfoList = (req) => {
  return createAction(req, API.getCardInfoList)
}

export const getOneCardInfo = (req) => {
  return createAction(req, API.getOneCardInfo)
}

export const getCaseStatus = (req) => {
  return createAction(req, API.getCaseStatus)
}

export const getCaseAmount = (req) => {
  return createAction(req, API.getCaseAmount)
}

