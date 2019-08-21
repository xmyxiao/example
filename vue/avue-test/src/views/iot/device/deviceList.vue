<template>
  <div class="device-device-list">
    <h3>设备列表</h3>
    <avue-crud 
      :option="option" 
      :data="tableList" 
      :page="page"
      ref="crud" 
      v-model="form"
      @on-load="getList"
      :table-loading="listLoading"
      @search-change="handleFilter"
      @refresh-change="handleRefreshChange"
      @row-save="create"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-reset="resetSearch"
      @selection-change="selectionChange">
      <template slot="menuLeft">
        <el-button type="primary"
          icon="el-icon-plus"
          size="small"
          @click.stop="handleAdd()">添加设备</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="default"
          icon="el-icon-plus"
          size="small"
          @click.stop="handleAdd()">批量添加</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
          icon="el-icon-delete"
          size="small"  
          @click.stop="handleDel()">删除</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
          size="small"
          @click.stop="handleSetState(0)">禁用</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
          size="small"
          @click.stop="handleSetState(1)">启用</el-button>
      </template>
      <template slot="state" slot-scope="scope" >
        <div class="list-row">
          <span class="notice-item" :class="noticeState(scope.row.state)"></span>
          <span class="notice-text">{{scope.row.state}}</span>
          <el-switch
            value="scope.row.state"
            active-value="1"
            inactive-value="0"
            active-color="#dcdfe6"
            inactive-color="#409eff"
            @click.native="stateChange(scope.row.state)"
            >
          </el-switch>
        </div>
      </template>
      <template slot="search">
        <el-form-item label="设备标签">
          <el-select
            v-model="tagValue"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择标签">
            <el-option
              v-for="item in tagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                    size="small"
                    @click.stop="openDetails(scope.row,scope.index)">查看</el-button>
        <el-button type="text"
                    size="small"
                    @click.stop="delItem(scope.row,scope.index)">删除</el-button>
      </template>  
    </avue-crud>
    <el-dialog class="add-dialog" title="添加设备" :visible.sync="dialogAddShow" width="600px" @close="dialogCloseCell">
      <el-form :model="addDialogInfo" :rules="rules">
        <el-form-item label="产品：" prop="deviceName">
          <el-select v-model="selectValue" filterable placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：">
          <el-input v-model="addDialogInfo.deviceName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddShow = false">取 消</el-button>
        <el-button type="primary" @click="addDevice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addObj, fetchEquipmentList, delGroup } from "@/api/iot/equipment";
  import { tableOption } from '@/const/crud/iot/device'

  export default {
    name: "device-list",
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
        noSelectRow: true,
        dialogAddShow: false,
        addDialogInfo: {},
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
        tagOptions: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        tagValue: [],
        rules: {
          deviceName: [
            { required: true, message: '请选择产品', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      
    },
    watch: {
      
    },
    created() {
    },
    methods: {
      getList(page, params) {
        this.listLoading = true
        if(params){
          params.tags = this.tagValue
        }
        fetchEquipmentList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.tableList = response.data.data.records
          this.page.total = response.data.data.total
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
      resetSearch() {
        this.tagValue = []
      },
      handleAdd() {
        this.dialogAddShow = true
      },
      handleDel() {

      },
      handleSetState(type) {
        console.log(type);
      },
      dialogCloseCell() {

      },
      addDevice() {

      },
      noticeState(state) {
        let className = ''
        switch(state) {
          case 0:
            className = 'online'
            break;
          case 1:
            className = 'outline'
            break;
          default:
            className = 'undeloda'
        }
        return className
      },
      stateChange(state) {
        console.log(state);
      },
      selectionChange(list) {
        console.log(list.length)
      },
      create(row, done, loading) {
        this.form.prodId = this.selectValue
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
        this.$router.push({ path: "/iot/device/info/"+row.id });
      },
      delItem(row, index) {
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delGroup(row.id).then(() => {
            this.tableList.splice(index, 1);
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          }).cache(() => {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
              duration: 2000
            });
          })
        }).catch(() => {
          
        })
      }
    }
  };
</script>

<style lang="scss">
.device-device-list{
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

  .child-list{
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
  .add-dialog{
    .el-dialog__header{
      border-bottom: 1px solid #ccc;
    }
    .el-dialog__body{
      padding: 28px;
      .el-form-item{
        .el-form-item__label{
          line-height: 30px;
        }
      }
    }
  }
}
</style>
