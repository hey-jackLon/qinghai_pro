import request from '@/utils/request'
export function deleteTourismChannelObject(data) {
  return request({
    url: '/TourismChannelController/deleteTourismChannelObject',
    method: 'post',
    data
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
