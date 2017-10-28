<template lang="pug">
  div
    app-extra-expand(:machine="row.machine")
</template>
<script>
import AppExtraExpand from './ExtraExpand'
export default {
  props: ['row'],
  components: { AppExtraExpand }
}
</script>

<style lang="stylus" scoped>
@import './style/expand'
</style>
