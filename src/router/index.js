import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/login/login.vue'
import homePage from '@/components/homePage'
import Welcome from '@/components/welcome'
import NotFound from '@/components/404/notFound.vue'
import Article from '@/components/article'
import Image from '@/components/image'
import MyArticle from '@/components/myArticle'
import Comment from '@/components/comment'
import Setting from '@/components/setting'
import Fun from '@/components/fun'
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
    }, {
      path: '/comment',
      component: Comment
    }, {
      path: '/setting',
      component: Setting
    }, {
      path: '/fans',
      component: Fun
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
