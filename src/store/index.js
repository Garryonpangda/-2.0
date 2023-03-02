import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import shoppingcar from './shoppingcar'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingcar
  }
})
