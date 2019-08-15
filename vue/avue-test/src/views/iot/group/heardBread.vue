<template>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for="bread in breadcrumbList" :to="bread.path" v-bind:key="bread.path">
    {{bread.name}}
  </el-breadcrumb-item>
  <el-breadcrumb-item>{{selectName}}</el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
  export default {
    props: {
      selectName: {
        type: String,
        default: '',
        require: true 
      },
      breadcrumbList: {
        type: Array,
        default: [],
        require: true 
      }
    }
  }
</script>