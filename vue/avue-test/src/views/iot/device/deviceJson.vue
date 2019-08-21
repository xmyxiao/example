<template>
  <div class="device-child-info device-child-json">
    <div class="item-list-info">
      <div class="title">设备影子</div>
      <div></div>
      <div class="edit">
        <el-button type="default">刷新</el-button>
        <el-button type="primary">更新影子</el-button>
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
    </div>
  </div>
</template>

<script>
import '@json-editor/json-editor'

export default {
  name: 'child-json',
  data() {
    return {
      monacoInstance: null
     
    }
  },
  watch: {
   
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.monacoInstance = '';
      let schema = {
        "title": "Person",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "First and Last name",
            "minLength": 4,
            "default": "Jeremy Dorn"
          },
          "age": {
            "type": "integer",
            "default": 25,
            "minimum": 18,
            "maximum": 99
          },
          "favorite_color": {
            "type": "string",
            "format": "color",
            "title": "favorite color",
            "default": "#ffa500"
          }
        }
      }

      let element = window.document.getElementById('editor_holder')
      let config = { schema: {} }
      config['schema'] = schema
      console.log(config)
      this.editor = new window.JSONEditor(element, config)
      console.log(this.editor)
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