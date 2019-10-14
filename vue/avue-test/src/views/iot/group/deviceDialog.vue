<template>
  <div class="group-device-dialog">
    <div class="group-device-body">
      <avue-crud 
        :option="option" 
        :data="tableList" 
        :page="page"
        ref="crud" 
        v-model="form"
        @on-load="getList"
        :table-loading="listLoading"
        :searchBtn=false
        @search-change="handleFilter"
        @refresh-change="handleRefreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @search-reset="resetSearch"
        @selection-change="selectionChange">
        <template slot="search">
          <el-form-item>
            <el-select v-model="productValue" filterable placeholder="请选择" size="small" width="160px" @change="productChange">
              <el-option
                v-for="item in productOptions"
                :key="item.prodId"
                :label="item.prodName"
                :value="item.prodId">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
        <template slot="deviceState" slot-scope="scope" >
          <div class="list-row">
            <span class="notice-item" :class="noticeState(scope.row.deviceState)"></span>
            <span class="notice-text" v-text="stateText(scope.row.deviceState)"></span>
          </div>
        </template>
      </avue-crud>
    </div>
    <div class="group-device-footer">
      <el-button size="small">取 消</el-button>
      <el-button type="primary" size="small">确 定</el-button>
    </div>
  </div>
</template>

<script>
import {  fetchDeviceList, produnitList } from "@/api/iot/device";
import { tableOption } from '@/const/crud/iot/equdialog'

export default {
  data() {
    return {
      page: {
        total: 0,
        currentPage: 1, 
        pageSize: 20, 
        isAsc: false
      },
      tableList:[],
      option:tableOption,
      listLoading: true,
      form: {},
      productOptions: [{"prodName": "全部产品","prodId": ''}],
      productValue: '',
      selDeviceId: []
    }
  },
  created() {
    this.getProdunitList()
  },
  methods: {
    getProdunitList() {
      let params = {};
      produnitList(params).then(response => {
        this.productOptions.push(...response.data.data.records)
      })
    },
    productChange() {
      this.page.page = 1
      this.getList(this.page)
    },
    getList(page, params) {
      this.listLoading = true
       let plug = {"prodId":this.productValue}
      fetchDeviceList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      }, params,plug)).then(response => {
        this.tableList = response.data.data.records
        this.page.total = Number(response.data.data.total)
        this.listLoading = false;
      });
    },
    handleFilter(param) {
      this.page.page = 1;
      this.getList(this.page, param);
    },
    handleRefreshChange() {
      this.getList(this.page)
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.page.pageSize = val
      this.getList(this.page)
    },
    currentChange(val) {
      this.page.currentPage = val
      this.getList(this.page)
    },
    resetSearch() {
      this.productValue = ''
    },
    selectionChange() {

    },
    noticeState(state) {
      let className = ''
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
    stateText(state) {
      let stateText = ''
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
    }
  }
}
</script>>

<style lang="scss" scoped>
.group-device-dialog{
  padding: 0;
  position: relative;
  .group-device-body{
    padding: 5px 20px;
    height: calc(100vh - 125px);
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 65px;
  }
  .group-device-footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ecedee;
    padding: 16px;
    box-sizing: border-box;
    text-align: right;
    background-color: #fff;
  }
  .list-row{
    .notice-item{
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
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
    .notice-text{
      margin-left: 6px;
      margin-right: 8px;
    }
  }
}
</style>

<style lang="scss">
.group-device-dialog{
  .avue-crud__menu{
    display:none;
  }
}
</style>


