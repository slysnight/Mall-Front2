import $ from 'jquery'
import Vue from 'vue'
import app from './App.vue'
import router from './router/router'

//引入BootStrap 4.0
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

//引入自定义的组件


import "./element-ui/element-ui"
Vue.config.productionTip = false;


new Vue({
  el:"#app",router,
  render:h=>h(app)
});

