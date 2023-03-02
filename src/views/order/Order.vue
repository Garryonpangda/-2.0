<!--我的订单页面组件-->
<template>
  <div class="order">
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          订单列表
        </p>
      </div>
    </div>
    <div class="order-content" v-if="orders.length > 0">
      <div class="content" v-for="(item, index) in orders" :key="index">
        
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-time">
              生成订单时间: {{ item.orderTime  }}
            </div>
            
          </li>
          
          <li class="header">
            <div class="pro"></div>
            <div class="pro-name">商品</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
          </li>

          <li
            class="product-list"
            v-for="(product, i) in item.orderDetail"
            :key="i"
          >
            <div class="pro"></div>
            <div class="pro-name">
          
             {{ product.goodsName }}
              
            </div>
            <!-- substring从下标为13截取后面的值 -->
            <div class="pro-price">{{ product.nums.substring(13) }}元</div>
            <div class="pro-num">{{product.nums[0]}}</div>
            <div class="pro-total pro-total-in">
              {{ product.nums.substring(13) * product.nums[0] }}元
            </div>
          </li>
        </ul>
    
      </div>
      <div style="margin-top: -40px"></div>
    </div>

    <div v-else class="order-empty">
      <div class="empty">
        <h2>暂时没有订单哦~</h2>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  
  data() {
    return {
      orders: [], // 订单列表
      total: [], // 单个订单商品数量及总价列表
      num:""
    };
  },
  activated() {
    // 获取订单数据
    this.$axios
      .post("/api/order/listByUser?userId="+this.$store.getters.getUser)
      .then((res) => {
        this.orders = res.data;
      })
      // 接口请求失败，抛出错误
      .catch((err) => {
        return Promise.reject(err);
      });
  },
    computed: {
    //借助mapGetters生成计算属性，从getters中读取数据（数组写法）
    ...mapGetters([ "getCheck"]),
  },

};
</script>
<style scoped>


.order .order-header {

  height: 64px;

  background-color: #fff;
  margin-bottom: 20px;
}
.order .order-header .order-header-content {

  width: 125px;
  margin: 0 auto;
}
.order .order-header p {

  font-size: 31px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}

.order .content {
    background-color: red;
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {

  background-color: #fff;
  color: #424242;
  line-height: 85px;
}
/* 我的订单表头CSS */
.order .content ul .order-info {

  height: 80px;

  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #d4d4d4;
}
.order .content ul .order-info .order-id {
  float: left;
  color: #d82222;
}
.order-time {
  float: left;
}

.order .content ul .header {
   font-size: 20px;
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order .content ul .product-list {
   font-size: 20px;
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro {
  width:10px;
}
.order .content ul .pro-name {
  float: left;
  width: 316px;

}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-price {
  float: left;
  width: 150px;
  padding-right: 268px;
  text-align: center;
}
.order .content ul .pro-num {
  float: left;
  width: 190px;
    padding-right: 208px;
  text-align: center;
}





.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;

  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 50px 0 15px;
  font-size: 50px;
}

/* 订单为空的时候显示的内容CSS END */
</style>