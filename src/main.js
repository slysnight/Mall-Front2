import $ from 'jquery'
import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'

//引入BootStrap 4.0
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'


//引入自定义的组件

//login
import login from './components/login.vue'

//主页 home
import home from './components/home.vue'

//管理界面
import admin from './components/admin.vue'



//类别管理组件
import AdminView from './components/CategoryManagement/AdminView.vue'
import UserView from './components/CategoryManagement/UserView.vue'
import CategoryManagement_Home from './components/CategoryManagement/Home.vue'

Vue.use(VueRouter);

/*
* 配置路由
* 路径path:'/test1'里面不用加'.' './test' 加了就错了
* **/
const routes=[
  {path:'/home',component:home},
  {path:'/admin',component:admin},
  {path:'/login',component:login},
  {path:'/CategoryManagement/AdminView',component:AdminView},
  {path:'/CategoryManagement/UserView',component:UserView},
  {path:'/CategoryManagement/Home',component:CategoryManagement_Home},
  //动态路由  {path:'/UserView:aid',component:UserView},
  {path:'*',redirect:'/home'} //默认跳转路由
];


const router=new VueRouter({
  routes
});


Vue.config.productionTip = false;


new Vue({
  el:"#app",router,
  render:h=>h(app)
});

