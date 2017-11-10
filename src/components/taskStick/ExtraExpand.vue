<template lang="pug">
  .extra
    .content
      Row(class="expand-row")
        Col(span="12")
          span(class="expand-key") 商户地址：
          span(class="expand-value") {{ row.merchant.address }}
        Col(span="12")
          span(class="expand-key") 商户联系人：
          span(class="expand-value") {{ row.merchant.linkerName }} - {{ row.merchant.linkerMobile }}
      Row(class="expand-row")
        Col(span="24")
          span(class="expand-key") 备注: 
          span(class="expand-value") {{ row.remark || '' }}
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>

<style lang="stylus" scoped>
  .ivu-row
    margin-bottom: 10px
</style>
