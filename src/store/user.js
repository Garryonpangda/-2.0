export default {
  state: {//state存数据
    user: "", // 登录的用户，即用户id
    showLogin: false // 用于控制是否显示登录组件
  },
  getters: {
    //操作state中的数据
    getUser (state) {
      return state.user//返回用户id
    },
    getShowLogin (state) {
      return state.showLogin
    }
  },
  mutations: {
    //mutation接收actions中commit提交的函数
    setUser (state, data) {
      state.user = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    }
  },
  actions: {
    // {commit}其实就是context.commit
    setUser ({ commit }, data) {
      //commit将函数setUser和参数提交到mutation中
      commit('setUser', data);
    },
    setShowLogin ({ commit }, data) {
      commit('setShowLogin', data);
    }
  }
}