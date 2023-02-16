<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
          <el-menu-item index="/home/userList">
            <i class="el-icon-s-custom"></i>用户管理
          </el-menu-item>
        <el-menu-item index="/home/movieList">
          <i class="el-icon-video-camera-solid"></i>影片管理
        </el-menu-item>
        <el-menu-item index="/home/movieCategory">
          <i class="el-icon-s-ticket"></i>分类管理
        </el-menu-item>
        <el-menu-item index="4-1">
          <i class="el-icon-s-order"></i>场次管理
        </el-menu-item>
      </el-menu>

        <div class="block">
          <div class="head_portrait"><el-avatar  :size="100" ></el-avatar></div>
          <div class="admName"><i>SuDa</i></div>
        </div>
    </el-aside>
    <el-container>
<!--      <el-header style="text-align: right; font-size: 12px">-->
<!--        <el-dropdown>-->
<!--          <i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item>查看</el-dropdown-item>-->
<!--            <el-dropdown-item>新增</el-dropdown-item>-->
<!--            <el-dropdown-item>删除</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
<!--        <span>SuDa</span>-->
<!--      </el-header>-->

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'MyMain',
  methods:{

  }

};
</script>

<style scoped>
.head_portrait{
  text-align: center;
  margin-top: 50%;
}
.admName{
  text-align: center;
  margin-top: 10%;
  font-size:xx-large;
}

</style>
