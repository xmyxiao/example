<template> 
  <div class="device-info" v-loading="loading">
    <div class="heard">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/iot/device">设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="info-title">
        <h3 class="title">{{infoData.deviceName}}</h3>
        <span class="state" :class="noticeState()" v-text="stateText()"></span>
      </div>
      <div class="info-des">
        <el-row>
          <el-col :span="8" class="info-row">
            <label class="label">产品：</label>
            <span class="centent">{{infoData.product.prodName}}</span>
            <router-link :to="{ path: '/iot/device/info/' + infoData.product.prodId}">
              <el-button type="text" size="small">查看</el-button>
            </router-link>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">ProductKey：</label>
            <span class="centent">{{infoData.product.prodKey}}</span>
            <el-button type="text" size="small" @click.stop="copyText(infoData.product.prodKey)">复制</el-button>
          </el-col>
          <el-col :span="8" class="info-row">
            <label class="label">DeviceSecret：</label>
            <span v-show="!showDeviceSecret" class="centent">********</span>
            <span v-show="showDeviceSecret" class="centent secret">{{infoData.deviceSecret}}</span>
            <el-button v-show="!showDeviceSecret" type="text" size="small" @click.stop="showDeviceSecret = true">显示</el-button>
            <el-button v-show="showDeviceSecret" type="text" size="small" @click.stop="copyText(infoData.deviceSecret)">复制</el-button>
            <el-button v-show="showDeviceSecret" type="text" size="small" @click.stop="showDeviceSecret = false">隐藏</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="info-tabs">
    <el-tabs v-model="activeName">
      <el-tab-pane label="设备信息" name="device-info">
        <div class="tabs-body">
          <child-info 
            ref="childInfo"
            @editorDevice="editorDevice"
            :deviceInfo = "infoData">
          </child-info>
          <child-info-plugs 
            ref="childInfoPlug"
            :deviceInfo = "infoData">
          </child-info-plugs >
          
        </div>
      </el-tab-pane>
      <el-tab-pane label="Topic列表" name="topic-list">
        <div class="tabs-body">
          <topic-list
          ref="topicList"
          :deviceInfo = "infoData"
          ></topic-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运行状态" name="device-state">
        <div class="tabs-body">
          <running-state></running-state>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备影子" name="device-json">
        <div class="tabs-body">
          <device-json></device-json>
        </div>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>  
</template>

<script>
import { getDeviceInfo, putDeviceInfo, putGroupInfo } from "@/api/iot/device";
import childInfo from "@/views/iot/device/childInfo";
import childInfoPlugs from "@/views/iot/device/childInfoPlugs";
import topicList from "@/views/iot/device/topicList";
import runningState from "@/views/iot/device/runningState";
import deviceJson from "@/views/iot/device/deviceJson";

export default {
  components: {
    childInfo,
    childInfoPlugs,
    topicList,
    runningState,
    deviceJson
  },
  data() {
    return {
      activeName: 'device-info',
      infoData: {
        product: {}
      },
      loading: false,
      showDeviceSecret: false
    };
  },
  computed: {
    
  },
  watch: {
    $route(){
      this.getDevicePageInfo()
    }
  },
  created() {
    this.getDevicePageInfo()
  },
  methods: {
    getDevicePageInfo() {
      this.loading = true
      getDeviceInfo(this.$route.params.id).then( response => {
        this.infoData = Object.assign({}, this.infoData, response.data.data)
        this.loading = false
      })
    },
    stateText() {
      let stateText = '', state = this.infoData.deviceState
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
      return stateText
    },
    noticeState() {
      let className = '', state = this.infoData.deviceState
      switch(state) {
        case 'ONLINE':
          className = 'online'
          break;
        case 'OFFLINE':
          className = 'outline'
          break;
        default:
          className = 'undeloda'
      }
      return className
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
    editorDevice(msgObj) {
      putDeviceInfo(Object.assign(this.infoData,{"deviceName":msgObj.deviceName})).then(() => {
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
.device-info{
  .heard{
    padding: 20px 40px 0;
    background-color: #fff;
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
    .state{
      display: inline-block;
      padding: 0 8px;
      text-align: center;
      border-radius: 5px;
      height: 24px;
      line-height: 24px;
      color: #fff;
      font-size: 14px;
    }
    .on{
      background: rgb(77, 189, 218);
    }
    .online{
      background: rgb(99, 194, 112);
    }
    .outline{
      background: #e55130;
    }
    .undeloda{
      background: #d3d5d5;
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
        color:#666;
        margin-right: 8px;
      }
      .secret{
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
    .tabs-body{
      margin-left: 20px;
      margin-right: 20px;
      overflow: hidden;
    }
  }
}
</style>