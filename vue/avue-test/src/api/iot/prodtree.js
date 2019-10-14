import request from '@/router/axios'

export function prodtreeCreate(obj) {
  return request({
    url: '/iot/prod/tree',
    method: 'post',
    data: obj
  })
}

export function prodtreeUpdate(obj) {
  return request({
    url: '/iot/prod/tree',
    method: 'put',
    data: obj
  })
}


export function prodtreeQurey(data) {
  return request({
    url: '/iot/prod/tree/tree',
    method: 'get',
    params: data
  })
}

export function prodtreeDelete(id) {
  return request({
    url: `/iot/prod/tree/${id}`,
    method: 'delete'
  })
}
