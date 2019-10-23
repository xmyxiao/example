<template>
  <div class="map-dialog">
    <div class="map-tooltip-header">
      <div class="map-tooltip-header-icon-info">
        <!--<img src = "../../../src/assets/cloudV2/img/title.png" alt="">-->
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAQCAYAAAA1Qw7OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDODQzMEQ2RDAzMzExRTg5MTAzRjM2MEQ3ODQyNkMzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDODQzMEQ3RDAzMzExRTg5MTAzRjM2MEQ3ODQyNkMzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEM4NDMwRDREMDMzMTFFODkxMDNGMzYwRDc4NDI2QzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEM4NDMwRDVEMDMzMTFFODkxMDNGMzYwRDc4NDI2QzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rLvT6AAAAVUlEQVR42mJk6PrPxsDA0A3EMUDMCMSLgbiUBUh0AXEeAwKA2N8ZgTreAhlCDKjgHRMWQRAQYmLAAYaTxDss4uAgWYxFYg4odMugwR0LFQQprAUIMABR/w64Zj3dIAAAAABJRU5ErkJggg==" alt="">
        <div class="info" :title="dialogData.deviceName">{{dialogData.deviceName}}</div>
      </div>
      <div class="map-tooltip-header-exit" id="tooltip-header-exit" @click="dialogClose">
        <!--<img class = "exit-img" src="../../../src/assets/cloudV2/img/pop-exit.png" alt="">-->
        <img class="exit-img" src="data:image/png;base64,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" alt="">
      </div>
    </div>
    
    <div class="map-tooltip-main">
      <div class="map-tooltip-main-warning">
        <div class="warning-info">
          <div class="warning-num">报警总数</div>
          <div class="warning-num-each">
            <div class="warning-num-each-bg"
              v-for="(item,index) in dialogData.waringTotalArr"
              :key="index"
              v-text="item"
            >0</div>
          </div>
        </div>
          <div class="warning-info">
          <div class="warning-num">未处理报警</div>
          <div class="warning-num-each">
            <div class="warning-num-each-bg"
              v-for="(item,index) in dialogData.waringUntreatedArr"
              :key="index"
              v-text="item"
            >0</div>
          </div>
        </div>
        <div class="warning-info">
          <div class="warning-num">已处理报警</div>
          <div class="warning-num-each">
            <div class="warning-num-each-bg"
              v-for="(item,index) in dialogData.waringProcessedArr"
              :key="index"
              v-text="item"
            >0</div>
          </div>
        </div>
      </div>
        
      <div class="map-tooltip-main-info">
        <div class="map-tooltip-main-info-item">
          <div class="map-tooltip-main-info-item-imgbox">
            <!--<img src="../../../src/assets/cloudV2/img/device-sn.png" alt="">-->
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAWCAYAAADXYyzPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg3QzhFRUJGRDA0MDExRTg4QzJFRDA3NjkwQ0VFNEE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg3QzhFRUMwRDA0MDExRTg4QzJFRDA3NjkwQ0VFNEE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODdDOEVFQkREMDQwMTFFODhDMkVEMDc2OTBDRUU0QTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODdDOEVFQkVEMDQwMTFFODhDMkVEMDc2OTBDRUU0QTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7tB/hxAAABb0lEQVR42sSW0VHDMBBEJU/+MRXEJSgdOBVAB3EHuANMBQkVYDowFaBUgKmAUIFNBWJPs8po/ItkbuZFsj+8d+fzKto5p6KowFbliR8wXq9EGBjw4fLHBBpfLH5K3hiYgEpEzWdXER0TqAsU3bIN96AEL+AhQWvfgQEN+AI16MCn30PdghOznMHItU1YfceuKmrZgtnNXG9AzwxNwsGy7OZVS4QvnGaJZ3AEt0wgpbDm3nhNtnTiIKjMhEFutVwwoy3XMdN3bDhg37JqGkjJ6TNR21PHhUXJK5z1wrlWi0L9U2yivRjI3Qqtfo1bLX0/gLcVhks8Yr9hpSK6Y1bHRdX7hOIlNZqCwqHSgQmcI/4SUuEkhyA40bWsr55e3fEDdzxVUhlGT+9v+ezg23Y51U9sRaoYaUwHGkdot5Lh6jjNuwwDFRtTHznjEA5siUce1rl8uqKGf53hZsMzOHfM4a/P0jJNdG6mjjn2iF8BBgD08g/iMc6ILgAAAABJRU5ErkJggg==" alt="">
          </div>
          <span class="map-tooltip-main-info-item-sn">设备编号</span>
          <div class="map-tooltip-main-info-item-address">
          <div>{{dialogData.deviceNumber}}</div>
          </div>
        </div>
         <div class="map-tooltip-main-info-item">
          <div class="map-tooltip-main-info-item-imgbox">
            <!--<img src="../../../src/assets/cloudV2/img/template.png" alt="">-->
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNjhCMTIxRDA0MDExRThBNTE0RjVDOTg5RUE0RTk4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCNjhCMTIyRDA0MDExRThBNTE0RjVDOTg5RUE0RTk4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI2OEIxMUZEMDQwMTFFOEE1MTRGNUM5ODlFQTRFOTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI2OEIxMjBEMDQwMTFFOEE1MTRGNUM5ODlFQTRFOTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4I0eTFAAAAyElEQVR42mL8//9/AgMDQzwDbcBCJiChAMQOQMxIRSwINVOBBck2Byq6HGTWfhCDiYHGYOhbgBwH9VQ0VwGbBQ208AEjMB/QPIhAScoej5pGIBYAYn0yzH/IAPRBw3/8AKTG4T95oAE5DhjRbG9AivgLQOxIhg8esBCp8AMQH6BlPgDF038ycAOxPngAjWxSwQFSLGigNCfjAwZA3E9OfUCsBQJkFucHibXgAJZkTNUgIjsnI1vwn0Ac7CfDgkYWIjMQ2TkZIMAA14SJLCMI2VAAAAAASUVORK5CYII=" alt="">
          </div>
          <span class="map-tooltip-main-info-item-sn">数据模板</span>
          <div class="map-tooltip-main-info-item-address">
            <div>{{dialogData.dataMould}}</div>
          </div>
        </div>
         <div class="map-tooltip-main-info-item">
          <div class="map-tooltip-main-info-item-imgbox">
            <!--<img src="../../../src/assets/cloudV2/img/location.png" alt="">-->
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAaCAYAAADWm14/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg5RTZBRkMxRDA0MDExRTg5QTU3QkU5NjQ2NEQ5RDgzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg5RTZBRkMyRDA0MDExRTg5QTU3QkU5NjQ2NEQ5RDgzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODlFNkFGQkZEMDQwMTFFODlBNTdCRTk2NDY0RDlEODMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODlFNkFGQzBEMDQwMTFFODlBNTdCRTk2NDY0RDlEODMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WSImUAAAB00lEQVR42rxW7U3DMBBNK/6TDfAGNRMQJiAbkA2aEboBYYJmhDBBwwSUCepO0DJBuJOe0elIGzuNYulJF8c+3737sBdd1yUjhyWsCIbQEr4J52gtbEAkcsKh6x9bgonRt4hkoCa8Qv4g7CGnhJzwABaexb/JGNjAyz3BYi4VslxzCmUi9HADxWfIjJ2gng9cKyPqKQ3wSgt4fRBs1DCMR4n1Dt/pVAa0QmEJeSP+pzDihO8Ka7Ih3cvIouEEyyC3ar5FMlpRjtmQwuWI+nci8+Uw6n8SUgnLyEPZowbylvBCeILMTelTseSmKsMMMd2ppJTDoTqsSNDJqkAmYimM4mRrMOczfo91+dhOaES3S0TXOyOmvOHxAr0VYY31OWSZK+//7oseq+oeek+qBL+uhMlhbV+YqqEQyI6XKRgVCt0HDqr29X7frMw1A2oV50tt2Suzal8V0E3rSwYYQWHIldzB60Jk/bXWm/ax0Od9EVgVjYqvDdhTahb8DxvhvfTI9eTDEJxkwU/uIr2XYcsi9xSSBV0+yUz4Y+EW72+BZ6HhTsid7Shus7kGd9XVHQ7nx+TbqGf1uJHi9jwyAxaPifuZGfghFP4y8s/qucLg4LT7FWAAFK2zVnWmz/QAAAAASUVORK5CYII=" alt="">
          </div>
          <div class="map-tooltip-main-info-item-sn">设备地址</div>
          <div class="map-tooltip-main-info-item-address">
            <div title="陕西省西安市莲湖区青年路103号">{{dialogData.deviceAddress}}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map-tooltip-footer" @click="showInfo">
      <div class="map-tooltip-footer-imgbox">
        <!--<img src="../../../src/assets/cloudV2/img/device-eye.png" alt="">-->
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWUAAADICAYAAAAwcPA/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGRjYxQkM5RDA0MDExRTg5Qzk0RjU5M0QyMkMzNTVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGRjYxQkNBRDA0MDExRTg5Qzk0RjU5M0QyMkMzNTVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkZGNjFCQzdEMDQwMTFFODlDOTRGNTkzRDIyQzM1NUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkZGNjFCQzhEMDQwMTFFODlDOTRGNTkzRDIyQzM1NUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6GZuu/AAAdJUlEQVR42uyd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" alt="">
      </div>
      <span>查看详情</span>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['dialogInfo'],
  data() {
    return{
      dialogData: {}
    }
  },
  watch: {
    dialogInfo(obj) {
      this.setDialogData(obj)
    }
  },
  created() {
    this.setDialogData(this.dialogInfo)
  },
  methods: {
    setDialogData(obj) {
      this.dialogData = obj
      this.dialogData.waringTotalArr = this.numToArr(this.dialogData.waringTotal)
      this.dialogData.waringUntreatedArr = this.numToArr(this.dialogData.waringUntreated)
      this.dialogData.waringProcessedArr = this.numToArr(this.dialogData.waringProcessed)
    },
    numToArr(num){
      if(!num || !num.toString()){
        return ['0','0','0','0']
      }
      let numArr = num.toString().split("")
      if(numArr && numArr.length > 4){
        let reArr = numArr.slice(0,4)
        return reArr
      }else if(numArr && numArr.length < 4){
        let l = 4 - numArr.length
        for(let i = 0; i < l; i++){
          numArr.unshift('0')
        }
        return numArr
      }
      return ['0','0','0','0']
    },
    dialogClose() {
      this.$emit('dialogClose')
    },
    showInfo() {
      this.$emit('showInfo')
    }
  }
}
</script>

