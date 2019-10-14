<template>
  <div class="child-list group-equ-list">
    <h3>设备列表</h3>
    <avue-crud 
      :option="option" 
      :data="groupList" 
      :page="page"
      ref="crud" 
      v-model="form"
      @on-load="getList"
      :table-loading="listLoading"
      @search-change="handleFilter"
      @refresh-change="handleRefreshChange"
      @search-reset="resetSearch"
      @row-save="create"
      @size-change="sizeChange"
      @current-change="currentChange">
      <template slot="menuLeft">
        <el-button type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="handleAdd()">添加设备到分组</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
          icon="el-icon-delete"
          size="small"
          @click.stop="handleDel()">从分组中删除</el-button>
      </template>
      <template slot="search">
        <el-form-item label="产品">
          <el-select v-model="productValue" filterable placeholder="请选择" width="160" size="small" @change="productChange">
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
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                    size="small"
                    @click.stop="openDetails(scope.row,scope.index)">查看</el-button>
        <el-button type="text"
                    size="small"
                    @click.stop="delItem(scope.row,scope.index)">从分组中删除</el-button>
      </template>  
    </avue-crud>
    <el-drawer
      title="添加设备到分组"
      :visible.sync="drawerShow"
      :size="drawerWidth"
      :custom-class="drawerClass"
      :direction="direction">
      <device-dialog></device-dialog>
    </el-drawer>
  </div>
</template>

<script>
  import { addObj, fetchDeviceList } from "@/api/iot/device";
  import { tableOption } from '@/const/crud/iot/device'
  import { produnitList } from "@/api/iot/device";
  import ElDrawer from "@/views/iot/group/drawer"
  import deviceDialog from "@/views/iot/group/deviceDialog"

  export default {
    name: "equ-list",
    props: ['groupId'],
    components: {
      ElDrawer,
      deviceDialog
    },
    data() {
      return {
        searchForm: {},
        page: {
          total: 0,
          currentPage: 1, 
          pageSize: 20, 
          isAsc: false
        },
        groupList:[],
        option:tableOption,
        listLoading: true,
        form: {},
        productOptions: [{"prodName": "全部产品","prodId": ''}],
        productValue: '',
        direction: 'rtl',
        drawerWidth: '750px',
        drawerClass: 'group-equ-dialog',
        drawerShow: false
      }
    },
    computed: {
      
    },
    watch: {
      groupId() {
        this.page.page = 1;
        this.getList(this.page);
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
      resetSearch() {
        this.productValue = ''
      },
      getList(page, params) {
        this.listLoading = true;
        let plug = {'treeId':this.groupId,"prodId":this.productValue}
        fetchDeviceList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params,plug)).then(response => {
          this.groupList = response.data.data.records;
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
      handleAdd() {
        this.drawerShow = true
      },
      handleDel() {

      },
      create(row, done, loading) {
        this.form.parentId = this.parentGroupSelect.id
        addObj(this.form).then(() => {
          this.getList(this.page);
          done();
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
        }).catch(() => {
          loading();
        });
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
      openDetails(row) {
        this.$router.push({ path: "/iot/device/info/"+row.deviceId });
      },
      delItem(row, index) {
        console.log(row, index)
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
      }
    }
  };
</script>

<style lang="scss">
.group-equ-list{
  margin-left: 20px;
  margin-right: 20px;
  padding: 20px;
  overflow: hidden;
  background-color: #fff;
}
.child-list{
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
  
  .el-dialog__header{
    border-bottom: 1px solid #ccc;
  }
  .tag-title{
    margin-bottom: 8px;
  }
  .tag-input{
    width: 180px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
.group-equ-dialog{
  .el-drawer__header{
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 0;
  }
}
</style>
