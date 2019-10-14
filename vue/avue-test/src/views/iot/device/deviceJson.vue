<template>
  <div class="device-child-info device-child-json">
    <div class="item-list-info">
      <div class="title">设备影子</div>
      <div></div>
      <div class="edit">
        <el-button type="default" size="small">刷新</el-button>
        <el-button type="primary" size="small">更新影子</el-button>
      </div>
    </div>
    
    <div class="json-header">
      <div class="title">
        最近更新时间：
      </div>
      <div class="time">
        2019
      </div>
    </div>
    <div class="json-body">
      <div id="editor_holder"></div>
      <v-jsoneditor v-model="json" 
      :show-btns="false" 
      :exapndedOnStart="true" 
      :options="options" 
      :plus="false" 
      :height="height"
      @error="onError"
      ></v-jsoneditor>
    </div>
  </div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'

export default {
  name: 'device-json',
  components: {
    VJsoneditor
  },
  data() {
    return {
      options:{
        mode: 'code'
      },
      height: '400px',
      json: {
        "state": {
          "reported": {},
          "desired": {}
        },
        "metadata": {
          "reported": {},
          "desired": {}
        },
        "timestamp": 0,
        "version": 0
      }
    }
  },
  methods: {
    onError() {
      console.log('error')
    }
  }
}
</script>

<style lang="scss" scoped>
  .device-child-json{
    .json-header{
      width: 100%;
      font-size: 14px;
      display: flex;
      overflow: hidden;
      background-color: rgb(249, 249, 249);
      border: 1px solid rgb(235, 236, 236);
      .title{
        text-indent: 16px;
        color: #373d41;
        font-weight: 700;
        line-height: 52px;
      }
      .time{
        color: #73777a;
        line-height: 52px;
      }
    }
    
  }
</style>
<style lang="scss">
  .device-child-json{
    div.jsoneditor-menu{
      display: none;
    }
    div.jsoneditor{
      border: 0;
    }
    .ace-jsoneditor .ace_gutter{
      color:#aaa;
    }
  }
</style>