<template>
  <div>
    <div class="group-list-info">
      <div class="title">分组信息</div>
      <div></div>
      <div class="edit">
        <el-button type="primary" @click.stop="dialogShow = true">编辑</el-button>
      </div>
    </div>
    <div class="group-list-table">
      <div class="table-row">
        <div class="table-row-col">
          <div class="title">
            分组信息
          </div>
          <div class="content">
            <span class="name">{{groupInfo.name}}</span>
          </div>
        </div>
        <div class="table-row-col">
          <div class="title">
            分组层级
          </div>
          <div class="content">
            
          </div>
        </div>
        <div class="table-row-col">
          <div class="title">
            分组ID
          </div>
          <div class="content">
            <span class="group-id">{{groupInfo.appId}}</span>
            <el-button type="text" size="small" @click.stop="copyGroupId">复制</el-button>
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-row-col">
          <div class="title">
            设备总数
          </div>
          <div class="content">
            0
          </div>
        </div>
        <div class="table-row-col">
          <div class="title">
            激活设备
          </div>
          <div class="content">
            0
          </div>
        </div>
        <div class="table-row-col">
          <div class="title">
            当前设备
          </div>
          <div class="content">
            0
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-row-col">
          <div class="title">
            创建时间
          </div>
          <div class="content">
            {{groupInfo.createTime}}
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="table-row-col">
          <div class="title">
            分组描述
          </div>
          <div class="content">
            {{groupInfo.remark}}
          </div>
        </div>
      </div>
    </div>

    <el-dialog class="group-dialog" title="编辑分组信息" :visible.sync="dialogShow" width="600">
      <el-form :model="groupInfo">
        <el-form-item label="父组">
          <el-input v-model="dialogData.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分组名称">
          <el-input v-model="dialogData.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分组描述">
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
      this.dialogData = JSON.parse(JSON.stringify(obj))
    }
  },
  created() {

  },
  methods: {
    changeInfo() {
      this.$emit("editorGroup",this.dialogData.remark);
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
  .group-list-info{
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
  .group-list-table{
    border-top: 1px solid #ebecec;
    border-left: 1px solid #ebecec;
    .table-row{
      display: flex;
      .table-row-col{
        display: flex;
        flex: 1 1 0%;
        overflow: hidden;
        font-size: 14px;
        .title{
          width: 120px;
          height: 48px;
          color: rgb(116, 119, 122);
          display: flex;
          align-items: center;
          background: rgb(250, 250, 252);
          border-bottom: 1px solid rgb(235, 236, 236);
          border-right: 1px solid rgb(235, 236, 236);
          padding: 0px 12px;
        }
        .content{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1 1 0%;
          overflow: hidden;
          color: #666;
          border-bottom: 1px solid rgb(235, 236, 236);
          border-right: 1px solid rgb(235, 236, 236);
          padding: 0px 12px;
          .name{
            display: inline-block;
            max-width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
            overflow: hidden;
          }
          .group-id{
            margin-right: 8px;
          }
        }
      }
    }
  }

  .group-dialog{
    .el-dialog__header{
      border-bottom: 1px solid #ccc;
    }
    .el-dialog__body{
      padding: 28px;
      .el-form-item{
        margin-bottom: 0;
        .el-form-item__label{
          line-height: 30px;
        }
      }
    }
  }
</style>