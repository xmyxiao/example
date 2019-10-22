<template>
  <bm-overlay
    ref="customOverlay"
    :class="{point: true, active}"
    pane="labelPane"
    @draw="draw">
    <span class="circular"></span>
    <span class="circular_bg"></span>
    <span class="circular_bg"></span>
    <span class="circular_bg"></span>
    <span class="circular_bg"></span>
    <div class="map_text" v-text="text"></div>
    <div class="map_dialog" :show="dialog_show" v-text="text">
      
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active'],
  data() {
    return {
      dialog_show: true
    }
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 12.5 + 'px'
      el.style.top = pixel.y - 12.5 + 'px'
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
  cursor: pointer;
  .circular{
    position: absolute;
    width: 25px;
    height: 25px;
    left: 0;
    bottom: 0;
    background: #F37B1D;
    border-radius: 50%;
    z-index: 1;
  }
  .circular_bg{
    position: absolute;
    width: 25px;
    height: 25px;
    left: 0;
    bottom: 0;
    background: #F37B1D;
    border-radius: 50%;
    z-index: -1;
  }
  .map_text{
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
  .map_dialog{
    
  }
  
}

.point.active{
  .circular_bg{
    -webkit-animation: biging 2s ease infinite normal;
  }
  .circular_bg:nth-child(2){
    -webkit-animation-delay: 0.5s; /*第二个span动画需要延迟2秒*/
  }
  .circular_bg:nth-child(3){
    -webkit-animation-delay: 1s; /*第二个span动画需要延迟2秒*/
  }
  .circular_bg:nth-child(4){
    -webkit-animation-delay: 1.5s; /*第二个span动画需要延迟2秒*/
  }
  .map_text{
    display: block;
  }
}
</style>