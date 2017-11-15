<template lang="pug">
  .app__map
    app-market-info(:infoData="infoData" ref="info")
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { USER_LIST, MERCHANT_LIST } from 'store/map/keys'
import AppMarketInfo from './MarketInfo'
let AMap = null

const loadScript = key => new Promise((resolve, reject) => {
  const callback = `CALLBACK_${Date.now()}`
  window[callback] = () => resolve(window.AMap)
  const script = document.createElement('script')
  script.src = `//webapi.amap.com/maps?v=1.4.1&key=${key}&callback=${callback}`
  document.body.appendChild(script)
})
export default {
  components: { AppMarketInfo },
  name: 'app__map',
  data () {
    return {
      map: null,
      infoData: {},
      personMarkers: [],
      merchantMarkers: []
    }
  },
  computed: {
    ...mapState({
      personList: ({map}) => map.userList,
      merchantList: ({map}) => map.merchantList
    })
  },
  methods: {
    async init () {
      AMap = await loadScript('f88c5e8571e8f0964f2f3e0ced1b0c74')
      this.map = new AMap.Map(this.$el, {resizeEnable: true, zoom: 12, doubleClickZoom: false, center: [102.711564, 25.037576]})
      this.map.setStatus({ scrollWheel: true })
      this.map.setMapStyle('amap://styles/blue')
      this.map.plugin(['AMap.TooBar'], () => {
        this.map.addControl(new AMap.ToolBar({ offset: new AMap.Pixel(0, 100), position: 'RB', liteStyle: true }))
      })
    },
    // 渲染人物 marker
    renderPersonMarker () {
      // 从地图上移除marker
      _.forEach(this.personMarkers, marker => marker.setMap(null))

      this.personMarkers = _.map(this.personList, (arg) => {
        const icon = '/static/images/map_point.png'
        let { coordinates } = arg.position
        return this.createMarker({ position: coordinates, extData: { type: 'person', data: arg }, icon })
      })
    },
    // 渲染商户 marker
    renderMerchantMarker () {
      // 从地图上移除 marker
      _.forEach(this.merchantMarkers, marker => {
        marker.setMap(null)
      })

      this.merchantMarkers = _.map(this.merchantList, (merchant) => {
        const icon = '/static/images/house.png'
        let { coordinates } = merchant.locationInfo
        return this.createMarker({ position: coordinates, extData: { type: 'merchant', data: merchant }, icon })
      })
    },
    createMarker ({ position = [0, 0], extData, icon }) {
      const marker = new AMap.Marker({
        map: this.map,
        position: position,
        icon: new AMap.Icon({ image: icon }),
        extData
      })
      AMap.event.addListener(marker, 'click', () => {
        this.infoData = marker.getExtData() || {}
        this.$store.commit('map/info/data', this.infoData)
        this.$nextTick(() => {
          this.createInfoWindow().open(this.map, marker.getPosition())
        })
      })
      return marker
    },
    createInfoWindow () {
      let infoWindow = new AMap.InfoWindow({
        isCustom: false,
        content: this.$refs.info.$el,
        offset: new AMap.Pixel(5, -20),
        autoMove: true,
        closeWhenClickMap: true
      })
      return infoWindow
    },
    // 异步调用防止阻塞
    async fetchPerson () {
      await this.$store.dispatch(USER_LIST)
      this.renderPersonMarker()
      setTimeout(() => this.fetchPerson(), 5000)
    },
    async fetchMerchant () {
      await this.$store.dispatch(MERCHANT_LIST)
      this.renderMerchantMarker()
    }
  },
  async mounted () {
    await this.init()
    this.fetchPerson()
    this.fetchMerchant()
  }
}
</script>
