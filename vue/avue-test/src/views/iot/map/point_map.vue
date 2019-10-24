<template>
  <div>
    <baidu-map class="bm-view" 
      :ak="baiduAk" 
      :center="center" 
      :zoom="zoom" 
      @ready="handler" 
      :scroll-wheel-zoom="true"
    >
      <map-overlay 
        v-for="(item,index) in pointList"
        :key="item.deviceId"
        :deviceId="item.deviceId"
        ref="overlay"
        :position="{lng: item.deviceLng, lat: item.deviceLat}"
        :text="item.deviceName"
        :activeNumber="activeNumber"
        :pointColor="setPointColor(item)"
        @showInfo="showInfo(index)"
        @mouseover.native="activeNumber = item.deviceId"
        @mousemove.native="overlay_move"
        @mouseleave.native="activeNumber = false"
      >
      </map-overlay>
    </baidu-map>
  </div>
</template>

<script>  
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import mapOverlay from '@/views/iot/map/map_overlay.vue'
  
  export default {
    props: ['center', 'zoom', 'baiduAk', 'pointList'],
    components: {
      BaiduMap,
      mapOverlay
    },
    data() {
      return {
        BMap: null,
        map: null,
        point: {
          lng: 119.275254,
          lat: 26.028928,
          address: '测试点'
        },
        pointColor: '#3ff4ff',
        activeNumber:false
      }
    },
    created() {
      
    },
    watch: {

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
        })
      },
      setPointColor(item) {
        let color = '#dfc25a'
        if(item.deviceEnableType === 'DISABLE'){
          return color
        }
        if(item.deviceStateName === 'WARING'){
          color = '#df1226'
          return color
        }
        if(item.deviceState === 'ONLINE'){
          color = '#2feb26'
          return color
        }
        return color
      },
      overlay_move(e) {
        if(!e.target.classList.contains('circular')){
          this.activeNumber = false
        }
      },
      showInfo(index) {
        this.$refs.overlay[index].dialogClose()
        this.$emit('showDetails',this.$refs.overlay[index].deviceId)
      },
      showPointDetails(id) {
        for(let item of this.$refs.overlay){
          if(item.deviceId === id){
            item.mapDialogShow()
          }
        }
      }
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