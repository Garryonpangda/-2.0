import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Axios from 'axios';
Vue.prototype.$axios = Axios;

import MyList from './views/list/MyList';
Vue.component(MyList.name, MyList);
import MyLogin from './views/login/MyLogin';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './views/register/MyRegister';
Vue.component(MyRegister.name, MyRegister);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
