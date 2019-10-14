<template> 
  <div class="groupInfo" v-loading="loading">
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
            <span class="centent">
              <span>分组&nbsp;</span>
              <router-link v-for="item in infoData.listTreeNode" :key="item.id" :to="{ path: '/iot/info/' + item.id}">
                <span class="path">/&nbsp;{{item.name}}</span>
              </router-link>
              <router-link :to="{ path: '/iot/info/' + infoData.id}">
                <span class="path">/&nbsp;{{infoData.name}}</span>
              </router-link>
            </span>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">分组ID：</label>
            <span class="centent appid" :title="infoData.appId">{{infoData.appId}}</span>
            <el-button type="text" size="small" @click.stop="copyGroupId">复制</el-button>
          </el-col>
          <el-col :span="8" class="info-row">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="info-row">
            <label class="label">设备总数：</label>
            <span class="centent">{{state.deviceCount}}</span>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">激活设备：</label>
            <span class="centent">{{state.activeCount}}</span>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">当前在线：</label>
            <span class="centent">{{state.onlineCount}}</span>
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
            :groupInfo = "infoData"
            :state="state"
            >
          </child-info>
          <child-tag>

          </child-tag>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备列表" name="equ-list">
        <div class="tabs-body">
          <equ-list
            :groupId="listParentId"
          >
          </equ-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="子分组列表" name="child-list">
        <div class="tabs-body" style="margin-left: 20px;margin-right: 20px;padding: 20px;overflow: hidden;background-color: #fff;">
          <child-list :parentId="listParentId"></child-list>
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>  
</template>

<script>
import { getGroupInfo,putGroupInfo } from "@/api/iot/group";
import { produnitList, deviceListNumber } from "@/api/iot/device";
import childInfo from "@/views/iot/group/childInfo";
import childTag from "@/views/iot/group/childtag";
import childList from "@/views/iot/group/childList";
import equList from "@/views/iot/group/equList";

export default {
  components: {
    childInfo,
    childTag,
    childList,
    equList
  },
  data() {
    return {
      listParentId: 0,
      selectOptions:[],
      state: {},
      activeName: 'group-list',
      infoData: {},
      loading: false
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
    this.getProdunitList()
    this.productChange()
  },
  methods: {
    getGroundPageInfo() {
      this.loading = true
      this.listParentId = this.$route.params.id
      getGroupInfo(this.$route.params.id).then( response => {
        this.infoData = Object.assign({}, this.infoData, response.data.data)
        this.loading = false
      })
    },
    getProdunitList() {
      let params = {};
      produnitList(params).then(response => {
        this.selectOptions.push(...response.data.data.records)
      })
    },
    productChange() {
      let params = {"treeId":this.listParentId}
      deviceListNumber(params).then(response => {
        this.state = response.data.data
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
    editorGroup(msgObj) {
      putGroupInfo(Object.assign(this.infoData,{"remark":msgObj.remark,"name":msgObj.name})).then(() => {
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
      line-height: 32px;
      white-space: nowrap;
      .label{
        color:#aaa;
      }
      .centent{
        color:#666;
        margin-right: 8px;
        .path{
          margin-right: 8px;
          color: #3e88d2;
        }
      }
      .appid{
        max-width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
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
  }
}
</style>