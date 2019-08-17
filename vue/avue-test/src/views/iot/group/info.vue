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
          <child-info 
            ref="childInfo"
            @copyGroupId="copyGroupId"
            @editorGroup="editorGroup"
            :groupInfo = "infoData">
          </child-info>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备列表" name="equ-list">
        <div class="tabs-body">
          <!-- <equ-list>

          </equ-list> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="子分组列表" name="child-list">
        <div class="tabs-body">
          <child-list></child-list>
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>  
</template>

<script>
import { getGroupInfo,putGroupInfo } from "@/api/iot/group";
import childInfo from "@/views/iot/group/childInfo";
import childList from "@/views/iot/group/childList";
/* import equList from "@/views/iot/group/equList"; */

export default {
  components: {
    childInfo,
    childList
  },
  data() {
    return {
      activeName: 'group-list',
      infoData: {}
    };
  },
  computed: {
    
  },
  watch: {
    $route(){
      this.getGroundPageInfo()
    }
  },
  created() {
    this.getGroundPageInfo()
  },
  methods: {
    getGroundPageInfo() {
      getGroupInfo(this.$route.params.id).then( response => {
        this.infoData = Object.assign({}, this.infoData, response.data.data)
      })
    },
    copyGroupId() {
      let self = this;
      this.$copyText(this.infoData.appId).then(function() {
        self.$message({
          message: '复制成功',
          type: 'success'
        });
      }, function() {
        self.$message.error('复制失败');
      })
    },
    editorGroup(msg) {
      putGroupInfo(Object.assign(this.infoData,{"remark":msg})).then(() => {
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success",
          duration: 2000
        });
        this.$refs.childInfo.closeDialog()
      }).catch(() => {
        this.$notify({
          title: "失败",
          message: "修改失败",
          type: "error",
          duration: 2000
        });
      });
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
}
</style>