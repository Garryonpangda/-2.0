


<!--我的购物车页面组件-->
<template>
  <div class="shoppingCart">
    <div class="content" v-if="getgoods.length > 0">
      <!-- 全选按钮部分 -->
      <div class="choose">
        <ul>
          <li>
            <el-checkbox v-model="isAllCheck">全选</el-checkbox>
          </li>

          <li>商品</li>
          <li>单价</li>
          <li>数量</li>
          <li>小计</li>
          <li>操作</li>
        </ul>
      </div>
      <!-- 商品列表 -->

      <div
        id="shang"
        class="goods"
        v-for="(item, index) in getgoods"
        :key="item.id"
      >
        <div class="shopping1">
          <td>
            <el-checkbox
              :value="item.check"
              @change="checkChange($event, index)"
            ></el-checkbox>
          </td>
          <div class="d1">
            <img :src="'http://web118.vipgz6.91tunnel.com/' + item.thumbnail" />
          </div>
          <div class="shuoming">
            <p>{{ item.name }}</p>
          </div>
        </div>
        <!-- 价格 -->
        <div class="jiage">
          <div id="jiag">{{ item.price }}</div>
        </div>
        <!-- 数量 -->
        <div class="shuliang">
          <el-input-number
            size="small"
            v-model="item.num"
            :value="item.num"
            @change="NumChange(index, item.goodsId, item.price)"
            :min="1"
          ></el-input-number>
        </div>
        <div class="xiaoji">
          <div id="all_price">{{ item.price * item.num }}元</div>
        </div>
        <div class="shanchu" id="dele">
          <el-button
            type="danger"
            id="delt"
            @click="deleteItem($event, item.id, item.cardid)"
            >删除</el-button
          >
        </div>
      </div>

      <div class="dibu">
        <div class="allnum">
          总共{{ getNum }}件商品，已选择 {{ getCheck }} 件
        </div>
        <div class="allprice">
          <span>总共：</span>
          <span>{{ getTotalPrice }}元</span>
          <!-- 选项的商品数大于0才显示购买按钮 -->
          <router-link :to="getCheck > 0 ? '/confirm' : ''">
            <button :class="getCheck > 0 ? 'btn1' : 'btn2-disabled'">
              购买
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="empty1">
      <div class="empty2">
        <h2>购物车还没有东西哦~快点去购物吧！</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    ...mapActions([
      "updategoods","deletegoods","checkAll","setgoods", "addgoods ",
    ]),
    // 修改商品数量的时候调用该函数
    NumChange(currentValue, key, goodsId, price) {
      this.$axios
        .post(
        "/api/cart/add?userId="+this.$store.getters.getUser+"&goodsId="+goodsId+"&&num="+currentValue+"&price="+price
        )
        .then((res) => {
          this.setgoods(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    checkChange(val, key) {
      // 更新vuex中购物车商品是否勾选的状态
      this.updategoods({ key: key, prop: "check", val: val });
    },
    // 向后端发起删除购物车的数据库信息请求
    deleteItem(e, id, cardid) {
      this.$axios
        .delete(
          "/api/cart/deleteById?userId="+this.$store.getters.getUser+"&cartId="+cardid
        )
        .then((res) => {
          this.setgoods(res.data);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  computed: {
    //getgoods存储的是购物车的内容
    ...mapGetters(["getgoods", "getCheck", "getTotalPrice", "getNum"]),
    isAllCheck: {
      get() {
        //调用getIsAllCheck函数，判断是否全选
        return this.$store.getters.getIsAllCheck;
      },
      set(val) {
        //set接收get返回的值，调用勾选所有商品
        this.checkAll(val);
      },
    },
  },
};
</script>
<style scoped>
/* 全选和小计等部分 */
.choose {
  width: 100%;
  height: 70px;
  border: 1px solid #c8c8c8;
  background-color: #c8c8c8;
}
.choose ul li {
  font-family: "微软雅黑";
  padding-top: 5px;
  padding-right: 148px;
  color: #666666;
  cursor: pointer;
  text-align: center;
  float: left;
}
.choose ul li:nth-of-type(3) {
  margin-left: 318px;
}

.goods {
  position: relative;
  margin-top: 25px;
  height: 200px;
  border: 1px solid #c8c8c8;
}

.goods:hover {
  background-color: bisque;
}
.shopping1 {
  position: relative;
  width: 500px;
  height: 200px;
}
.shopping1 .danxuan {
  width: 18px;
  height: 200px;
  float: left;
}
.d1 {
  /* fixed就不用调盒子高度了 */
  position: fixed;
  width: 250px;
  height: 200px;
  margin-top: 185px;
  left: 60px;
  position: absolute;
}
.d1 > img {
  width: 250px;
  height: 190px;
  margin-top: -205px;
  position: absolute;
}
.shuoming {
  width: 200px;
  height: 200px;
  margin-top: 15px;
  position: absolute;
  left: 340px;
}
.shuoming p {
  display: block;
  margin-top: 30px;
  text-align: left;
  overflow: hidden;
}

.jiage,
.shuliang,
.xiaoji,
.shanchu {
  width: 120px;
  height: 190px;
  position: fixed;
  left: 650px;
  top: 0px;
  text-align: center;
  position: absolute;
}
.shuliang {
  left: 840px;
  top: 84px;
}

.xiaoji {
  left: 1020px;
}
.shanchu {
  left: 1240px;
}
.jian,
.jia {
  width: 25px;
  height: 25px;
  margin-top: 90px;
}
.shuliang .num {
  width: 40px;
  height: 20px;
  text-align: center;
}
.shanchu {
  width: 50px;
  height: 27px;
  margin-top: 90px;
  color: white;
}
#jiag,
#all_price {
  font-size: 23px;
  margin-top: 85px;
}

.dibu {
  width: 100%;
  height: 70px;
  background-color: #c8c8c8;
}
.allnum {
  float: left;
  width: 500px;
  font-size: 23px;
  margin-top: 15px;
  margin-left: 500px;
}
.allprice {
  float: left;
  width: 260px;
  margin-left: 990px;
  font-size: 23px;
  margin-top: -30px;
}
.btn1 {
  float: left;
  width: 150px;
  height: 40px;
  text-align: center;
  font-size: 23px;
  margin-left: 240px;
  margin-top: -30px;
  background: #f49b28;
  color: #fff;
}
.btn2-disabled {
  float: left;
  width: 150px;
  height: 40px;
  text-align: center;
  font-size: 23px;
  margin-left: 170px;
  margin-top: -30px;
  background: #e0e0e0;
  color: #b0b0b0;
}

.empty1 {
  width: 1225px;
  margin: 0 auto;
}
.empty2 {
  height: 300px;
  padding: 0 0 100px 550px;
  margin: 65px 0 0;
  color: #b0b0b0;
  overflow: hidden;
}
.empty2 h2 {
  float: left;
  font-size: 50px;
  margin-top: 100px;
  margin-left: -320px;
}
</style>