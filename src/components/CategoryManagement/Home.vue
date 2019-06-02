<template>
    <div id="CMHome">

      <div class="col-lg-12">
        <p>当前商品分类ID：{{parentCategoryId}}</p>
      </div>
      <table class="table table-striped  table-sm table-hover  " style="width: 100% ;text-align:center" >
        <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>优先级</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody id="cMShowCategoryTbody">
        <tr v-for="(category) in categoryList " :id="category.id">
          <th>{{category.id}}</th>
          <td>{{category.name}}</td>
          <th>{{category.sortOrder}}</th>
          <td>
            <h5 style="" >
              <button @click="onUpdateName(category.id,category.name)" class="badge badge-success">更改品类名字</button>
              <button class="badge badge-primary">修改优先级</button>
              <button class="badge badge-danger">删除</button>
            </h5>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>


  /**
   * 获取产品类别子节点(平级)url
   **/
  const get_category_url="/manage/category/get_category.do";
  const set_category_name_url="/manage/category/set_category_name.do";
  import Tools from "utils/tool.js";
  const tool=new Tools();
  export default {
        name: "Home",
        data(){
          return{
            categoryList:{},
            parentCategoryId:""
          }
        },methods:{
      get_category(categoryId){
            tool.request({
              url:tool.getServerUrl(get_category_url),
              data:{'categoryId':categoryId}
            }).then((res)=>{
              this.categoryList=res;
              this.parentCategoryId=categoryId;
              console.log(res);
            },(err)=>{
              tool.errorTips(err);
            })
          },
      onUpdateName(categoryId,categoryName){
        let newName = window.prompt("请输入新的品类名称", categoryName);
        if(newName){
          console.log(categoryId);
          console.log(newName);

          const a=new URLSearchParams();
          a.append("categoryId",categoryId);
          a.append("categoryName",newName);
          // 更新
          tool.request(
          {
            url:tool.getServerUrl(set_category_name_url),
            data:a.toString(),method:"post"
          }).then(res => {
            tool.successTips(res);
            this.get_category(this.parentCategoryId);
          }, errMsg => {
            tool.errorTips(errMsg);
          });
        }else{
          tool.errorTips('请输入正确的品类名称');
        }
      }
    },mounted() {
      //初始化
      this.get_category(0);

    }
  }
</script>

<style scoped>

</style>
