<template lang="pug">
  .app
    Row
      Col(span="18")
        .logo__title POS商户业务管理系统
      Col(:span="6" style="text-align:right") 
        .pro__user 当前用户: {{ user.nickname || user.username }}
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: ({auth}) => auth.profile
    })
  }
}
</script>

<style lang="stylus" scoped>
  .app
    height: 70px
    background-color: #124971
    color: #fff
    font-weight: bold
    line-height: 70px;
    .logo__title
      font-size: 30px
      margin-left: 20px
    .pro__user
      font-size: 14px
      margin-right 20px
</style>
