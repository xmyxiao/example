<template>
  <div class="device-index">
    <h2 class="title">设备管理</h2>
    <div class="header-container">
      <div class="header-left-container">
        <div class="select-container">
          <el-select v-model="selectValue" filterable placeholder="请选择" width="160" @change="productChange">
            <el-option
              v-for="item in selectOptions"
              :key="item.prodId"
              :label="item.prodName"
              :value="item.prodId">
            </el-option>
          </el-select>
        </div>
        <div class="info-container">
          <div class="state">
            <div class="header">
              设备总数
              <el-tooltip class="item" effect="light" content="当前指定产品的设备总数" placement="top-start">
                <i class="title-icon el-icon-question"></i>
              </el-tooltip>
            </div>
            <div class="footer">
              {{state.deviceCount}}
            </div>
          </div>
          <div class="state">
            <div class="header">
              <span class="notice-item on"></span>
              <span class="notice-title">激活设备</span>
              <el-tooltip class="item" effect="light" content="当前已激活的设备总数" placement="top-start">
                <i class="title-icon el-icon-question"></i>
              </el-tooltip>
            </div>
            <div class="footer">
              {{state.activeCount}}
            </div>
          </div>
          <div class="state">
            <div class="header">
              <span class="notice-item online"></span>
              <span class="notice-title">当前在线</span>
              <el-tooltip class="item" effect="light" content="当前在线的设备总数" placement="top-start">
                <i class="title-icon el-icon-question"></i>
              </el-tooltip>
            </div>
            <div class="footer">
              {{state.onlineCount}}
            </div>
          </div>
        </div>
      </div>
      <div class="header-right-container">
        <el-button @click.stop="refresh" size="small">刷新</el-button>
      </div>
    </div>
    <div class="device-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备列表" name="device-list">
          <div class="tabs-body">
           <device-list
            :productId = "selectValue"
           >
           </device-list>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import deviceList from "@/views/iot/device/deviceList";
import { produnitList, deviceListNumber } from "@/api/iot/device";

export default {
  components: {
    deviceList
  },
  data() {
    return {
      selectOptions: [{"prodName": "全部产品","prodId": ''}],
      selectValue: '',
      state:{
        deviceCount: 0,
        activeCount: 0,
        onlineCount: 0
      },
      activeName: 'device-list'
    }
  },
  created () {
    this.getProdunitList()
    this.productChange()
  },
  methods: {
    getProdunitList() {
      let params = {};
      produnitList(params).then(response => {
        this.selectOptions.push(...response.data.data.records)
      })
    },
    productChange() {
      let params = {
        "prodId": this.selectValue
      }
      deviceListNumber(params).then(response => {
        this.state = response.data.data
      })
    },
    refresh() {
      let params = {
        "prodId": this.selectValue
      }
      deviceListNumber(params).then(response => {
        this.state = response.data.data
        this.$message({
          message: '刷新成功',
          type: 'success'
        });
      })
    }
  }
}
</script>

<style lang="scss">
.device-index{
  .title{
    box-sizing: inherit;
    background: #fff;
    padding: 20px 40px;
    font-size: 20px;
    font-weight: 700;
    color: #373d41;
    height: 68px;
  }
  .header-container{
    display: flex;
    justify-content: space-between;
    padding: 0 40px 20px;
    background: #fff;
    height: 72px;
    .header-left-container{
      flex: 1;
      display: flex;
      align-items: center;
      .select-container{
        width: 160px;
      }
      .info-container{
        display: flex;
        justify-content: space-between;
        margin-left: 80px;
        .state{
          border-left: 1px solid #ebecec;
          padding: 0 100px 0 32px;
          .header{
            font-size: 14px;
            color: #73777a;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .notice-item{
              display: inline-block;
              width: 6px;
              height: 6px;
              border-radius: 6px;
            }
            .notice-title{
              margin-left: 6px;
            }
            .on{
              background: rgb(77, 189, 218);
            }
            .online{
              background: rgb(99, 194, 112);
            }
          }
          .footer{
            font-size: 20px;
            color: #373d41;
            margin-top: 8px;
          }
        }
      }
    }
    .header-right-container{
      display: flex;
      align-items: center;
    }
  }
  .title-icon{
    margin-left: 4px;
  }
}
.device-tabs{
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
</style>