<template lang="pug">
  .toolBar
    Row()
      Col(:span="12")
        Form(:label-width="80" :model="query")
          Form-item(label="综合查询：")
            Input(placeholder="请输入内容、内容拼音、创建人模糊查询",  v-model="query.searchKey", @on-enter="search", icon="ios-search-strong")
      Col(:span="12")
        Form(:label-width="100")
          Form-item(style="text-align:right")
            Button(type="primary" @click="search") 查询
            Button(type="primary" @click="open" style="margin-left:15px") 创建公告
            Button(type="ghost" @click="clear" style="margin-left:15px") 刷新
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchKey: ''
    }
  },
  computed: {
    ...mapState({
      query: ({note}) => note.query
    })
  },
  methods: {
    search () {
      this.$store.dispatch('note/query/change', { key: this.searchKey, value: this.searchKey })
    },
    open () {
      this.$store.commit('note/modal', { name: 'form', show: true })
    },
    clear () {
      this.query.searchKey = ''
      this.query.page = 1
      this.$store.dispatch('note/list')
    }
  }
}
</script>
