<template>
  <div id="register" >
    <!-- :visible弹框的显示隐藏，.sync同步动态双向的来表示visible的值 -->
    <el-dialog title="注册"  center :visible.sync="isRegister">
        <el-form
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名"  prop="name">
          <el-input
            v-model="name"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
             v-model="password"
          ></el-input>
        </el-form-item>
         <el-form-item>
            <el-button type="success"    @click="Register"
            
            class="login2">注册</el-button>
       
        </el-form-item>
      </el-form>
  
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyRegister",
  props: ["register"],
  data() {
    return {
      isRegister: false, // 控制注册组件是否显示
        name: "",
        password: "",
    };
  },
  watch: {
    // 监听父组件传过来的register变量，设置this.isRegister的值
    register: function (val) {
      if (val) {
        this.isRegister = val;
      }
    },
 
  },
  methods: {
    Register() {
      if(this.name=="")
      {
        alert("用户名不能为空！")
        return;
      }
       if(this.password=="")
      {
        alert("密码不能为空！")
        return;
      }
 
       
          this.$axios
            .post(
              "/api/user/register?name="+this.name+"&password="+this.password
            )
            .then((res) => {
              if (res.data == "OK") {
                //隐藏注册组件
                this.isRegister = false;
               alert("注册成功")
              } else if (res.data == "isexist") {
               alert("用户已存在")
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
width: 400px;
width: 500px;
}
.login2{
  float: left;
width:150px;
height: 60px;
margin-left: 270px;
}
</style>