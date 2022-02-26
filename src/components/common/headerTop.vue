<template>
  <div class="headerTop">
    <div class="headerTop-left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <div v-show="this.$route.path !== '/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="i in Breadcrumb" :key="i">{{
            i
          }}</el-breadcrumb-item>
        </div>
        <div v-show="this.$route.path === '/home'">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </div>
      </el-breadcrumb>
    </div>
    <div class="headerTop-right">
      <el-dropdown @command="handleCommand">
          <img :src="imgPic" alt="" class="imgPic" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">首页</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerTop",
  props: ["Breadcrumb"],
  data(){
    return {
      imgPic:require('@/assets/image/log.png'),
      isDisabled:true
    }
  },
  methods: {
    handleCommand(command) {
      if(command == 'a' && this.$route.name == 'home'){
       this.$message.error('已在首页，请进行其他操作！')
      }
      else if (command == 'a' && this.$route.name !== 'home'){
        this.$router.push('/home')
      }
      if(command == 'b'){
        this.logOut()
      }
    },
    logOut(){
      this.$router.replace('/','')
    }
    
  },
};
</script>

<style>
.headerTop {
  height: 55px;
  background-color: #eff2f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.imgPic{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>