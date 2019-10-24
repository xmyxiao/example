<template>
  <div>
    <div class="btn" style="z-index: 9999999999999;color: #fff;position: absolute;cursor: pointer;" @click="btnClick">点击</div>
    <point-map
      ref="pointMap"
      :center="center"
      :zoom="zoom"
      :baiduAk="baiduAk"
      :pointList="pointList"
      @showDetails="showDetails"
    ></point-map>
  </div>
</template>

<script>  
  import pointMap from '@/views/iot/map/point_map.vue'
  
  export default {
    components: {
      pointMap
    },
    data() {
      return {
        center: {
          lng: 119.275254,
          lat: 26.028928
        },
        zoom: 20,
        baiduAk: 'N05AG95Umzs3fouk6WpFqtGxcDlw0fRn',
        pointList: [{
          "activateTime": "",
          "createTime": "",
          "deviceAddr": "设备使用地址",
          "deviceEnableType": "ENABLE",  //启用状态(启用，禁用),可用值:ENABLE,DISABLE
          "deviceId": 0,
          "deviceIp": "",
          "deviceKey": "",
          "deviceLat": 26.028928,
          "deviceLng": 119.275254,
          "deviceName": "设备名称1",
          "deviceSecret": "",
          "deviceState": "UNACTIVE",    //设备状态(未激活，在线，离线),可用值:UNACTIVE,ONLINE,OFFLINE
          "deviceStateName": "",
          "lastOnlineTime": "",
          "prodId": 0,
          "prodName": "",
          "prodNodeType": "",
          "prodNodeTypeName": "",
          "prodSourceType": "",
          "updateTime": ""
        },{
          "activateTime": "",
          "createTime": "",
          "deviceAddr": "设备使用地址",
          "deviceEnableType": "ENABLE",  //启用状态(启用，禁用),可用值:ENABLE,DISABLE
          "deviceId": 1,
          "deviceIp": "",
          "deviceKey": "",
          "deviceLat": 26.028,
          "deviceLng": 119.275,
          "deviceName": "设备名称2",
          "deviceSecret": "",
          "deviceState": "ONLINE",    //设备状态(未激活，在线，离线),可用值:UNACTIVE,ONLINE,OFFLINE
          "deviceStateName": "",
          "lastOnlineTime": "",
          "prodId": 0,
          "prodName": "",
          "prodNodeType": "",
          "prodNodeTypeName": "",
          "prodSourceType": "",
          "updateTime": ""
        }]
      }
    },
    methods: {
      showDetails(id) {
        this.$refs.pointMap.showPointDetails(id)
      },
      btnClick(){
        this.showDetails(1)
        this.center = {
          lng: 119.275,
          lat: 26.028
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>