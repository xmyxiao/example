<template>
  <div class="child-list">
    <h3>分组列表</h3>
    <avue-crud 
      :option="option" 
      :data="groupList" 
      :page="page"
      @on-load="getList"
      ref="crud" 
      v-model="form"
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
          @click.stop="handleAdd()">新建分组</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                    size="small"
                    @click.stop="openDetails(scope.row,scope.index)">查看</el-button>
        <el-button type="text"
                    size="small"
                    @click.stop="delItem(scope.row,scope.index)">删除</el-button>
      </template>  
      <template slot="parentIdForm" slot-scope="scope">
        <el-select v-model="parentGroupSelect.name" placeholder="请选择父组" ref="selectParentGroup">
          <el-option :value="parentGroupSelect.id" :label="parentGroupSelect.name" style="height:200px;overflow: auto;background-color:#fff">
            <el-tree
                :data="parentGroup"
                :props="parentGroupProps"
                @node-click="handleNodeClick"
            ></el-tree>
          </el-option>
        </el-select>
      </template>
      <template slot="remarkForm" slot-scope="scope" >
        <el-input 
          v-model="form.remark"
          type="textarea"
          placeholder="请输入分组描述"
          maxlength="100"
          show-word-limit="true"
        ></el-input>
      </template>
    </avue-crud>
    
  </div>
</template>

<script>
  import { addObj, fetchGroupList, getGroupTree, delGroup } from "@/api/iot/group";
  import { tableOption } from '@/const/crud/iot/group'

  export default {
    name: "table_group",
    props: ['parentId'],
    data() {
      return {
        parentGroup: [],
        parentGroupProps: {
          parent: 'parentId',
          value: 'id', 
          label: 'name',
          children: 'children',
        },
        parentGroupSelect: {
          id: '0',
          name: '分组'
        },
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
      parentId() {
        this.page.page = 1;
        this.getList(this.page);
      }
    },
    created() {
      
    },
    methods: {
      getList(page, params) {
        this.listLoading = true;
        var plug = {'parentId':this.parentId}
        fetchGroupList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params,plug)).then(response => {
          this.groupList = response.data.data.records;
          this.page.total = Number(response.data.data.total)
          this.listLoading = false;
        });
      },
      getDiaGroupTree() {
        getGroupTree().then(response => {
          this.parentGroup = response.data.data;
        })
      },
      handleFilter(param) {
        this.page.page = 1;
        this.getList(this.page, param);
      },
      handleRefreshChange() {
        this.getList(this.page)
      },
      handleAdd(){
        this.getDiaGroupTree()
        this.$refs.crud.rowAdd();
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
        this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
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
      },
      handleNodeClick(node) {
        this.parentGroupSelect.id = node.id
        this.parentGroupSelect.name = node.name
        this.$refs.selectParentGroup.blur()
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