<style scoped>
.map-dialog{
  position: absolute;
  box-sizing: border-box;
  border-style: solid;
  white-space: nowrap;
  z-index: 9999999;
  border-width: 0px;
  border-color: rgb(51, 51, 51);
  border-radius: 4px;
  color: rgb(255, 255, 255);
  font: 14px/21px "Microsoft YaHei";
  left: -179px;
  top: -240px;
  width: 358px;
  height: 230px;
  padding: 8px 14px 14px;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWUAAADmCAYAAAAN1pR5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0RjdEMDU5RDAzRDExRThBMjQyOEFEMTBGOUQxQTUwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjg0RjdEMDVBRDAzRDExRThBMjQyOEFEMTBGOUQxQTUwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODRGN0QwNTdEMDNEMTFFOEEyNDI4QUQxMEY5RDFBNTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODRGN0QwNThEMDNEMTFFOEEyNDI4QUQxMEY5RDFBNTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5pvn0bAAAMRklEQVR42uzd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') 0px 0px no-repeat;
  user-select: text;
  pointer-events: none;
}
.map-tooltip-header {
  line-height: 24px;
  pointer-events: auto !important;
}
.map-tooltip-header-icon-info {
  flex: 1 1 auto;
  width: 80%;
}
.map-tooltip-header, .map-tooltip-header-icon-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.map-tooltip-header .info, .map-tooltip-header-icon-info .info {
  width: 80%;
  margin-left: 16px;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.map-tooltip-header .map-tooltip-header-exit, .map-tooltip-header-icon-info .map-tooltip-header-exit {
  cursor: pointer;
  width: 24px;
  height: 24px;
  pointer-events: auto !important;
  flex: 0 0 auto;
}
.map-tooltip-header .map-tooltip-header-exit img, .map-tooltip-header-icon-info .map-tooltip-header-exit img {
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
}
.map-tooltip-main {
  margin-top: 4px;
  padding-bottom: 10px;
  pointer-events: auto !important;
}
.map-tooltip-main-warning {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(8, 99, 131, 0.8);
}
.map-tooltip-main-warning .warning-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.warning-num {
  margin-bottom: 6px;
  font-weight: bold;
  color: #32EBCA;
}
.warning-num-each {
  line-height: 30px;
  display: flex;
  color: #34ECCB;
}
.warning-num-each .warning-num-each-bg {
  margin-right: 4px;
  width: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkREQkRERjMzRDFCOTExRThBMzRERkQyOTdCNzNEMjVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkREQkRERjM0RDFCOTExRThBMzRERkQyOTdCNzNEMjVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RERCRERGMzFEMUI5MTFFOEEzNERGRDI5N0I3M0QyNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RERCRERGMzJEMUI5MTFFOEEzNERGRDI5N0I3M0QyNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4SLJ2bAAACCElEQVR42syWTW7bMBCFhz+SgCyMLNNNvc8xcoScoOgBe4MkR+gZmk1/djGQwLLImc4bUrIR2KibcBHKzxIk8dMTKc2Tu/pytybnbiT4CwmBJEbiLpL0HfGsod9vV4mew3qu9iPtT9peVPdR/27i7+/XbnxaSdoRp4n0j4SZSISwHDanCwDOK8hH/XXkYk/jp/Xmz+1XAvACMN5tiaeRJE9FnA14tBkwkAvqNCfyevHh548VWBEHzZnCeNrq9iGQTwB9BWZ1l+sub2sD8gzRNaexQM8B6nFgRLc5RbujKN6VMct76OzQxvEozy8XE4VLDsrQscwMh946FsCBskrycYcSFqf7PqzAXB1i8E1ssgvI6UkR0mOMieHap/QH0OM5ev1ovKWB4ZICqc5Oi+ZTgsPQDOimesvNHE7NHU4f3iGAMXzkWUblGbq2Y8h9385hMmDXEJjbAn1rIFm10fSy4Hnv7WLRshcRhRaDJl/Lu7cianXvaEaFco6bVZOQEQGhACwjqpYsYXcyAg7PLyqV30IK+YpItBSbYeb0HyGFTA5FYJTUw+zEkq+IRD8Hz1kx2i1QMHgGIvl9TThEIlLs3KA3WDcYA/sBfBmvPm+GX48rjIPlq0bi/36KyHC5AcvRN1nj+wafEcWilHdyp8Vy3JHfjhSq8PJbmddXDG8FUm5ZMz+rHv4KMAB5yVtHmCTxrwAAAABJRU5ErkJggg==) no-repeat 50% 0;
}
.map-tooltip-main-info {
  padding: 10px 0 0;
  border-bottom: 1px solid rgba(8, 99, 131, 0.8);
}
.map-tooltip-main-info-item {
  width: 100%;
  line-height: 22px;
  display: flex;
  align-items: center;
  padding-bottom: 8px;
}
.map-tooltip-main-info-item .map-tooltip-main-info-item-imgbox {
  width: 16px;
  height: 16px;
  margin-right: 14px;
  flex: 0 0 auto;
}
.map-tooltip-main-info-item .map-tooltip-main-info-item-imgbox img {
  width: 100%;
  height: 100%;
}
.map-tooltip-main-info-item-sn {
  margin-right: 18px;
}
.map-tooltip-main-info-item-address {
  flex: 1 1 auto;
  width: 230px;
}
.map-tooltip-main-info-item-address > div {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.map-tooltip-footer {
  position: absolute;
  bottom: 6px;
  right: 16px;
  color: #23A6DD;
  cursor: pointer;
  display: flex;
  align-items: center;
  pointer-events: auto !important;
}
.map-tooltip-footer-imgbox {
  width: 14px;
  margin-right: 6px;
}
.map-tooltip-footer-imgbox img {
    width: 14px;
}
</style>