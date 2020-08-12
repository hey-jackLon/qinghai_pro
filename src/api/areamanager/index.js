import request from '@/utils/request'
const qs = require('qs')
export function getODRegionList(params) {
  return request({
    url: '/ODAnalysisController/getODRegionList',
    method: 'post',
    params
  })
}

export function insertODRegionObject(params) {
  return request({
    url: '/ODAnalysisController/insertODRegionObject',
    method: 'post',
    data: params
    // transformRequest: [function(data) {
    //   // 对 data 进行任意转换处理
    //   const fromData = new FormData()
    //   for (const item in data) {
    //     fromData.append(item, data[item])
    //   }
    //   return fromData
    // }]
  })
}

export function getTollStationList(params) {
  return request({
    url: '/ODAnalysisController/getTollStationList',
    method: 'post',
    params
  })
}
export function deleteODRegionObject(params) {
  return request({
    url: '/ODAnalysisController/deleteODRegionObject',
    method: 'post',
    data: qs.stringify(params)
  })
}
