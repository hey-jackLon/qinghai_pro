import request from '@/utils/request'
const qs = require('qs')
export function deleteTourismChannelObject(data) {
  return request({
    url: '/TourismChannelController/deleteTourismChannelObject',
    method: 'post',
    data: qs.stringify(data)
  })
}
export function getObStationListByGczbs(data) {
  return request({
    url: '/TourismChannelController/getObStationListByGczbs',
    method: 'post',
    data
  })
}
export function updateTourismChannelObject(data) {
  return request({
    url: '/TourismChannelController/updateTourismChannelObject',
    method: 'post',
    data
  })
}

export function getTourismChannelList(data) {
  return request({
    url: '/TourismChannelController/getTourismChannelList',
    method: 'get',
    data
  })
}
export function getChannelRegionAnalysis(params, data) {
  return request({
    url: '/TourismChannelController/getChannelRegionAnalysis',
    method: 'post',
    params,
    data: data
  })
}
export function getChannelTimeAnalysis(params, data) {
  return request({
    url: '/TourismChannelController/getChannelTimeAnalysis',
    method: 'post',
    params,
    data: data
  })
}

