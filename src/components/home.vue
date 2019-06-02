<template>
<div>
  <div >
    <el-container style="border: 1px solid #eee">
      <el-header  >
        <el-col >
          <!-- unique-opened="true"  前面要有:-->
          <el-menu :default-active="$route.path"
                   class="el-menu-demo"
                   mode="horizontal"
                   background-color="#F8F8F8"
                   :unique-opened="true"
                   router>
            <template slot="title">Welcome</template>
            <router-link to="/CategoryManagement/UserView" class="badge badge-primary">用户视图</router-link>
            <router-link to="/login"  class="badge badge-danger">登陆</router-link>

          </el-menu>
        </el-col>
      </el-header>
      <!--  最外面的container不加也行，下面这个container加height: 500px;后就能实现滚轴       -->
      <el-container style="height:600px">
        <el-aside width="200px" style=" border: 1px solid #eee">
          <el-menu :default-openeds="['1', '3']"
                   background-color="#F8F8F8"
                   router>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>商品</template>
              <el-menu-item-group>
                <template slot="title">品类管理</template>
                <el-menu-item index="/CategoryManagement/Search">搜索</el-menu-item>
                <el-menu-item index="/CategoryManagement/UserView">用户试图</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="产品管理">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>导航三</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>


        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

    <div class="navbar-default sidebar" role="navigation">
      <div class="sidebar-nav navbar-collapse">
          管理界面
      </div>
    </div>
</div>
</div>

</template>

<script>
    export default {
        name: "home"
    }
</script>

<style lang="scss" scoped>
  @import url("//unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css");
  .el-header {
    background-color: #F8F8F8;
    color: #333;
    line-height: 60px;
  }
  /*.el-container /deep/ .el-aside {*/
  /*  color: #F8F8F8;*/
  /*}*/
  //>>>在scss之类的中用/deep/
  #app{
    background: #F8F8F8;
    width:100%;
    height:100%;


  }
  body,html,#app,el-container{
    height:100%;
    margin: 0;

  }
</style>
