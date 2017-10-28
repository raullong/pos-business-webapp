<template lang="pug">
  .content
    .title
      span 个人信息 
    .market-info-person
      .alias(style="font-size:15px") 姓名： {{ info.username }}
      .mobile(style="font-size:15px;margin-top:10px") 手机号号码： {{ info.mobile }}
      .createTime(style="font-size:15px;margin-top:10px") 创建时间： {{ info.createTime }}
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      info: ({ map }) => map.infoData.data
    })
  }
}
</script>
<style lang="stylus" scoped>
@import './style/personInfo'
</style>
