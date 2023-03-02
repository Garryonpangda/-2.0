<template>
  <div id="app" name="app">
    <div >
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b" >
    <!-- index：唯一标志，，类型为字符串 -->
    <el-menu-item index="1"  @click="list" class="item1">首页</el-menu-item>
    <el-menu-item index="1" @click="login" class="item1">登录</el-menu-item>
    <el-menu-item index="1" @click="register = true" class="item1">注册</el-menu-item>
    <el-menu-item index="1" class="item1"> <router-link to="/order" >我的订单</router-link></el-menu-item>
    <el-menu-item index="1" class="item1">   <router-link to="/shopcar">
                我的购物车 </router-link></el-menu-item>

    </el-menu>
    </div>
    <el-container>
      <MyLogin></MyLogin>
      <MyRegister :register="register" ></MyRegister>
      <el-main>
        <keep-alive>
          <!-- 作用：keep-alive可以在组件切换时，保存其包裹的组件的状态，使其不被销毁，防止多次渲染。
          目的：可以使被包含的组件保留状态，或避免重新渲染。
 -->
          <!-- 把路由在界面呈现出来 -->
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      register: false, // 不显示注册组件
      
    };
  },

  computed: {
    ...mapGetters(["getUser"]),//getUser操作的是用户id
  },
  watch: {
    getUser () {
    
        this.$axios
          .post("/api/cart/listByUser?userId="+this.$store.getters.getUser)
          // .then在axios请求完成后执行的下一步操作（异步执行)
          .then((res) => {
            // res成功后返回的结果
            this.setgoods(res.data);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      
    },
  },
  methods: {
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions
    ...mapActions([ "setShowLogin", "setgoods"]),
    login() {
      this.setShowLogin(true);
    },
        list() {
         this.$router.push({
        path: "/",
      });
    },
 
    // 接收注册子组件传过来的数据
   
  },
};
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
.item1{
  float: left;
  padding-left: 20px;

 left: 450px;
   font-size: 18px;
}
#app .el-header {
  margin-top: 0px;
  padding: 0;
}
#app .el-main {
  /* 最低高度 */
  min-height: 300px;
  padding: 20px 0;
}
#app .el-footer {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}

.topbar {
  height: 40px;
  background-color: #333030;
  margin-bottom: 20px;
}
.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}
.topbar .nav ul {
  float: right;
}
.topbar .nav li {
  float: left;
  height: 40px;
  color: #ececec;
  font-size: 14px;
  text-align: center;
  /* 行与行之间的距离 */
  line-height: 40px;
  margin-left: 20px;
}
.topbar .nav .sep {
  color: #b8b0b0;
  font-size: 12px;
  margin: 0 5px;
}
.topbar .nav li .el-button {
  color: #bdbaba;
}
.topbar .nav .el-button:hover {
  color: #fff;
}
.topbar .nav li a {
  color: #b0b0b0;
}
.topbar .nav a:hover {
  color: rgb(224, 224, 224);
}
.topbar .nav .shopCart {
  width: 120px;
  background: #302d2d;
}
.topbar .nav .shopCart:hover {
  background: rgb(124, 115, 115);
}
.topbar .nav .shopCart:hover a {
  color: #000000;
}
.topbar .nav .shopCart-full {
  width: 120px;
  background: #db371a;
}
.topbar .nav .shopCart-full a {
  color: white;
}
/* 顶部导航栏CSS END */
.el-header .so {
  margin-top: 0px;
  width: 300px;
  float: right;
}
/* 顶栏容器CSS  */
</style>