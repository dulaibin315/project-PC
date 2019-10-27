import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/login/login.vue'
import homePage from '@/components/homePage'
import Welcome from '@/components/welcome'
import NotFound from '@/components/404/notFound.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: homePage,
    children: [{
      path: '/',
      component: Welcome
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
