import request from '@/router/axios'

export function productCreate(obj) {
  return request({
    url: '/iot/prod/product',
    method: 'post',
    data: obj
  })
}

export function productUpdate(obj) {
  return request({
    url: '/iot/prod/product',
    method: 'put',
    data: obj
  })
}

export function productQurey(data) {
  return request({
    url: '/iot/prod/product/list',
    method: 'get',
    params: data
  })
}

export function productDelete(id) {
  return request({
    url: `/iot/prod/product/${id}`,
    method: 'delete'
  })
}

export function productInfoID(id) {
  return request({
    url: `/iot/prod/product/${id}`,
    method: 'get'
  })
}

export function productTopicList(data) {
  return request({
    url: '/iot/prod/topic/list',
    method: 'get',
    params: data
  })
}

export function productTopicCreate(obj) {
  return request({
    url: '/iot/prod/topic/custom',
    method: 'post',
    data: obj
  })
}

export function productTopicUpdate(obj) {
  return request({
    url: '/iot/prod/topic/custom',
    method: 'put',
    data: obj
  })
}

export function productTopicDetete(id) {
  return request({
    url: `/iot/prod/topic/custom/${id}`,
    method: 'delete'
  })
}

export function productTopicInfoID(id) {
  return request({
    url: `/iot/prod/topic/custom/${id}`,
    method: 'get'
  })
}

export function productCustomFunList(data) {
  return request({
    url: '/iot/prod/fun/list',
    method: 'get',
    params: data
  })
}

export function productCustomFunCreate(obj) {
  return request({
    url: '/iot/prod/fun/custom',
    method: 'post',
    data: obj
  })
}

export function productCustomFunUpdate(obj) {
  return request({
    url: '/iot/prod/fun/custom',
    method: 'put',
    data: obj
  })
}

export function productCustomFunDelete(id) {
  return request({
    url: `/iot/prod/fun/custom/${id}`,
    method: 'delete'
  })
}

export function productStandardFunSelected(data) {
  return request({
    url: `/iot/prod/fun/selected/standard`,
    method: 'get',
    params: data
  })
}

export function productStandardFunCreate(obj) {
  return request({
    url: '/iot/prod/fun/standard',
    method: 'post',
    data: obj
  })
}

export function productStandardFunDelete(id) {
  return request({
    url: `/iot/prod/fun/standard/${id}`,
    method: 'delete'
  })
}

export function productStandardFunUpdate(obj) {
  return request({
    url: '/iot/prod/fun/standard',
    method: 'put',
    data: obj
  })
}