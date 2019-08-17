import Mock from 'mockjs'
import { groupLIst, groupTree, groupInfo, equLIst } from '@/const/iot/group'

export default ({ mock }) => {
  if (!mock) return;
  Mock.mock('/iot/device/tree/list', 'get', (res) => {
    let body = JSON.parse(res.body);
    console.log(body)
    return {
      data: groupLIst.data
    }
  })
  
  Mock.mock('/iot/device/tree/add', 'post', (res) => {
    let body = JSON.parse(res.body);
    let reData = {
      "code": 0,
      "data": body,
      "msg": ""
    }
    return reData
  })

  Mock.mock('/iot/device/tree/tree', 'get', (res) => {
    let body = JSON.parse(res.body);
    console.log(body)
    return groupTree
  })

  Mock.mock('/iot/device/tree/del', 'get', (res) => {
    let body = JSON.parse(res.body);
    let reData = {
      "code": 0,
      "data": body,
      "msg": ""
    }
    return reData
  })

  Mock.mock('/iot/device/tree/info', 'get', () => {
    return groupInfo
  })

  Mock.mock('/iot/device/tree/put', 'get', () => {
    let item = {
      "code": 0,
      "data": {},
      "msg": ""
    }
    return item
  })

  Mock.mock('/iot/equ/tree/list', 'get', (res) => {
    let body = JSON.parse(res.body);
    console.log(body)
    return equLIst
  })

}