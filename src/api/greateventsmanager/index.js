import request from '@/utils/request'
const qs = require('qs')
export function getMajorEventList(params) {
  return request({
    url: '/MajorEventController/getMajorEventList',
    method: 'get',
    params
  })
}
export function getObStationListByGczbs(params) {
  return request({
    url: '/MajorEventController/getObStationListByGczbs',
    method: 'post',
    params
  })
}
export function updateMajorEventObject(params) {
  return request({
    url: '/MajorEventController/updateMajorEventObject',
    method: 'post',
    data: params
  })
}
export function deleteMajorEventObject(params) {
  return request({
    url: '/MajorEventController/deleteMajorEventObject',
    method: 'post',
    data: qs.stringify(params)
  })
}
