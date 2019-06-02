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
            <input type="password" v-model="password" @keyup="login($event)" placeholder="Password" class="form-control">
          </div>
          <input type="button" @click="login" value="登录" class="btn btn-primary">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  axios.defaults.withCredentials=true;
  /*
 * 登陆url
 * */
  const url_login="http://localhost:8080/manage/user/login.do";
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
      login: function(event) {
        let whatKeyCodeInputted;
        if (event.code !== undefined) {
          // 使用keyboardvent.key处理事件，并将handled设置为true。
          whatKeyCodeInputted=event.code;

        } else if (event.keyIdentifier !== undefined) {
          // 使用keyboardvent.keyIdentifier处理事件，并将handled设置为true。
          whatKeyCodeInputted=event.keyIdentifier;
          console.log("2");


        } else if (event.keyCode !== undefined) {
          //使用keyboardvent.keycode处理事件并将handled设置为true。
          whatKeyCodeInputted=event.keyCode;
        }
        if(whatKeyCodeInputted==="Enter"){
          let data=new FormData();
          data.append('username',this.username);
          data.append('password',this.password);
          axios.post(url_login, data)
            .then((response)=>{
              //number类型
              var role=response.data.data.role;
              //push会向history添加一个记录能返回上一个页面 repalce不添加，点击返回会到上上个页面
              //go(i) 可以向前向后跳i个页面 可以正负
              //this.$router.repalce()
              switch (role) {
                case 1:
                  // window.location.href = this.state.redirect || '#/home';
                  window.location.href = '/CategoryManagement/CMHome';
                  break;
              }

            })
            .catch((response)=>{
              this.showInfo(response,"response")
            });


        }
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
