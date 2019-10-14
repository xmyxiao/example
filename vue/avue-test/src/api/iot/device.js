import request from '@/router/axios';
// 获取设备分组列表 
export const fetchDeviceList = (query) => {
  return request({
    url: '/iot/device/device/list',
    method: 'GET',
    params: query 
  })
}
//获取产品分组列表
export const produnitList = (query) => request({
  url: '/iot/prod/product/list',
  method: 'GET',
  params: query 
})
//获取设备列表数量统计
export const deviceListNumber = (query) => request({
  url: '/iot/device/device/count',
  method: 'GET',
  params: query 
})
// 新增设备
export const addObj = (query) => request({
  url: '/iot/device/device',
  method: 'POST',
  data: query 
})
// 批量删除
export const delDeviceList = (query) => request({
  url: '/iot/device/device/batch',
  method: 'DELETE',
  data: query 
})
// 批量启用
export const enableDeviceList = (query) => request({
  url: '/iot/device/device/batch/enable',
  method: 'PUT',
  data: query 
})
// 批量禁用
export const disenableDeviceList = (query) => request({
  url: '/iot/device/device/batch/disable',
  method: 'PUT',
  data: query 
})
// 获取设备详情
export const getDeviceInfo = (id) => request({
  url: '/iot/device/device/' + id,
  method: 'GET'
})
// 修改设备信息
export const putDeviceInfo = (data) => {
  return request({
    url: '/iot/device/device',
    method: 'PUT',
    data: data
  })
}
//获取topic列表
export const getTopicList = (query) => request({
  url: '/iot/device/device/topic',
  method: 'GET',
  params: query 
})
// 获取设备运行数据
export const getRunningData = (query) => request({
  url: '/iot/device/device/last/val',
  method: 'GET',
  params: query 
})

export const getGroupTree = () => request({
  url: '/iot/device/tree/tree',
  method: 'GET'
})

export const delDevice = (id) => request({
  url: '/iot/device/device/' + id,
  method: 'DELETE'
})

export const getGroupInfo = (id) => request({
  url: '/iot/device/tree/' + id,
  method: 'GET'
})

export const putGroupInfo = (data) => {
  console.info(data)
  return request({
    url: '/iot/device/tree',
    method: 'PUT',
    data: data
  })
}