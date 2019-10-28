import axios from 'axios'
import local from '@/untils'
import router from '@/router'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// if (local.getData()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getData().data.token}`
// }
axios.interceptors.request.use(config => {
  const user = local.getData() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
