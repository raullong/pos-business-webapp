import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
Vue.use(Router)

const routers = new Router({
  mode: 'history',
  base: '/app',
  routes: [
    { path: '/', name: 'merchant', component: resolve => require(['@/components/merchant/View'], resolve) },
    { path: '/user', name: 'user', component: resolve => require(['@/components/user/View'], resolve) },
    { path: '/map', name: 'map', component: resolve => require(['@/components/map/View'], resolve) },
    { path: '/taskInstall', name: 'taskInstall', component: resolve => require(['@/components/taskInstall/View'], resolve) },
    { path: '/note', name: 'note', component: resolve => require(['@/components/note/View'], resolve) },
    { path: '/taskStick', name: 'taskStick', component: resolve => require(['@/components/taskStick/View'], resolve) },
    { path: '/sign', name: 'sign', component: resolve => require(['@/components/sign/View'], resolve) }
  ]
})

routers.beforeEach((to, from, next) => {
  iview.LoadingBar.start()
  next()
})
routers.afterEach((to, from, next) => {
  iview.LoadingBar.finish()
})

export default routers
