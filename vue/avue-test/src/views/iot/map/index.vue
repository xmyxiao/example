<template>
  <div>
    <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true">
      <bm-marker 
        :position="{lng: point.lng, lat: point.lat}" 
        :dragging="true" 
        @dragend="mapDragend" 
        @mouseover="mapenter"
        :title="point.address"
      >
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>  
  export default {
    data() {
      return {
        center: {
          lng: 119.275254,
          lat: 26.028928
        },
        zoom: 20,
        BMap: null,
        map: null,
        point: {
          lng: 119.275254,
          lat: 26.028928,
          address: '测试点'
        }
      }
    },
    methods: {
      handler ({BMap, map}) {
        //地图
        this.BMap = BMap
        this.map = map
        map.setMapStyleV2({
          styleId: '22cc9921f4b0cc938d1a9252fa5af69d'
        });
      },
      mapDragend(type) {
        this.point.lng = type.point.lng
        this.point.lat = type.point.lat
        this.getPointName(type)
      },
      getPointName(e) {
        /* global BMap */
        const geocoder = new BMap.Geocoder()
        geocoder.getLocation(e.point, rs => {
          let province = rs.addressComponents.province // 省
          let city = rs.addressComponents.city // 城市
          let district = rs.addressComponents.district // 区县
          let street = rs.addressComponents.street // 街道
          let streetNumber = rs.addressComponents.streetNumber// 门牌号
          if(!streetNumber){
            streetNumber + '号'
          }
          this.point.address = province + city + district + street + streetNumber
          // console.log(rs.surroundingPois) // 附近的POI点(array) POI：兴趣点 可以是一栋房子、一个商铺、一个邮筒、一个公交站
          // console.log(rs.business) // 商圈字段，代表此点所属的商圈(string)
        })
      },
      mapenter() {
        console.log('123')
      },
    }
  }
</script>

<style lang="scss" scoped>
.bm-view{
  position: absolute;
  top: 0;
  bottom: -20px;
  width: 100%;
}
</style>