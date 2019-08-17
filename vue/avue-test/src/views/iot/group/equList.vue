<template>
  <div class="child-list">
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
          <el-input 
            placeholder="请选择分组标签" 
            size="small" 
            v-model="searchForm.tag" />
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
  </div>
</template>

<script>
  import { addObj, fetchEquipmentList, delGroup } from "@/api/iot/equipment";
  import { tableOption } from '@/const/crud/iot/equ'

  export default {
    name: "equ-list",
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
        form: {}
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
        this.listLoading = true;
        fetchEquipmentList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          console.info(response)
          this.groupList = response.data.data.records;
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
      handleAdd() {
        
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
        this.$router.push({ path: "/iot/info/"+row.id });
      },
      delItem(row, index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delGroup(row.id).then(() => {
            this.groupList.splice(index, 1);
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
</style>
