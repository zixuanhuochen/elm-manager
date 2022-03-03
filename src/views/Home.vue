<template>
  <div>
    <el-row>
      <el-col :span="4" style="height: 100vh; background-color: #324057">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          router
        >
          <el-menu-item index="home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index='userList'>用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
            <el-menu-item index="foodList">食品列表</el-menu-item>
            <el-menu-item index="orderList">订单列表</el-menu-item>
            <el-menu-item index="adminList">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span>添加数据</span>
            </template>
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>图表</span>
            </template>
            <el-menu-item index="visitor">用户分布</el-menu-item>
          </el-submenu>
          
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-warning"></i>
              <span>说明</span>
            </template>
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-col>
      <el-col :span="20" style="height:100vh;overflow:auto">
        <router-view></router-view>
       
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getAdminInfo} from '@/network'
export default {
  name: "Home",
  data() {
    return {
      val:1
    };
  },
  mounted(){
    this.getAdminInfoImg()
  },
  methods: {
  async getAdminInfoImg() {
      const { data: result } = await getAdminInfo();
      console.log(result);
    },
  },
  computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
};
</script>

<style>
.el-menu span {
  font-size: 16px;
}
.el-menu-item {
  background-color: rgb(40, 51, 70) ;
}

.el-menu--dark .el-menu-item:hover,
.el-menu--dark .el-submenu__title:hover {
  background-color: #48576a;
}
.el-submenu .el-menu-item{
  min-width:0
}
</style>