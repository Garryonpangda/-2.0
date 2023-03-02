import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'MyList',
    component: () => import('../views/list/MyList.vue')
  },
 
  {
    path: '/shopcar',
    name: 'ShopCar',
    component: () => import('../views/shopcar/ShopCar.vue'),
    meta: {
      requireAuth: true 
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/Order.vue'),

  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/confirm/Confirm.vue'),
 
  },
  {
    path: '/login',
    name: 'MyLogin',
    component: () => import('../views/login/MyLogin.vue'),
    
  }

]
const router = new Router({
  routes
})

export default router
