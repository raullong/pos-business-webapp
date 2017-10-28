<template lang="pug">
  .toolBar
    Row()
      Col(:span="12")
        Form(:label-width="80" :model="query")
          Form-item(label="综合查询：")
            Input(placeholder="请输入姓名、电话模糊查询",  v-model="query.searchKey", @on-enter="search")
              Button(slot="append" @click="search") 查询
      Col(:span="12")
        Form(:label-wodth="100")
          Form-item(style="text-align:right")
            Button(type="primary" @click="open" style="margin-left:15px") 创建用户
            Button(type="ghost" @click="clear" style="margin-left:15px") 刷新
</template>
<script>
import { mapState } from 'vuex'
import { QUERY_CHANGE, MODAL, LIST } from 'store/user/keys'

export default {
  computed: {
    ...mapState({
      query: ({user}) => user.query
    })
  },
  methods: {
    search () {
      this.$store.dispatch(QUERY_CHANGE, { key: this.searchKey, value: this.searchKey })
    },
    open () {
      this.$store.commit(MODAL, { name: 'form', show: true })
    },
    clear () {
      this.$store.commit(QUERY_CHANGE, { key: this.searchKey, value: '' })
      this.$store.dispatch(LIST)
    }
  }
}
</script>
