<template>
  <div class="device-index">
    <h2 class="title">设备管理</h2>
    <div class="header-container">
      <div class="header-left-container">
        <div class="select-container">
          <el-select v-model="selectValue" filterable placeholder="请选择" width="160">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="info-container">
          <div class="state">
            <div class="header">
              设备总数
            </div>
            <div class="footer">
              {{state.total}}
            </div>
          </div>
          <div class="state">
            <div class="header">
              <span class="notice-item on"></span>
              <span class="notice-title">激活设备</span>
            </div>
            <div class="footer">
              {{state.on}}
            </div>
          </div>
          <div class="state">
            <div class="header">
              <span class="notice-item online"></span>
              <span class="notice-title">当前在线</span>
            </div>
            <div class="footer">
              {{state.online}}
            </div>
          </div>
        </div>
      </div>
      <div class="header-right-container">
        <el-button>刷新</el-button>
      </div>
    </div>
    <div class="device-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="设备列表" name="device-list">
          <div class="tabs-body">
           <device-list></device-list>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import deviceList from "@/views/iot/device/deviceList";

export default {
  components: {
    deviceList
  },
  data() {
    return {
      selectOptions: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      selectValue: '',
      state:{
        total: 35,
        on: 25,
        online: 12
      },
      activeName: 'device-list'
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