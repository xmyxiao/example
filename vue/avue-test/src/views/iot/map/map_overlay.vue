<template>
  <bm-overlay
    ref="customOverlay"
    :class="{point: true, active}"
    pane="labelPane"
    @draw="draw">
    <span class="circular" @click="mapDialogShow" :style="{background:pointColor}"></span>
    <span class="circular-bg" :style="{background:pointColor}"></span>
    <span class="circular-bg" :style="{background:pointColor}"></span>
    <span class="circular-bg" :style="{background:pointColor}"></span>
    <span class="circular-bg" :style="{background:pointColor}"></span>
    <div class="map-text" v-text="text" :style="{color:pointColor}"></div>
    <div class="map-overlay-dialog" v-show="dialogShow">
      <map-dialog
        :show="false"
        :dialogInfo="dialogInfo"
        @dialogClose="dialogClose"
        @showInfo="showInfo"
      ></map-dialog>
    </div>
  </bm-overlay>
</template>

<script>
import bmOverlay from 'vue-baidu-map/components/overlays/Overlay.vue'
import mapDialog from '@/views/iot/map/map_dialog.vue'
export default {
  props: ['text', 'position', 'activeNumber', 'pointColor', 'deviceId'],
  components: {
    bmOverlay,
    mapDialog
  },
  data() {
    return {
      active: false,
      dialogShow: false,
      dialogInfo: {
        deviceName: '设备名称',
        deviceNumber: '00004299000000000019',
        dataMould: '仪表',
        deviceAddress: '福建省福州市仓山区冠浦路152号',
        waringTotal: 100,
        waringUntreated: 99,
        waringProcessed: 1,
        loadShow:false
      }
    }
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    },
    activeNumber(num){
      if(num === this.deviceId){
        this.active = true
        
      }else{
        this.active = false
      }
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 12.5 + 'px'
      el.style.top = pixel.y - 12.5 + 'px'
    },
    dialogClose() {
      this.dialogShow = false
    },
    mapDialogShow() {
      this.dialogShow = true
      this.dialogInfo.deviceNumber = this.deviceId
      this.dialogInfo.deviceName = this.text
    },
    showInfo(){
      this.$emit('showInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes biging{
  0%{
    transform: scale(1);
    opacity: 1;  
  }
  100%{
    transform: scale(2.5);
    opacity: 0;
  }
}

.point {
  position: relative;
  width: 25px;
  height: 25px;
  .circular{
    position: absolute;
    width: 25px;
    height: 25px;
    left: 0;
    bottom: 0;
    background: #F37B1D;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
  }
  .circular-bg{
    position: absolute;
    width: 25px;
    height: 25px;
    left: 0;
    bottom: 0;
    background: #F37B1D;
    border-radius: 50%;
    z-index: -1;
  }
  .map-text{
    display: none;
    height: 25px;
    position: absolute;
    left: 30px;
    color: #fff;
    font-size: 14px;
    overflow: hidden;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
  }  
}

.point.active{
  .circular-bg{
    -webkit-animation: biging 2s ease infinite normal;
  }
  .circular-bg:nth-child(2){
    -webkit-animation-delay: 0.5s; /*第二个span动画需要延迟2秒*/
  }
  .circular-bg:nth-child(3){
    -webkit-animation-delay: 1s; /*第二个span动画需要延迟2秒*/
  }
  .circular-bg:nth-child(4){
    -webkit-animation-delay: 1.5s; /*第二个span动画需要延迟2秒*/
  }
  .map-text{
    display: block;
  }
}

</style>