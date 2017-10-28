<template lang="pug">
  .view
    app-map(style="padding:0")
    app-option-r
</template>
<script>
import AppMap from './Map'
import AppOptionR from './OptionR'
export default {
  components: { AppMap, AppOptionR }
}
</script>

<style lang="stylus" scoped>
  .container
    padding: 0px
</style>

