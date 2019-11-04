import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/login/login.vue'
import homePage from '@/components/homePage'
import Welcome from '@/components/welcome'
import NotFound from '@/components/404/notFound.vue'
import Article from '@/components/article'
import Image from '@/components/image'
import MyArticle from '@/components/myArticle'
import local from '@/untils'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: homePage,
    children: [{
      path: '/',
      component: Welcome
    }, {
      path: '/article',
      component: Article
    }, {
      path: '/image',
      component: Image
    }, {
      path: '/publish',
      component: MyArticle
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
router.beforeEach((to, from, next) => {
  if (!local.getData() && to.path !== '/login') {
    next('/login')
    return
  }
  next()
})
export default router
