<template> 
  <div class="groupInfo">
    <div class="heard">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/iot/group">分組管理</el-breadcrumb-item>
        <el-breadcrumb-item>分组详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="info-title">
        <h3 class="title">{{infoData.name}}</h3>
      </div>
      <div class="info-des">
        <el-row>
          <el-col :span="8" class="info-row">
            <label class="label">分组层级：</label>
            <span class="centent"></span>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">分组ID：</label>
            <span class="centent">{{infoData.appId}}</span>
            <el-button type="text" size="small" @click.stop="copyGroupId">复制</el-button>
          </el-col>
          <el-col :span="8" class="info-row">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="info-row">
            <label class="label">设备总数：</label>
            <span class="centent"></span>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">激活设备：</label>
            <span class="centent"></span>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">当前在线：</label>
            <span class="centent"></span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="info-tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane label="分组信息" name="group-list">
        <div class="tabs-body">
          <div class="group-list-info">
            <div class="title">分组信息</div>
            <div></div>
            <div class="edit">
              <el-button type="primary" @click.stop="editorGroup">编辑</el-button>
            </div>
          </div>
          <div class="group-list-table">
            <div class="table-row"></div>
            <div class="table-row"></div>
            <div class="table-row"></div>
            <div class="table-row"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备列表" name="equ-list">
        <div class="tabs-body">
          设备列表
        </div>
      </el-tab-pane>
      <el-tab-pane label="子分组列表" name="child-list">
        <div class="tabs-body">
          子分组列表
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>  
</template>

<script>
import { getGroupInfo } from "@/api/iot/group";

export default {
  data() {
    return {
      activeName: 'group-list',
      infoData: {}
    };
  },
  computed: {
    
  },
  watch: {
    
  },
  created() {
    this.getGroundPageInfo()
  },
  methods: {
    getGroundPageInfo() {
      getGroupInfo(this.$route.params.id).then( res => {
        this.infoData = res.data.data
      })
    },
    copyGroupId() {
      
    },
    editorGroup() {

    }
  }
}
</script>

<style lang="scss">
.groupInfo{
  .heard{
    padding: 20px 40px 0;
    background-color: #fff;
    height: 172px;
  }
  .info-title{
    margin-top: 20px;
    margin-bottom: 16px;
    line-height: 29px;
    overflow: hidden;
    height: 29px;
    .title{
      float: left;
      font-size: 20px;
      margin: 0 8px 0 0;
      line-height: 28px;
    }
  }
  .info-des{
    font-size: 14px;
    .info-row{
      overflow: hidden;
      display: block;
      text-overflow: ellipsis;
      line-height: 20px;
      white-space: nowrap;
      .label{
        color:#aaa;
      }
      .centent{
        color:#999;
        margin-right: 8px;
      }
    }
  }

  .info-tabs{
    position: relative;
    box-sizing: border-box;
    .el-tabs__header{
      background-color: #fff;
      position: relative;
      top: -10px;
      .el-tabs__nav-wrap{
        margin-left: 50px;
        .el-tabs__item{
          font-size: 16px;
        }
      }
    }
    .tabs-body{
      margin-left: 20px;
      margin-right: 20px;
      padding: 20px;
      overflow: hidden;
      background-color: #fff;
    }
  }

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
    }
  }
}
</style>