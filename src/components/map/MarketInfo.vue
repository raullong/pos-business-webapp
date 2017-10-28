<template lang="pug">
  component(:is="content")
</template>
<script>
import { mapState } from 'vuex'
import AppMarketInfoPerson from './MarketInfoPerson'
import AppMarketInfoCompany from './MarketInfoCompany'
export default {
  components: { AppMarketInfoPerson, AppMarketInfoCompany },
  computed: {
    ...mapState({
      infoData: ({map}) => map.infoData
    }),
    content () {
      if (this.infoData.type === 'person') {
        return 'AppMarketInfoPerson'
      }
      if (this.infoData.type === 'company') {
        return 'AppMarketInfoCompany'
      }
    }
  }
}
</script>

