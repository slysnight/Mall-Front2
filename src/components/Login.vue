<!--
    author:maoxin
-->
<template>
  <div id="login">
    <div class="card">
      <div class="card-header">
        <h5>后台管理员登录</h5>
      </div>
      <div class="card-body">
        <!--alert栏，用于检测用户输入-->
        <div v-bind:class="alertStyle" role="alert" >
            {{message}}
        </div>
        <form>
          <div class="form-group">
            <label for>用户名</label>
            <input type="text" v-model="username" class="form-control" placeholder="UserName">
          </div>
          <div class="form-group">
            <label for>密码</label>
            <input type="password" v-model="password" placeholder="Password" class="form-control">
          </div>
          <input type="button" @click="login" value="登录" class="btn btn-primary">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      alertStyle:{
          alert:true,
          hide:true
      },
      alertDisplay:false,
      username: "",
      password: "",
      message:""
    };
  },
  methods: {
    login: function() {
      var apiUrl =
        "http://api.juheapi.com/japi/toh?key=550bafcd0b1a9d8becea72bcb8bdd900&v=1.0&month=11&day=1";
      this.$http.jsonp(apiUrl).then(
        function(response) {
          console.log(response);
        },
        function(err) {
          this.showInfo("登录失败呵呵呵",'warning');
        }
      );
    },
    showInfo:function(message,type){
        type = type||'info';
        //用于控制显示数据信息
        this.message = message;
        this.alertStyle = Object.assign({alert:true,hide:false},{
            ['alert-'+type]:true
        })
    },
    hideInfo:function(){
        //用于隐藏提示框
        this.alertStyle.hide=true;
    }
  }
};
</script>
<style lang="scss" scoped>
    .hide{
        display: none;
    }
</style>