<template>
  <div class="group">
    <h2 class="title">分组管理</h2>
    <basic-container>
      <h3>分组列表</h3>
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
            @click.stop="handleAdd()">新建分组</el-button>
        </template>
        <!-- <template slot="search">
          <el-form-item label="分组标签">
            <el-input 
              placeholder="请选择分组标签" 
              size="small" 
              @focus="handSelectTag"
              v-model="searchForm.tag" />
          </el-form-item>
        </template> -->
        <template slot-scope="scope" slot="menu">
          <el-button type="text"
                     size="small"
                     @click.stop="openDetails(scope.row,scope.index)">查看</el-button>
          <el-button type="text"
                     size="small"
                     @click.stop="delItem(scope.row,scope.index)">删除</el-button>
        </template>  
        <template slot="parent_idForm" slot-scope="scope">
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
    </basic-container>
    <!-- <el-dialog title="标签筛选" :visible.sync="tagForm.show">
      <el-form>
        <div class="tag-title">分组标签：</div>
        <ul>
          <li v-for="(item,index) in tagForm.list" :key="index">
            <el-input v-model="item.key"  class="tag-input" placeholder="请输入标签key" ></el-input>
            <el-input v-model="item.value"  class="tag-input" placeholder="请输入标签value" ></el-input>
            <el-button type="text" @click-stop="delTag(index)">删除</el-button>
          </li>
        </ul>
        <el-button type="text" @click="addTag">新增标签</el-button>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tagForm.show = false">取 消</el-button>
        <el-button type="primary" @click="tagForm.show = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
  import { addObj, fetchGroupList, getGroupTree, delGroup } from "@/api/iot/group";
  import { tableOption } from '@/const/crud/iot/group'

  export default {
    name: "table_group",
    data() {
      return {
        /* tagForm: {
          show: false,
          list: [{
            key: '',
            value: ''
          }]
        }, */
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
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条,
          isAsc: false//是否倒序
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
        fetchGroupList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then(response => {
          this.groupList = response.data.data.data.records;
          this.page.total = response.data.data.data.total
          this.listLoading = false;
        });
      },
      getDiaGroupTree() {
        getGroupTree().then(response => {
          this.parentGroup = response.data.data;
          console.log(response,this.parentGroup)
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
        this.form.parent_id = this.parentGroupSelect.id
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
        this.getList()
        this.$message.success('行数' + val)
      },
      currentChange(val) {
        this.page.currentPage = val
        this.getList()
        this.$message.success('页码' + val)
      },
      openDetails(row) {
        this.$router.push({ path: "/iot/info/"+row.app_id });
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
      },
      handleNodeClick(node) {
        this.parentGroupSelect.id = node.id
        this.parentGroupSelect.name = node.name
        this.$refs.selectParentGroup.blur()
      }
      /* handSelectTag() {
        this.tagForm.show = true
      },
      addTag() {
        let item = {
          key: '',
          value: ''
        }
        this.tagForm.list.push(item);
      },
      delTag() {
        
      } */
    }
  };
</script>
<style lang="scss">
.group{
  .title{
    box-sizing: inherit;
    background: #fff;
    padding: 20px 40px;
    font-size: 20px;
    font-weight: 700;
    color: #373d41;
    height: 68px;
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
</style>

