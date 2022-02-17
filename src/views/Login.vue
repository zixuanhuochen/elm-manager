<template>
  <div class="login">
    <div class="logInput">
      <h2>后台管理登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username" style="fontSize:20px">
          <el-input v-model="ruleForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="submitForm" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
import { getLogin, } from "@/network/index";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        user_name: "",
        password: "",
      },
      imagtData: "",
      rules: {
        user_name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const {data:result} = await getLogin(this.ruleForm);
          if(result.status === 1){
            this.$message({type:'success',message:'登录成功'})
            sessionStorage.setItem('log',true)
            this.$router.push('/home')
          }else{
            this.$message({type:'error',message:result.message})
            console.log(result);
          }
        } else {
          this.message({type:'error',message:'请输入正确信息'})
          console.log("error submit!!");
          return false;
        }
      });
    },
    
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #324057;
  .logInput {
    width: 500px;
    height: 400px;
    padding: 15px;
    text-align: center;
    border: 1px solid skyblue;
    border-radius: 10px;
    background-color: #fff;
    h2 {
      margin: 50px;
    }
  }
}


</style>