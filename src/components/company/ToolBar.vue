<template lang="pug">
.toolbar
  Row(type="flex")
    Col(:span="10")
      Form(:label-width="100")
        Form-item(label="综合查询")
          Input(placeholder="请输入查询" icon="ios-search-strong" v-model="searchKey" @on-enter="search")
            Button(slot="append" @click="search") 查询
    Col(:span="14")
      Form(:label-width="120")
        Form-item(style="text-align:right")
          Button(type="primary" @click="open" style="margin-left:8px") 创建商户
          Button(type="ghost" @click="refresh" style="margin-left:8px") 刷新
</template>

<script>
import { QUERY_CHANGE, MODAL } from 'store/company/keys'
export default {
  data () {
    return {
      searchKey: ''
    }
  },
  methods: {
    search () {
      this.$store.dispatch(QUERY_CHANGE, { key: 'searchKey', value: this.searchKey })
    },
    open () {
      this.$store.commit(MODAL, { name: 'form', show: true })
    },
    refresh () {
      this.searchKey = ''
      this.$store.dispatch(QUERY_CHANGE, { key: 'searchKey', value: '' })
    }
  }
}
</script>

