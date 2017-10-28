<template lang="pug">
  .company-page
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
import { QUERY_CHANGE } from 'store/company/keys'
export default {
  computed: {
    ...mapState({
      list: ({company}) => company.list
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>
