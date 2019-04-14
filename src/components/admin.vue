<!--
author:sly
此页面为管理页面home
-->
<template>

  <v-CategoryManagement/>
</template>

<script>
  //商品管理的home
  import CategoryManagement from './CategoryManagement/Home'
    export default {
        name: "admin",
      data(){
          return{

          }
      },
      components:{
        'v-CategoryManagement':CategoryManagement
      }
    }
</script>

<style scoped>

</style>
