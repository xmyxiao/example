<template>
  <div style="margin-left: 20px;margin-right: 20px;padding: 20px;overflow: hidden;background-color: #fff;margin-top:16px;">
    <div class="group-list-info">
      <div class="title">标签信息</div>
      <div></div>
      <div class="edit">
        <el-button v-show="tagList.length > 0" type="primary" @click.stop="dialogShow = true" size="small">编辑</el-button>
      </div>
    </div>
    <div>
      <label class="tag-null">{{title}}：</label>
      <span class="tag-null" v-show="tagList.length < 1">无标签信息,<el-button type="text" @click.stop="dialogShow = true">立即添加</el-button></span>
      <span class="tag" v-show="tagList.length > 0">
        <span class="item" v-for="item in tagList" :key="item">{{item}}</span>
      </span>
    </div>
    <el-dialog class="group-dialog" title="添加标签" :visible.sync="dialogShow" width="600px">
      <el-form :model="tagForm">
        <el-form-item label="标签：">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="changeTagList">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'child-info',
  props: {
		
  },
  data() {
    return {
      title: '分组标签',
      tagForm: {},
      dialogShow: false,
      dialogData: {},
      tagValue: '',
      tagOptions: [],
      tagList: []
    }
  },
  watch: {
   
  },
  created() {

  },
  methods: {
    changeTagList() {
      this.tagList = this.tagValue
      this.dialogShow = false
    },
    closeDialog() {
      this.dialogShow = false
    },
    copyGroupId() {
      this.$emit("copyGroupId");
    }
  }
}
</script>

<style scoped lang="scss">
.tag-null{
  color: #666;
  font-size: 14px;
}
.tag{
  .item{
    display: inline-block;
    padding: 0 8px;
    background: #ebedef;
    color: #333;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>>
<style lang="scss">
  .group-dialog{
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
</style>