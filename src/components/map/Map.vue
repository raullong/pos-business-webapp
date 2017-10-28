<template lang="pug">
  .map
    .wrap(style="display:none;")
      app-market-info(:infoData="infoData" ref="info")
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { MAP_LIST, COMPANY_LIST } from 'store/map/keys'
import AppMarketInfo from './MarketInfo'
let AMap = null

const loadScript = key => new Promise((resolve, reject) => {
  const callback = `CALLBACK_${Date.now()}`
  window[callback] = () => resolve(window.AMap)
  const script = document.createElement('script')
  script.src = `//webapi.amap.com/maps?v=1.3&key=${key}&callback=${callback}`
  document.body.appendChild(script)
})
export default {
  components: { AppMarketInfo },
  name: 'map',
  data () {
    return {
      map: null,
      infoData: {},
      personMarkers: [],
      companyMarkers: []
    }
  },
  computed: {
    ...mapState({
      personList: ({map}) => map.list,
      companyList: ({map}) => map.companyList
    })
  },
  methods: {
    async init () {
      AMap = await loadScript('f88c5e8571e8f0964f2f3e0ced1b0c74')
      this.map = new AMap.Map(this.$el, {resizeEnable: true, zoom: 6, doubleClickZoom: false})
      this.map.setCity('昆明')
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
        return this.createMarker({ position: arg.position, extData: { type: 'person', data: arg }, icon })
      })
    },
    // 渲染商户 marker
    renderCompanyMarker () {
      // 从地图上移除 marker
      _.forEach(this.companyMarkers, marker => {
        marker.setMap(null)
      })

      this.companyMarkers = _.map(this.companyList, (company) => {
        const icon = '/static/images/house.png'
        return this.createMarker({ position: company.locationInfo, extData: { type: 'company', data: company }, icon })
      })
    },
    createMarker ({ position = {}, extData, icon }) {
      const { lng, lat } = position
      const marker = new AMap.Marker({
        map: this.map,
        position: [lng || 0, lat || 0],
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
      await this.$store.dispatch(MAP_LIST)
      this.renderPersonMarker()
      setTimeout(() => this.fetchPerson(), 2000)
    },
    async fetchCompany () {
      await this.$store.dispatch(COMPANY_LIST)
      this.renderCompanyMarker()
    }
  },
  async mounted () {
    await this.init()
    this.fetchPerson()
    this.fetchCompany()
  }
}
</script>
<style lang="stylus" scoped>
@import './style/map'
</style>
