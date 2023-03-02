<template>
  <div id="myLogin"  class="login1">
        <!-- :visible弹框的显示隐藏，.sync同步动态双向的来表示visible的值 -->

    <el-dialog title="登录"  center :visible.sync="isLogin">
     <el-form
        :model="LoginUser"
        
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名"  prop="name">
          <el-input
    
           
            v-model="LoginUser.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
           
            v-model="LoginUser.pass"
          ></el-input>
        </el-form-item>
         <el-form-item>
            <el-button type="success"  @click="Login"
            
            class="login2">登录</el-button>
       
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "MyLogin",
  data() {
    return {
      LoginUser: {
        name: "",
        pass: "",
      },
   
    };
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.setShowLogin(val);
      },
    },
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    Login() {

      console.log(this.LoginUser.name)
      if(this.LoginUser.name=="")
      {
        alert("用户名不能为空");
        return;
      }
      if(this.LoginUser.pass=="")
      {
        alert("密码不能为空！")
        return;
      }
      //发送请求
          this.$axios
            .post(
              "/api/user/login?name="+this.LoginUser.name+"&password="+this.LoginUser.pass
            )
            .then((res) => {
              if (res.data == "invalid") {
                alert("用户名或密码错误！")
              } else {
                //隐藏登录框
                this.isLogin = false;
                // 登录信息存到vuex
                this.setUser(res.data);
                // 弹出通知框提示登录成功信息
                alert("登录成功")
              }
            })
            .catch((err) => {
              return Promise.reject(err);
            });
      
    
    },
  },
};
</script>
<style scoped>
.login1{

  height: 500px;
}
.login2{
  float: left;
width:150px;
height: 60px;
margin-left: 270px;
}
</style>
