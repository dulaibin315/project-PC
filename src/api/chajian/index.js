import Crumb from '@/components/crumb'
import Channel from '@/components/channel'
import MyImage from '@/components/my-image'
export default {
  install (Vue) {
    Vue.component('Crumb', Crumb)
    Vue.component('Channel', Channel)
    Vue.component('my-image', MyImage)
  }
}
