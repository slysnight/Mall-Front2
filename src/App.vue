
<template>
  <div id="app">
  <v-home></v-home>
<!--  <router-view></router-view>-->
  </div>
</template>
<script>
  //主页 home
  import home from './components/home.vue'

  export default {
    name:"app",
    data(){
      return{
      }
    },
    components:{
      "v-home":home,
    }
  }
</script>

<style lang="scss" scoped>

</style>
