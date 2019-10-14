import request from '@/router/axios';

export const fetchGroupList = (query) => request({
  url: '/iot/device/tree/list',
  method: 'GET',
  params: query 
})

export const addObj = (query) => request({
  url: '/iot/device/tree',
  method: 'POST',
  data: query 
})

export const getGroupTree = () => request({
  url: '/iot/device/tree/tree',
  method: 'GET'
})

export const delGroup = (id) => request({
  url: '/iot/device/tree/' + id,
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