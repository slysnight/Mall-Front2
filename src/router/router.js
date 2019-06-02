import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//主页 home
import login from '../components/login.vue'




//类别管理组件 CategoryManagement --CMs
import CMSearch from '../components/CategoryManagement/Seach.vue'
import CMUserView from '../components/CategoryManagement/UserView.vue'
import CMHome from  '../components/CategoryManagement/Home';
/*
* 配置路由
* 路径path:'/test1'里面不用加'.' './test' 加了就错了
* **/
const routes=[
  {
    name:'login',
    path:'/login',
    component:login
  },
  {
    path:'/CategoryManagement/Search',
    component:CMSearch
  },
  {
    path:'/CategoryManagement/UserView',
    component:CMUserView
  },{
    path:'/CategoryManagement/CMHome',
    component:CMHome
  },
  {
    path:'*',
    redirect:'login'
  } //默认跳转路由   //动态路由  {path:'/UserView:aid',component:UserView},

];


const router=new VueRouter({
  mode: 'history',//注意将 Router 的模式设为 history，否则跳转时 URL 上会带有 # 符号，导致获取到的 route 值不正确
  routes
});
//暴露了才可以用
export default router;

