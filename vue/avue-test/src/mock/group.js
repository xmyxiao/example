import Mock from 'mockjs'
import { groupLIst, groupTree, groupInfo } from '@/const/iot/group'

export default ({ mock }) => {
  if (!mock) return;
  Mock.mock('/iot/device/tree/list', 'get', (res) => {
      return {
        data: groupLIst
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

  Mock.mock('/iot/device/tree/info', 'get', (res) => {
    return groupInfo
  })

}