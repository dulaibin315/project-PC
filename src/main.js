import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/api/axios'
import myInsert from '@/api/chajian'
import '@/assets/style.less'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(myInsert)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
