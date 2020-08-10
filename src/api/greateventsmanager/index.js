import request from '@/utils/request'

export function getMajorEventList(params){
  return request({
    url: '/MajorEventController/getMajorEventList',
    method: 'get',
    params
  })
}
