<template>
  <div class="device-child-info running-state">
    <div class="item-list-info">
      <div class="title">运行状态</div>
      <div></div>
      <div class="edit">
        <span class="refresh-title">实时刷新</span>
        <el-switch
          style="margin:0 8px;"
          size="small"
          v-model="refresh"
          active-color="#409eff"
          inactive-color="#dcdfe6">
        </el-switch>
        <el-radio-group v-model="showType" size="small">
          <el-radio-button label="图表"></el-radio-button>
          <el-radio-button label="表格"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    
    <div class="table-container" v-show="showType === '图表'">
      <el-row>
        <el-col :span="6" v-for="(item, index) in tableData" :key="index">
          <div class="chart-view-item">
            <div class="chart-view-name">
              {{item.funName}}
              <el-button type="text">查看数据</el-button>
            </div>
            <div class="chart-view-content">
              <span class="text">
                {{item.lastVal}}{{item.unitCnName}}
              </span>
            </div>
            <div class="chart-view-time">
              {{item.lastTime}}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="list-container" v-show="showType === '表格'">
      <el-table
        :data="tableData"
        class="device-topic-list"
        style="width: 100%">
        <el-table-column
          prop="funName"
          label="属性名称"
          width="250"
          >
        </el-table-column>
        <el-table-column
          prop="lastTime"
          label="更新时间"
          >
        </el-table-column>
        <el-table-column
          prop="lastVal"
          label="最新值"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleShowData(scope.row)" type="text" size="small">查看消息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
  </div>
</template>

<script>
import { getRunningData } from "@/api/iot/device";

export default {
  name: 'running-state',
  props: {
		deviceInfo: {
      type: Object
    }
  },
  data() {
    return {
      deviceId: '',
      prodId: '',
      refresh: false,
      showType: '图表',
      tableData: []
    }
  },
  watch: {
    deviceInfo(obj) {
      this.setRunData(obj)
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    setRunData(obj) {
      this.deviceId = obj.deviceInfo
      this.prodId = obj.product.prodId
    },
    getTableData() {
      let params = {
        deviceId: this.deviceId,
        prodId: this.prodId
      }
      getRunningData(params).then((res) =>{
        this.tableData = res.data.data
      })
    },
    handleShowData(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.running-state{
  .refresh-title{
    font-size: 14px;
    color: #666;
  }
  .chart-view-item{
    border: 1px solid #d7d8d9;
    border-right: 0;
    padding: 20px;
    .chart-view-name{
      font-size: 14px;
      color: #333;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chart-view-content{
      font-size: 28px;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 12px 0;
      .text{
        font-size: 28px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 85%;
      }
    }
    .chart-view-time{
      color: #999;
      font-size: 14px;
    }
  }
  .chart-view-item:last-child{
    border-right: 1px solid #d7d8d9;
  }
}
</style>