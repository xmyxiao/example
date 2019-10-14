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

  // 产品列表
  Mock.mock('/iot/prod/product/list', 'get', (res) => {
    let body = JSON.parse(res.body);
    let reData = {
      "code": 0,
      "body": body,
      "data": {
        "current": 0,
        "pages": 0,
        "records": [
          {
            "createTime": "",
            "prodDataFormat": "",
            "prodGatewayType": "",
            "prodId": 0,
            "prodIsGateway": true,
            "prodKey": "",
            "prodModelId": 0,
            "prodName": "",
            "prodNetType": "",
            "prodNodeType": "",
            "prodNodeTypeName": "",
            "prodRemark": "",
            "prodSecret": "",
            "prodSourceType": "",
            "prodState": "",
            "updateTime": ""
          }
        ],
        "searchCount": true,
        "size": 0,
        "total": 0
      },
      "msg": ""
    }
    return reData.data
  })

  // 设备列表数量统计
  Mock.mock('/iot/device/device/count', 'get', (res) => {
    let body = JSON.parse(res.body);
    let reData = {
      "code": 0,
      "body": body,
      "data": {
        "activeCount": 0,
        "deviceCount": 0,
        "onlineCount": 0
      },
      "msg": ""
    }
    return reData.data
  })

  // 设备分组列表 
  Mock.mock('/iot/device/device/list', 'get', (res) => {
    let body = JSON.parse(res.body);
    let reData = {
      "code": 0,
      "body": body,
      "data": {
        "current": 0,
        "pages": 0,
        "records": [
          {
            "activateTime": "",
            "createTime": "",
            "deviceEnableType": "",
            "deviceId": 0,
            "deviceIp": "",
            "deviceKey": "",
            "deviceName": "",
            "deviceSecret": "",
            "deviceState": "",
            "deviceStateName": "",
            "lastOnlineTime": "",
            "prodId": 0,
            "prodName": "",
            "prodNodeType": "",
            "prodNodeTypeName": "",
            "prodSourceType": "",
            "updateTime": ""
          }
        ],
        "searchCount": true,
        "size": 0,
        "total": 0
      },
      "msg": ""
    }
    return reData.data
  })

}