<template>
    <div id="AdminView">
      <!--<div id="Categorymanagement_login_table" >-->
        <!--用户名：<input type="text" class="form-control" v-model="username"> <br>-->
        <!--密码：&nbsp;&nbsp; <input type="password" class="form-control" v-model="password" @keyup="login($event)">-->
      <!--</div>-->
      <hr>
      <button @click="RequestAllData()" class="btn btn-dark">请求数据</button>
      <button @click="get_user_info()" class="btn btn-success">获取个人信息</button>
      <hr>

      <!--搜索栏-->
      <div class="input-group">
        <div class="input-group-prepend">
          <div class="input-group-text" id="btnGroupAddon">🔍</div>
        </div>
        <input type="text" class="form-control" v-model="searchText"
               placeholder="" aria-label="Input group example"
               aria-describedby="btnGroupAddon"
        @keyup="search($event)"
        > &nbsp; <button class="btn btn-outline-primary" @click="refresh"> 刷新列表</button>
      </div>



      <!--管理员视图-->
      <table class="table table-striped table-sm" style="width: 100% ;text-align:center" >

        <thead>
          <tr>
            <th>编号</th>
            <th>名称</th>
            <th>父类别</th>
          </tr>
        </thead>
       <tbody>
       <!--v-if 判断里面数字好像要在key 前面-->
       <tr v-for="(a,key) in categories " v-if="1000>key" :id="a.id"  >
         <th>
           {{a.id}}
         </th>
         <td>
           <span @click="get_deep_category(a.id)">
             {{typeof a.name===String?a.name=a.name.replace('“',""):a.name}}
           </span>
         </td>
         <td>
           <span @click="get_deep_category(a.id)">{{a.parentId===0?"root":a.parentId}} </span>
         </td>
         <td>
          <h5 style="float: right" >
            <span class="badge badge-success">编辑</span>
            <span class="badge badge-danger">删除</span>
          </h5>
         </td>

       </tr>
       <!--key大于1000的是后来的非root的-->
       <tr v-for="(a,key) in categories " v-if="1000<key" :id="a.id"  >
         <th>
           {{a.id}}
         </th>
         <td>
           <span @click="get_deep_category(a.id)">
             {{typeof a.name===String?a.name=a.name.replace('“',""):a.name}}
           </span>
         </td>
         <td>
           <span @click="get_deep_category(a.id)">{{a.parentId===0?"root":a.parentId}} </span>
         </td>
         <td>
           <h5 style="float: right" >
             <span class="badge badge-success">编辑</span>
             <span class="badge badge-danger">删除</span>
           </h5>
         </td>

       </tr>

       </tbody>
      </table>


      <!--<ul>-->
        <!--<li v-for="a in categories" :id="a.id" >-->
          <!--{{ a.name}}-->
          <!--<span v-on:click="get_deep_category(a.id)">+</span>-->
        <!--</li>-->
      <!--</ul>-->



    </div>
</template>

