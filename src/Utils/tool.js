
'use strict';

const conf = {
  // online
  // serverHost: 'http://admin.happymmall.com'
  // dev
  serverHost: 'http://localhost:8080',
  imageHost: 'http://img.happymmall.com/',
}

import axios from 'axios'

class Tools{
  // 请求服务器
  request(param){

    // axios.defaults.withCredentials=true;
    console.log("test",new URLSearchParams(param.data));
    return new Promise((resolve, reject) => {
      axios({
        method       : param.method   || 'get',
        //之前把下面两个放在data项之后，结果不行，放在现在这个位置才行，花了一小时
        //在webpack.config.js 中加了devServer项
        url        : param.url      || '',
        params: (param.method === "get") ? param.data : {},
        data       : param.data||'',
      }).then((res) => {
        if(res.status===200)
          res=res.data;
        // 数据成功
        if(0 === res.status){
          typeof resolve === 'function' && resolve(res.data || res.msg);
        }
        // 没登录状态, 且强制登录, 自动跳转到登录页
        else if(res.status === 10){
          this.doLogin();
        }
        // 其他状态，调用error
        else{
          typeof reject === 'function' && reject(res.msg || res.data);
        }
      },
        (err) => {
          typeof reject === 'function' && reject(err.statusText);
        }).catch((err)=>{
          console.log("axiosError",err);
        });
    }).catch((err)=>{
      console.log("promiseError",err)
    });
  }
  // 获取请求url地址
  getServerUrl(path){
    return conf.serverHost + path;
  }
  // 获取图片地址
  getImageUrl(path){
    return conf.imageHost + path;
  }
  // 获取url参数
  getHashParam(name){
    var reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      queryString = window.location.hash.split('?')[1] || '',
      result      = queryString.match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }
  // alert
  successTips(msg){
    alert(msg || '操作成功');
  }
  // alert
  errorTips(msg){
    alert(msg || '哪里不对了~');
  }
  // 向本地存储里放数据
  setStorage(name, data){
    // array / json
    if(typeof data === 'object'){
      let jsonString = JSON.stringify(data);
      window.localStorage.setItem(name, jsonString);
    }
    // number / string / boolean
    else if(typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean'){
      window.localStorage.setItem(name, jsonString);
    }
    // undefined / function
    else{
      alert('该数据类型不能用于本地存储');
    }
  }
  // 从本地存储获取数据
  getStorage(name){
    let data = window.localStorage.getItem(name);
    if(data){
      // JSON.parse
      return JSON.parse(data);
    }else{
      return '';
    }
  }
  // 删除本地存储
  removeStorage(name){
    window.localStorage.removeItem(name);
  }
  // 跳转登录
  doLogin(){
    window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.hash);
    // this.$router.push({path: '/login', replace: true});
  }
};
export default  Tools;
