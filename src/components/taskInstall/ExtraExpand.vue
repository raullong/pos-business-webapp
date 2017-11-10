<template lang="pug">
  .extra
    .content
      Row(class="expand-row")
        Col(span="6")
          span(class="expand-key") 签约人: 
          span(class="expand-value") {{ anysaleUser(row.signUser) }}
        Col(span="6")
          span(class="expand-key") 设备领用人: 
          span(class="expand-value") {{ anysaleUser(row.drawUser) }}
        Col(span="6")
          span(class="expand-key") 安装人: 
          span(class="expand-value") {{ anysaleUser(row.installUser) }}
        Col(span="6")
          span(class="expand-key") 创建人: 
          span(class="expand-value") {{ anysaleUser(row.createUser) }}
      Row(class="expand-row")
        Col(span="6")
          span(class="expand-key") 商户编码:
          span(class="expand-value") {{ row.merchant.code }}
        Col(span="6")
          span(class="expand-key") 商户联系人：
          span(class="expand-value") {{ row.merchant.linkerName }} - {{ row.merchant.linkerMobile }}
      Row(class="expand-row")
        Col(span="24")
          span(class="expand-key") 商户地址：
          span(class="expand-value") {{ row.merchant.address }}
      Row(class="expand-row")
        Col(span="24")
          span(class="expand-key") 备注：
          span(class="expand-value") {{ row.remark || '' }}
</template>
<script>
export default {
  props: {
    row: Object
  },
  methods: {
    anysaleUser (user) {
      return user ? ((user.nickname ? user.nickname : user.username) + ' - ' + user.mobile) : ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .ivu-row
    margin-bottom: 10px
    .expand-key
      font-weight: bold
      margin-right: 5px
</style>
