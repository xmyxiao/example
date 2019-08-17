<template>
  <div class="group">
    <h2 class="title">分组管理</h2>
    <basic-container>
     <child-list></child-list>
    </basic-container>
  </div>
</template>

<script>
  import childList from "@/views/iot/group/childList";
  export default {
    components: {
      childList
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
}
</style>

