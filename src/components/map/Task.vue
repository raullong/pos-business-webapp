<template lang="pug">
  .appoint(v-if="appointDisplay")
    .title 派任务

</template>

<script>
  import { mapState } from 'vuex'
  // import XDate from 'xdate'
  import _ from 'lodash'

  export default {
    computed: {
      ...mapState({
        taskDisplay: ({map}) => map.appointDisplay,
        taskBtnDisplay: ({map}) => map.appointBtnDisplay,
      })
    }
  }
</script>

<style lang="stylus">
  @import './style/appoint'
</style>
