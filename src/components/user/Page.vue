<template lang="pug">
  .user-page
    Page(
      show-sizer,
      show-total,
      :total="list.totalSize",
      :current="list.curPage",
      :page-size="list.curSize",
      placement="top",
      @on-change="page => queryChange('page', page)"
      @on-page-size-change="size => queryChange('size', size)")
</template>
<script>
import { mapState } from 'vuex'
import { QUERY_CHANGE } from 'store/user/keys'
export default {
  computed: {
    ...mapState({
      list: ({user}) => user.list
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>
