<!--
 * @Description: 提交订单页面组件
 -->
<template>
  <div class="confirmOrder">
    <el-table
      :data="getCheckGoods"
      style="width: 80%" class="tb">
      <el-table-column
        prop="name"
        label="商品"
        width="380"
        class="tab1"
       >
      </el-table-column>
        <el-table-column
        prop="price"
         width="380"
        label="单价"
        >
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        width="380">
      </el-table-column>
  
    </el-table>

    <div class="big-box">
          <div >
       
        <div >
              <div class="address"> <p>收获地址：</p> 广西桂林市桂林电子科技大学花江校区</div>
        </div>
        <div class="fahuo">发货地址：
          <div>北京亦庄经济技术开发区科创十一街18号院</div>
        </div>
      </div>

 
      <div class="box1">
        <div class="btn">
      <span class="pay">总计：</span>
      
                <span class="pay-price">{{ getTotalPrice }}元</span
                >
                  <el-button type="success" plain  @click="addOrder" class="btn">支付</el-button>
       
        </div>
      </div>
 
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
    };
  },
  created() {
    // 如果商品数量小于1，返回购物车页面
    if (this.getCheck< 1) {
      this.$router.push({ path: "/shopcar" });
    }
  },
  computed: {
    //借助mapGetters生成计算属性，从getters中读取数据（数组写法）
    ...mapGetters(["getCheck", "getTotalPrice", "getCheckGoods"]),
  },
  methods: {
    addOrder() {
      var cartList = [];//为了订单接口拼接
      for (let i = 0; i < this.getCheckGoods.length; i++) {
        cartList.push(this.getCheckGoods[i].cardid);
        console.log(cartList)
      }
      this.$axios
        .post(
          `/api/order/addCastOrder?userId=${this.$store.getters.getUser}&cartList=${cartList}`
        )
        .then((res) => {
          console.log(res);
          this.$message({
            showClose: true,
            message: "支付成功",
            type: "success",
          });
          this.$router.push({ path: "/order" });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>
<style scoped>
.tb{
  margin-left: 150px;
}

.pay{
  float: left;
  font-size: 23px;
  margin-left: -290px;

}
.pay-price{
  float: left;
  font-size: 23px;
  color: red;
  margin-left: -200px;
}
.btn{
  width: 100px;
  height: 40px;
  margin-left: 100px;
}

.shouhuo{
  width: 30px;
  height: 30px;
}
.address{
  font-size: 18px;
}
.fahuo{
  font-size: 18px;
}

.big-box {
  width: 1290px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: rgb(205, 199, 199);
  margin-top: 20px;
}

.box1 {
  padding: 20px 48px;
  border-top: 3px solid #d2b04b;
  overflow: hidden;
}
 .btn {
  float: right;
}
.title{
  font-size: 18px;
}



</style>