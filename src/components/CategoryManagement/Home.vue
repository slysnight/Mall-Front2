<template>
    <div>
      <router-link to="/UserView" class="badge badge-primary">用户视图</router-link>
      <router-link to="AdminView"  class="badge badge-danger">管理员视图</router-link>
      <hr>
      <!--<ReqData :ref2="ref" :run="run" :Home="this" />-->

      <hr>

    </div>
</template>

<script>

    export default {
      name:"Home",
      data(){
        return{
          flag:false,
          ref:{
          }
        }
      },methods:{

        },mounted(){
        console.log("一个生命周期函数");
      }
    }
</script>

<style scoped>

</style>
