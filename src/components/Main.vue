<template lang="pug">
#app
  AppHeader
  .layout
    Menu(@on-select="menuChange", :active-name="$router.name", :theme="theme" :width="this.menuWidth")
      Menu-item(name="company")
        Icon(type="ios-home-outline")
        | 商户管理
      Submenu(name="task")
        template(slot="title")
          Icon(type="ios-paper")
          | 任务管理
        Menu-item(name="task-new")
          Icon(type="checkmark")
          | 新装工单
        Menu-item(name="task-old")
          Icon(type="checkmark-circled")
          | 维护工单
      Menu-item(name="user")
        Icon(type="person-stalker")
        | 用户管理
      Menu-item(name="map")
        Icon(type="ios-location-outline")
        | 位置信息
      Menu-item(name="note")
        Icon(type="android-notifications")
        | 公告管理
      Menu-item(name="sign")
        Icon(type="android-alarm-clock")
        | 签到管理
      .log-out
        Button(type="primary" @click="logout" long icon="log-out") 退出登录
    router-view.container
</template>

<script>
import AppHeader from './App'
import { LOGO_OUT } from 'store/auth/keys'

export default {
  components: { AppHeader },
  data () {
    return {
      theme: 'dark',
      menuWidth: '150px'
    }
  },
  methods: {
    menuChange (name) {
      this.$router.push({ name })
    },
    logout () {
      this.$store.dispatch(LOGO_OUT)
      window.location.href = `${window.location.origin}/auth.html`
    }
  }
}
</script>

<style lang="stylus">
@import './base/main'
</style>

