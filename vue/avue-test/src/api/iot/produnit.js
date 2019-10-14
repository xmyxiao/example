import request from '@/router/axios'

export function produnitList(data) {
  return request({
    url: '/iot/base/unit/list',
    method: 'get',
    params: data
  })
}


export function produnitCreate(obj) {
  return request({
    url: '/iot/base/unit',
    method: 'post',
    data: obj
  })
}

export function produnitPut(obj) {
  return request({
    url: '/iot/base/unit',
    method: 'put',
    data: obj
  })
}

export function produnitDelete(id) {
  return request({
    url: `/iot/base/unit/${id}`,
    method: 'delete'
  })
}

export function produnitselected(data) {
  return request({
    url: '/iot/base/unit/selected',
    method: 'get',
    params: data
  })
}
