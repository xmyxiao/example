import request from '@/router/axios';

export const fetchEquipmentList = (query) => request({
  url: '/iot/equ/tree/list',
  method: 'GET',
  data: query 
})

export const addObj = (query) => request({
  url: '/iot/device/tree/add',
  method: 'POST',
  data: query 
})

export const getGroupTree = () => request({
  url: '/iot/device/tree/tree',
  method: 'GET'
})

export const delGroup = (query) => request({
  url: '/iot/device/tree/del',
  method: 'GET',
  data: query 
})

export const getGroupInfo = (query) => request({
  url: '/iot/device/tree/info',
  method: 'GET',
  data: query 
})

export const putGroupInfo = (query) => request({
  url: '/iot/device/tree/put',
  method: 'GET',
  data: query 
})