import $ from 'jquery'
import Vue from 'vue'
import VueResource from 'vue-resource';
import Login from './components/Login.vue'
//引入BootStrap 4.0
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

Vue.use(VueResource);

//将APP这个Template渲染到主页面#app元素中
//h=>h(App);
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })

new Vue({
  el:"#login",
  render:h=>h(Login)
})

