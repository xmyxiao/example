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
      <!-- <template slot="menuLeft">
        <el-button type="default"
          icon="el-icon-plus"
          size="small"
          @click.stop="handleAdd()">批量添加</el-button>
      </template> -->
      <template slot="menuLeft">
        <el-button type="primary"
          icon="el-icon-delete"
          size="small"  
          :disabled="btnDistable"
          @click.stop="handleDel()">删除</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
          size="small"
          :disabled="btnDistable"
          @click.stop="handleSetState(0)">禁用</el-button>
      </template>
      <template slot="menuLeft">
        <el-button type="primary"
          size="small"
          :disabled="btnDistable"
          @click.stop="handleSetState(1)">启用</el-button>
      </template>
      <template slot="deviceState" slot-scope="scope" >
        <div class="list-row">
          <span class="notice-item" :class="noticeState(scope.row.deviceState)"></span>
          <span class="notice-text" v-text="stateText(scope.row.deviceState)"></span>
          <el-switch
            :value="scope.row.deviceEnableType"
            active-value = "ENABLE"
            active-color="#409eff"
            inactive-color="#dcdfe6"
            trigger = "false"
            @click.native="stateChange(scope.row)"
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
        <el-form-item label="产品：" prop="productId">
          <el-select v-model="selectValue" filterable placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.prodId"
              :label="item.prodName"
              :value="item.prodId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：" prop="deviceName">
          <el-input 
            v-model="addDialogInfo.deviceName" 
            placeholder="请输入设备名称"
            minlength="4"
            maxlength="50"
          ></el-input>
          <el-tooltip class="item" effect="light" content="支持中文、英文字母、数字和下划线，4-50个字符，中文算两个" placement="top-start">
            <i class="title-icon el-icon-question"></i>
          </el-tooltip>
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
  import { addObj, fetchDeviceList, delDevice, produnitList, delDeviceList, enableDeviceList, disenableDeviceList } from "@/api/iot/device";
  import { tableOption } from '@/const/crud/iot/device'

  export default {
    name: "device-list",
    props: [
      'productId',
      'productList'
    ],
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
        selectOptions: [],
        selectValue: '',
        tagOptions: [],
        tagValue: [],
        rules: {
          productId: [
            { required: true, message: '请选择产品', trigger: 'blur' }
          ],
          deviceName: [
            { required: true, message: '请输入设备名', trigger: 'blur' }
          ]
        },
        btnDistable: true,
        selDeviceId: []
      }
    },
    computed: {
      
    },
    watch: {
      productId() {
        this.getList(this.page)
      }
    },
    created() {
      this.getSelectOptions()
    },
    methods: {
      getSelectOptions() {
        let params = {};
        produnitList(params).then(response => {
          this.selectOptions = response.data.data.records
        })
      },
      getList(page, params) {
        this.listLoading = true
        
        if(params && this.tagValue.length > 0){
          params.tags = this.tagValue.join(',')
        }
        let plug = {}
        if(this.productId !== ''){
          plug.prodId = this.productId
        }
        fetchDeviceList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params, plug)).then(response => {
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
      resetSearch() {
        this.tagValue = []
      },
      handleAdd() {
        this.dialogAddShow = true
      },
      handleDel() {
        this.$confirm('确定删除这些设备?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = this.selDeviceId
          delDeviceList(param).then(() => {
            this.getList(this.page)
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
      },
      handleSetState(type,list) {
        if(type === 0){
          this.$confirm('确定禁用选中设备?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = ''
            if(list){
              param = [list.deviceId]
            }else{
              param = this.selDeviceId
            }
            disenableDeviceList(param).then(() => {
              this.getList(this.page)
              this.$notify({
                title: "成功",
                message: "禁用成功",
                type: "success",
                duration: 2000
              });
            }).cache(() => {
              this.$notify({
                title: "失败",
                message: "禁用失败",
                type: "error",
                duration: 2000
              });
            })
          }).catch(() => {
            
          })
        }else{
          this.$confirm('确定启用选中设备?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let param = ''
            if(list){
              param = [list.deviceId]
            }else{
              param = this.selDeviceId
            }
            enableDeviceList(param).then(() => {
              this.getList(this.page)
              this.$notify({
                title: "成功",
                message: "启用成功",
                type: "success",
                duration: 2000
              });
            }).cache(() => {
              this.$notify({
                title: "失败",
                message: "启用失败",
                type: "error",
                duration: 2000
              });
            })
          }).catch(() => {
            
          })
        }
      },
      dialogCloseCell() {

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
      isRadioActive(state) {
        let acState = ''
        switch(state) {
          case 'ONLINE':
            acState = true
            break;
          case 'OFFLINE':
            acState = false
            break;
          default:
            acState = false
        }
        return acState
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
      stateChange(row) {
        var state = row.deviceEnableType
        if(state === 'ENABLE'){
          this.handleSetState(0, row);
        }else{
          this.handleSetState(1, row);
        }
      },
      selectionChange(list) {
        let arr = []
        if(list.length > 0){
          this.btnDistable = false
          for(let item of list){
            arr.push(item.deviceId)
          }
        }
        this.selDeviceId = arr
      },
      addDevice() {
        this.form.prodId = this.selectValue
        this.form.deviceName = this.addDialogInfo.deviceName
        addObj(this.form).then(() => {
          this.getList(this.page)
          this.dialogAddShow = false
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
        }).catch(() => {
          this.$notify({
            title: "失败",
            message: "创建失败",
            type: "error",
            duration: 2000
          });
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
        this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delDevice(row.deviceId).then(() => {
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
        .el-input{
          width: 96%;
        }
      }
    }
  }
}
</style>
