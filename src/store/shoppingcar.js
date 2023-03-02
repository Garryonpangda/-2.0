import Vue from 'vue'
export default {
  state: {
    shoppingcar: [
    ]
  },
  getters: {//getters将state中的数据进行加工
    getgoods (state) {
      // 获取购物车的内容
      return state.shoppingcar;
    },
    getNum (state) {
      // 购物车商品总数量
      let totalNum = 0;
      for (let i = 0; i < state.shoppingcar.length; i++) {
        const temp = state.shoppingcar[i];
        totalNum += temp.num*1.0;
      }
      return totalNum;
    },
    getIsAllCheck (state) {
      // 判断是否全选
      let isAllCheck = true;
      for (let i = 0; i < state.shoppingcar.length; i++) {
        const temp = state.shoppingcar[i];
        // 只要有一个商品没有勾选立即return false;
        if (!temp.check) {
          isAllCheck = false;
          return isAllCheck;
        }
      }
      return isAllCheck;
    },
    getCheckGoods (state) {
      // 获取勾选的商品信息
      // 用于确认订单页面
      let checkGoods = [];
      for (let i = 0; i < state.shoppingcar.length; i++) {
        const temp = state.shoppingcar[i];
        if (temp.check) {
          checkGoods.push(temp);
        }
      }

      return checkGoods;
    },
    getCheck (state) {
      // 获取购物车勾选的商品数量
      let totalNum = 0;
      for (let i = 0; i < state.shoppingcar.length; i++) {


        const temp = state.shoppingcar[i];
        if (temp.check) {

          totalNum += temp.num*1.0;
        }
      }
      return totalNum;
    },
    getTotalPrice (state) {
      // 购物车勾选的商品总价格
      let totalPrice = 0;
      for (let i = 0; i < state.shoppingcar.length; i++) {
        const temp = state.shoppingcar[i];

        if (temp.check) {
          totalPrice += temp.price * temp.num;
        }
      }
      return totalPrice;
    }
  },
  mutations: {
    setgoods (state, data) {
      state.shoppingcar = data;
    },
 
    updategoods (state, payload) {
//vue通过set添加对象属性,state.shoppingcar[payload.key],勾选的商品，置为选中状态
      Vue.set(state.shoppingcar[payload.key],"check",payload.val)
      console.log("--------------")
      console.log(state.shoppingcar[payload.key])
    },
    addgoods(state, productID) {
      // 增加购物车商品数量

      for (let i = 0; i < state.shoppingcar.length; i++) {
        const temp = state.shoppingcar[i];
        if (temp.productID == productID) {
          if (temp.num < temp.maxNum) {
            temp.num++;
          }
        }
      }
    },
    deletegoods (state, id) {
      // 根据购物车id删除购物车商品
      for (let i = 0; i < state.shoppingcar.length; i++) {
        const temp = state.shoppingcar[i];
        if (temp.id == id) {
          state.shoppingcar.splice(i, 1);
        }
      }
    },
    checkAll (state, data) {
      console.log(data)
      // 点击全选按钮，更改每个商品的勾选状态
      for (let i = 0; i < state.shoppingcar.length; i++) {
        state.shoppingcar[i].check = data;
      }
   
      console.log(state.shoppingcar.length)
    }
  },
  actions: {
    setgoods ({ commit }, data) {
      //将setgoods函数和data传到mutations中，调用其中的函数
      commit('setgoods', data);
    },
   
    updategoods ({ commit }, payload) {
      commit('updategoods', payload);
    },
    addgoods ({ commit }, productID) {
      commit('addgoods', productID);
    },
    deletegoods ({ commit }, id) {
      commit('deletegoods', id);
    },
    checkAll ({ commit }, data) {
      commit('checkAll', data);
    }
  }
}