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
        prop="date"
        label="设备的Topic"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备具有的权限"
        width="150">
      </el-table-column>
      <el-table-column
        prop="address"
        label="发布消息数"
        width="150">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleSetMsg(scope.row)" type="text" size="small">发布消息</el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: 'child-topic-list',
  data() {
    return {
      tableData: [{
        date: '/sys/a1xnfZQ8Vzg/bg-kt/thing/event/property/post',
        name: '发布',
        address: '0'
      }, {
        date: '/sys/a1xnfZQ8Vzg/bg-kt/thing/event/property/post',
        name: '发布',
        address: '0'
      }]
    }
  },
  watch: {
   
  },
  created() {

  },
  methods: {
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