<script>
  import axios from 'axios'

  axios.defaults.withCredentials=true;

  /**
   * 获取产品类别子节点(平级)url
   **/
  const get_category_url="http://localhost:8080/manage/category/get_category.do";

  /*
  * 登陆url
  * */
  const url_login="http://localhost:8080/manage/user/login.do";

  /**
   * 获取用户信息url
   * */
  const url_get_user_info="http://localhost:8080/user/get_user_info.do";

  /**
   * 获取当前分类id及递归子节点categoryId
   * */
  const url_get_deep_category="http://localhost:8080/manage/category/get_deep_category.do";

    export default {
        name: "AdminView",data(){
          return{searchText:"",
            username:'',
            password:'',
            ref:{
              msg:''
            },
            categories: {
              createTime: "",
              id: "",
              name: "",
              parentId:"",
              sortOrder: "",
              status:"",
              updateTime: ""
            },
            user:{
              createTime:'',
              email: "",
              id: "",
              password: "",
              phone: "",
              question: "问题",
              role: "",
              updateTime: "",
              username: ""
            },
            temp:{} //暂时存储categorys
          }
      },methods:{search(key){
          if(this.categories["nbsp"]!==undefined){
            this.temp=this.categories;
          }
          if(key.keyCode===13){
            let temp=this.temp;
            let searchResult={};
            let searchText=this.searchText;
            if(isNaN(searchText)){
              Object.keys(temp).forEach(function (key) {
                if((temp[key].name+"").indexOf(searchText)>=0){
                  searchResult[temp[key].id]=temp[key];
                }
              });
            }else{
              Object.keys(temp).forEach(function (key) {
                if((temp[key].id+"").indexOf(searchText)>=0){
                  searchResult[temp[key].id]=temp[key];
                }
              });
            }
            if(Object.keys(searchResult).length>0){
              this.categories=searchResult;
            }else {
              this.categories={};
              this.categories[0]={id:"000000",name:"无搜索结果",parentId:"无"};
            }
            // 本想用这个来刷新，结果发下不用也能刷新了，怀疑是用一次就绑定成刷新的了
            // this.categories={...this.categories,"nbsp":""};

          }
        },refresh(){
          if(Object.keys(this.temp).length>0)
            this.categories=this.temp;
            this.searchText="";
        },
        // login(key){
        //   // console.log(key,this.username);
        //   if(key.keyCode===13){
        //     /*
        //     * {emulateJSON:true} 如果Web服务器无法处理编码为 application/json 的请求，你可以启用 emulateJSON 选项。
        //     * 不加就失败
        //     * 上面是vue1的那个，后来改成axios 结果要用formdata才行
        //     * */
        //     let data=new FormData();
        //     data.append('username',this.username);
        //     data.append('password',this.password);
        //     axios.post(url_login, data)
        //       .then((response)=>{
        //         console.log("username",this.username);
        //         console.log('response',response);
        //         this.getCategory();
        //       })
        //       .catch((response)=>{
        //       });
        //   }
        // },
         getCategory(categoryId){
          return  axios.get(get_category_url,{params:{'categoryId':categoryId}});
        }
        ,get_deep_category(categoryId){
           axios.get(url_get_deep_category,{params:{'categoryId':categoryId}})
             .then((res)=>{
               //res 里面是child类别
               let ids=res.data.data;
               if(ids!==[]){
                 for(let id of ids){
                   this.getCategory(id).then((res)=>{
                     if(res.data.data.length!==0){
                       console.log("id",res.data.data);
                       console.log("id",this.categories);
                       //新建一个对象以达到刷新的目的
                       //此处的child_category外面不加{}会让child_category直接覆盖root_category
                       //是因为this.categories={{},this.categories,child_category};
                       // 加了第一个{}是合并相同属性的。也就是key相同会覆盖
                       for(let child_category of res.data.data ){
                         console.log("key",child_category);
                         let child_id=child_category.id;
                         this.categories[child_id]=child_category;
                         //这里主要是用来刷新页面
                         // 3月28号，决定将nbsp项作为标识符，表示含有子类别，
                         // 也是表示categories里面存的是全部的类别，
                         this.categories={...this.categories,"nbsp":""};
                         //在下面被注释的里面的child_id不是引用而是key就是child_id。
                         // this.categories={...this.categories,child_id:child_category};
                         console.log("key",child_id);

                       }
                       console.log("id",this.categories);

                     }
                   })
                 }


               }

             });
          console.log("getCategory=>res.data.data",this.categories.length);
        },
        get_user_info(){
          axios.get(url_get_user_info).then((res)=>{
            // console.log(res);
            /*
            * ResponseCode.java得到状态码表示什么
            * */
            if(res.status!==200){
              return
            }
            switch (res.data.status) {
              case 0:
                console.log("get_user_info success!");
                this.user=res.data.data;
                delete this.user["answer"];
                console.log(this.user);
                break;
              case 1:
                console.log("get_user_info error!");
                break;
              case 10:
                console.log("请登录!");
                break;
              case 2:
                console.log("get_user_info: ILLEGAL_ARGUMENT!");
              default:
                console.log("异常");
                break;
            }
          }).catch((res)=>{
            alert("error")
          })
        },
        RequestAllData(){
          this.getCategory(0).then((res)=>{
            this.categories=res.data.data;
            const root_category_id=[];
            for(let s of this.categories){
              if(s.id!==undefined)
                root_category_id.push(s.id);
            }
            for(let id of root_category_id){
              this.get_deep_category(id)
            }
          });

          },
      },
      mounted(){
          this.RequestAllData();

      }
    }
</script>

<style scoped>

</style>
