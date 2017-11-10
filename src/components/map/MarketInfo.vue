<template lang="pug">
  component(:is="content")
</template>
<script>
import { mapState } from 'vuex'
import AppMarketInfoPerson from './MarketInfoPerson'
import AppMarketInfoMerchant from './MarketInfoMerchant'
export default {
  components: { AppMarketInfoPerson, AppMarketInfoMerchant },
  computed: {
    ...mapState({
      infoData: ({map}) => map.infoData
    }),
    content () {
      if (this.infoData.type === 'person') {
        return 'AppMarketInfoPerson'
      }
      if (this.infoData.type === 'merchant') {
        return 'AppMarketInfoMerchant'
      }
    }
  }
}
</script>

