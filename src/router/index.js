import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
Vue.use(Router)

const routers = new Router({
  mode: 'history',
  base: '/app',
  routes: [
    { path: '/', name: 'company', component: resolve => require(['@/components/company/View'], resolve) },
    { path: '/user', name: 'user', component: resolve => require(['@/components/user/View'], resolve) },
    { path: '/map', name: 'map', component: resolve => require(['@/components/map/View'], resolve) },
    { path: '/task-new', name: 'task-new', component: resolve => require(['@/components/dispatch/View'], resolve) },
    { path: '/note', name: 'note', component: resolve => require(['@/components/note/View'], resolve) },
    { path: '/task-old', name: 'task-old', component: resolve => require(['@/components/taskOld/View'], resolve) },
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
