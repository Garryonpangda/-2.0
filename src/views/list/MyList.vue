<template>
  <div>
    <el-row>
      <el-col class="sp">
        <div
          class="grid-content bg-purple"
          v-for="(item, i) in list"
          :key="i"
        >
          <div class="goods">
            <!-- 为了渲染图片，不然就是字符串 -->
            <img
              :src="'http://web118.vipgz6.91tunnel.com/' + item.pthumbnail"
              alt=""
            />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="price">￥{{ item.price1 }}</div>
          <el-button
            type="danger"
            class="btn"
            :plain="true"
          
            @click="addShoppingCart(item.id,item.price1)"
            >加入购物车</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<script>
import { mapActions } from "vuex";
export default {
  name: "MyList",
   data() {
    return {
      list: "", // 商品列表
    };
  },
  created() {
    this.init();

  },

methods: {
       init() {
      this.$axios
        .get("/api/goods/list")
        .then((res) => {
          this.list = res.data;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    ...mapActions([
      "setgoods",
    ]),
 

    // 加入购物车
    addShoppingCart(Id,Price) {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        //通过dispatch将函数setShowLogin和data传到actions中
        this.$store.dispatch("setShowLogin", true);
        return;
      }

      this.$axios
        .post(
          "/api/cart/add?userId="+this.$store.getters.getUser+"&goodsId="+Id+"&num=1"+"&price="+Price
        )
        .then((res) => {
          // console.log(res.data)
          // 调用setgoods函数，将加入购物车的每个商品传进去
          this.setgoods(res.data);
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
}
 
}
  

</script>
<style scoped>

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background-color: rgb(199, 197, 197);
  border: 1px solid rgb(226, 226, 226);
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  margin-top: 60px;
  /* 一行展示的盒子的宽度 */
  width: 300px;
  height: 400px;
  float: left;
  border-radius: 4px;
  margin-left: 40px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.sp {
  margin-left: 40px;
}
.goods {
  width: 100%;
  height: 250px;
}
.goods > img {
  margin: 10px;
  width: 270px;
  height: 230px;
}
.name {
  margin-top: 30px;
  width: 100%;
  height: 40px;
  text-align: center;
}
.price {
  width: 100%;
  height: 40px;
  text-align: center;
}
.btn {
  margin-top: 40px;
  width: 100%;
  height: 40px;
}
</style>
