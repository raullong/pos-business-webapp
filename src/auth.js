import Vue from 'vue'
import iView from 'iview'
import Auth from '@/components/auth/View'

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Auth)
})
