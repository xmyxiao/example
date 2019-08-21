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
          <span>空调</span>
        </td>
        <th>ProductKey</th>
        <td>
          <span>a1xnfZQ8Vzg</span>
        </td>
        <th>区域</th>
        <td>
          <span>a1xnfZQ8Vzg</span>
        </td>
      </tr>
      <tr>
        <th>节点类型</th>
        <td>
          <span></span>
        </td>
        <th>DeviceName</th>
        <td>
          <span></span>
        </td>
        <th>DeviceSecret</th>
        <td>
          <span></span>
        </td>
      </tr>
      <tr>
        <th>备注名称</th>
        <td>
          <span></span>
        </td>
        <th>IP地址</th>
        <td>
          <span></span>
        </td>
        <th>固件版本</th>
        <td>
          <span></span>
        </td>
      </tr>
      <tr>
        <th>添加时间</th>
        <td>
          <span></span>
        </td>
        <th>激活时间</th>
        <td>
          <span></span>
        </td>
        <th>最后上线时间</th>
        <td>
          <span></span>
        </td>
      </tr>
      <tr>
        <th>当前状态</th>
        <td>
          <span></span>
        </td>
        <th>实时延迟</th>
        <td colspan="3">
          <span></span>
        </td>
      </tr>
    </table>

    <el-dialog class="item-dialog" title="编辑分组信息" :visible.sync="dialogShow" width="600px" @close="dialogCloseCell">
      <el-form :model="groupInfo">
        <el-form-item label="父组：">
          <el-input v-model="dialogData.parentId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分组名称：">
          <el-input v-model="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item label="分组描述：">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入分组描述"
            v-model="dialogData.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'child-info',
  props: {
		groupInfo: {
      type: Object
    }
  },
  data() {
    return {
      dialogShow: false,
      dialogData: {}
    }
  },
  watch: {
    groupInfo(obj) {
      this.setDialogData(obj)
    }
  },
  created() {

  },
  methods: {
    setDialogData(obj) {
      this.dialogData = JSON.parse(JSON.stringify(obj))
    },
    changeInfo() {
      this.$emit("editorGroup",this.dialogData);
    },
    dialogCloseCell() {
      let obj = this.groupInfo
      this.setDialogData(obj)
    },
    closeDialog() {
      this.dialogShow = false
    },
    copyGroupId() {
      this.$emit("copyGroupId");
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