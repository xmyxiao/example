<template>
  <div class="device-child-info">
    <div class="item-list-info">
      <div class="title">设备信息</div>
      <div></div>
      <div class="edit">
        
      </div>
    </div>
    
    <table class="item-table">
      <tr>
        <th>产品名称</th>
        <td>
          <span class="secret" style="max-width:200px" :title="deviceInfo.product.prodName">{{deviceInfo.product.prodName}}</span>
        </td>
        <th>ProductKey</th>
        <td>
          <span class="centent">{{deviceInfo.product.prodKey}}</span>
          <el-button type="text" size="small" @click.stop="copyText(infoData.product.prodKey)">复制</el-button>
        </td>
        <th>区域</th>
        <td>
          <span></span>
        </td>
      </tr>
      <tr>
        <th>节点类型</th>
        <td>
          <span>{{deviceInfo.prodNodeTypeName}}</span>
        </td>
        <th>DeviceSecret</th>
        <td>
          <span v-show="!showDeviceSecret" class="centent">********</span>
          <span v-show="showDeviceSecret" class="centent secret" :title="deviceInfo.deviceSecret">{{deviceInfo.deviceSecret}}</span>
          <el-button v-show="!showDeviceSecret" type="text" size="small" @click.stop="showDeviceSecret = true">显示</el-button>
          <el-button v-show="showDeviceSecret" type="text" size="small" @click.stop="copyText(deviceInfo.deviceSecret)">复制</el-button>
          <el-button v-show="showDeviceSecret" type="text" size="small" @click.stop="showDeviceSecret = false">隐藏</el-button>
        </td>
        <th>设备名称</th>
        <td>
          <span class="centent secret" style="max-width:150px" :title="deviceInfo.deviceName">{{deviceInfo.deviceName}}</span>
          <el-button type="text" size="small" style="position: relative;top: 2px;" @click.stop="dialogShow=true">编辑</el-button>
        </td>
      </tr>
      <tr>
        <th>当前状态</th>
        <td>
          <span>{{deviceInfo.deviceStateText}}</span>
        </td>
        <th>IP地址</th>
        <td>
          <span>{{deviceInfo.deviceIp}}</span>
        </td>
        <th>固件版本</th>
        <td>
          <span></span>
        </td>
      </tr>
      <tr>
        <th>添加时间</th>
        <td>
          <span>{{deviceInfo.createTime}}</span>
        </td>
        <th>激活时间</th>
        <td>
          <span>{{deviceInfo.activateTime}}</span>
        </td>
        <th>最后上线时间</th>
        <td>
          <span>{{deviceInfo.lastOnlineTime}}</span>
        </td>
      </tr>
    </table>

    <el-dialog class="item-dialog" title="编辑设备名称" :visible.sync="dialogShow" width="600px" @close="dialogCloseCell">
      <el-form :model="deviceInfo">
        <el-form-item label="设备名称：">
          <el-input v-model="dialogData.deviceName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="changeInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'child-info',
  props: {
		deviceInfo: {
      type: Object
    }
  },
  data() {
    return {
      dialogShow: false,
      dialogData: {
        product: {}
      },
      showDeviceSecret: false
    }
  },
  watch: {
    deviceInfo(obj) {
      this.setDialogData(obj)
    }
  },
  created() {

  },
  methods: {
    setDialogData(obj) {
      this.dialogData = JSON.parse(JSON.stringify(obj))
      let stateText = '', state = this.dialogData.deviceState
      switch(state) {
        case 'ONLINE':
          stateText = '在线'
          break;
        case 'OFFLINE':
          stateText = '离线'
          break;
        default:
          stateText = '未激活'
      }
      this.dialogData.deviceStateText = stateText
    },
    changeInfo() {
      this.$emit("editorDevice",this.dialogData);
    },
    dialogCloseCell() {
      let obj = this.deviceInfo
      this.setDialogData(obj)
    },
    closeDialog() {
      this.dialogShow = false
    },
    copyText(text) {
      let self = this;
      this.$copyText(text).then(function() {
        self.$message({
          message: '复制成功',
          type: 'success'
        });
      }, function() {
        self.$message.error('复制失败');
      })
    }
  }
}
</script>

<style lang="scss">
.device-child-info{
  background: #fff;
  padding: 20px;
  font-size: 14px;
  .item-list-info{
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    flex: 1;
    .title{
      line-height: 30px;
      font-size: 16px;
      font-weight: 700;
      color: #373d41;
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
  
  .item-table{
    width: 100%;
    border: 0;
    border-left: 1px solid #ebecec;
    border-top: 1px solid;
    border-color: #ebecec;
    margin-bottom: 18px;
    tr{
      height: 48px;
    }
    th,td{
      padding: 0 8px;
      border-right: 1px solid #ebecec;
      border-bottom: 1px solid #ebecec;
    }
    th{
      min-width: 120px;
      text-align: left;
      color: #74777a;
      font-weight: 400;
      background: #fafafc;
    }
    td{
      width: 22%;
      word-break: break-all;
      color: #666;
    }
    .centent{
      margin-right: 8px;
    }
    .secret{
      max-width: 100px;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      overflow: hidden;
      vertical-align: middle;
    }
  }

  .item-dialog{
    .el-dialog__header{
      border-bottom: 1px solid #ccc;
    }
    .el-dialog__body{
      padding: 28px;
      .el-form-item{
        .el-form-item__label{
          line-height: 30px;
        }
      }
    }
  }
}
</style>