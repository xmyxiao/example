import request from '@/router/axios'

export function modelCreate(obj) {
  return request({
    url: '/iot/prod/model',
    method: 'post',
    data: obj
  })
}

export function modelUpdate(obj) {
  return request({
    url: '/iot/prod/model',
    method: 'put',
    data: obj
  })
}


export function modelQurey(data) {
  return request({
    url: '/iot/prod/model/list',
    method: 'get',
    params: data
  })
}

export function modelQureyTree(data) {
  return request({
    url: '/iot/prod/model/selected',
    method: 'get',
    params: data
  })
}

export function modelDelete(id) {
  return request({
    url: `/iot/prod/model/${id}`,
    method: 'delete'
  })
}

export function modelDetails(id) {
  return request({
    url: `/iot/prod/model/${id}`,
    method: 'get'
  })
}

export function funQueryOne(data) {
  return request({
    url: '/iot/prod/fun/list',
    method: 'get',
    params: data
  })
}

export function modelFunCreate(obj) {
  return request({
    url: '/iot/prod/fun/model',
    method: 'post',
    data: obj
  })
}

export function modelFunUpdate(obj) {
  return request({
    url: '/iot/prod/fun/model',
    method: 'put',
    data: obj
  })
}

export function modelFunDelete(id) {
  return request({
    url: `/iot/prod/fun/model/${id}`,
    method: 'delete'
  })
}

export function modelTopicList(data) {
  return request({
    url: '/iot/prod/topic/list',
    method: 'get',
    params: data
  })
}

export function modelTopicCreate(obj) {
  return request({
    url: '/iot/prod/topic/model',
    method: 'post',
    data: obj
  })
}

export function modelTopicUpdate(obj) {
  return request({
    url: '/iot/prod/topic/model',
    method: 'put',
    data: obj
  })
}

export function modelTopicDetete(id) {
  return request({
    url: `/iot/prod/topic/model/${id}`,
    method: 'delete'
  })
}
