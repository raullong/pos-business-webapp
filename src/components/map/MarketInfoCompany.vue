<template lang="pug">
  .content
    .title
      span 商户信息 
    .market-info-person
      .name(style="font-size:15px") 商户名称： {{ info.name }}
      .mobile(style="font-size:15px;margin-top:6px") 联系电话： {{ info.linkerMobile }}
      .username(style="font-size:15px;margin-top:6px") 联系人： {{ info.linkerName }}
      .code(style="font-size:15px;margin-top:6px") 商户编码：{{ info.code }}
      .address(style="font-size:15px;margin-top:6px") 商户地址：{{ info.address}}
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
@import './style/companyInfo'
</style>
