<template lang="pug">
  .dispatch-page
    Page(
      show-sizer,
      show-total,
      :total="total",
      :current="page",
      :page-size="size",
      placement="top",
      @on-change="page => queryChange('page', page)"
      @on-page-size-change="size => queryChange('size', size)")
</template>
<script>
import { mapState } from 'vuex'
import { QUERY_CHANGE } from 'store/sign/keys'
export default {
  computed: {
    ...mapState({
      page: ({sign}) => sign.query.page,
      size: ({sign}) => sign.query.size,
      total: ({sign}) => sign.total
    })
  },
  methods: {
    queryChange (key, value) {
      this.$store.dispatch(QUERY_CHANGE, { key, value })
    }
  }
}
</script>

