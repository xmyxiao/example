<template>
  <div class="device-child-info">
    <div class="item-list-info">
      <div class="title">设备的Topic列表</div>
      <div></div>
      <div class="edit">
        
      </div>
    </div>
    <el-table
      :data="tableData"
      class="device-topic-list"
      style="width: 100%">
      <el-table-column
        prop="topicAddr"
        label="设备的Topic"
        >
      </el-table-column>
      <el-table-column
        prop="optionTypeName"
        label="设备具有的权限"
        width="150">
      </el-table-column>
      <el-table-column
        prop="msg"
        label="发布消息数"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.sourceType === 'CUSTOM'" @click="handleSetMsg(scope.row)" type="text" size="small">发布消息</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
import { getTopicList } from "@/api/iot/device";

export default {
  name: 'child-topic-list',
  props: {
		deviceInfo: {
      type: Object
    }
  },
  data() {
    return {
      deviceId: '',
      prodId: '',
      tableData: []
    }
  },
  watch: {
    deviceInfo(obj) {
      this.setTopicData(obj)
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    setTopicData(obj) {
      this.deviceId = obj.deviceInfo
      this.prodId = obj.product.prodId
    },
    getTableData() {
      let params = {
        deviceId: this.deviceId,
        prodId: this.prodId
      }
      getTopicList(params).then((res) =>{
        this.tableData = res.data.data
      })
    },
    handleSetMsg(data) {
      console.info(data)
    }
  }
}
</script>

<style lang="scss">
  .device-child-info .el-table th{
    background-color: #fbfbfc;
  }
</style>