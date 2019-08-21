<template>
  <div class="device-child-info">
    <div class="item-list-info">
      <div class="title">设备扩展信息</div>
      <div></div>
      <div class="edit">
        
      </div>
    </div>
    
    <table class="item-table">
      <tr>
        <th>SDK语言</th>
        <td>
          <span></span>
        </td>
        <th>版本号</th>
        <td>
          <span></span>
        </td>
        <th>模组商</th>
        <td>
          <span></span>
        </td>
      </tr>
      <tr>
        <th>模组信息</th>
        <td colspan="5">
          <span></span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'child-info-plugs',
  props: {
		groupInfo: {
      type: Object
    }
  },
  data() {
    return {
      dialogShow: false,
      dialogData: {}
    }
  },
  watch: {
    groupInfo(obj) {
      this.setDialogData(obj)
    }
  },
  created() {

  },
  methods: {
    setDialogData(obj) {
      this.dialogData = JSON.parse(JSON.stringify(obj))
    },
    changeInfo() {
      this.$emit("editorGroup",this.dialogData);
    },
    dialogCloseCell() {
      let obj = this.groupInfo
      this.setDialogData(obj)
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

<style lang="scss" scoped>
.device-child-info{
  margin: 16px 0;
}
</style>