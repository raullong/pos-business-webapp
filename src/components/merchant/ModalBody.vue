<template lang="pug">
  Form(:label-width="72", :model="form")
    Spin(v-if="loading", fix)
    Form-item(label="商户名称")
      Input(v-model="form.name", @on-change="({target}) => change('name', target.value)", placeholder="请输入商户名称")
    Form-item(label="商户编码")
      Input(v-model="form.code", @on-change="({target}) => change('code', target.value)", placeholder="请输入商户编码")
    Form-item(label="终端编码")
      Input(v-model="form.machineCode", @on-change="({target}) => change('machineCode', target.value)", placeholder="请输入终端编码")
    Form-item(label="联系人")
      Input(v-model="form.linkerName", @on-change="({target}) => change('linkerName', target.value)", placeholder="请输入联系人")
    Form-item(label="联系电话")
      Input(v-model="form.linkerMobile", @on-change="({target}) => change('linkerMobile', target.value)", placeholder="请输入联系电话")
    Form-item(label="商户地址")
      Select(
        :model="form.address",
        placeholder="请输入地址",
        filterable,
        remote,
        :remote-method="lazyQuery",
        :loading="queryLoading",
        @on-change="value => change('address', value)",
        clearable)
        Option(v-for="item in queryItems", :value="item", :key="item")
    Form-item(label="商户描述")
      Input(v-model="form.remark", @on-change="({target}) => change('remark', target.value)", :rows="3", type="textarea", placeholder="请输入商户描述")
    Form-item(label="商户状态")
      RadioGroup(v-model="form.status")
        Radio(label="0") 注销
        Radio(label="1") 正常
</template>

<script>
  import { mapState } from 'vuex'
  import { FORM_CHANGE } from 'store/merchant/keys'
  import _ from 'lodash'

  const loadScript = (key = '4d014a4800e8f9fc8ef524a94db2588a') => new Promise((resolve, reject) => {
    const callback = `CALLBACK_${Date.now()}`
    window[callback] = () => resolve(window.AMap)
    const script = document.createElement('script')
    script.src = `//webapi.amap.com/maps?v=1.3&key=${key}&callback=${callback}`
    document.body.appendChild(script)
  })

  const loadMod = (AMap, type, name, options = {}) => new Promise((resolve, reject) => {
    const callback = () => resolve(new AMap[name](options))
    type ? AMap[type]('AMap.' + name, callback) : callback()
  })

  const exec = function (method, ...args) {
    return new Promise((resolve, reject) => method.apply(this, [...args, (status, result) => {
      if (_.isObject(status)) return reject(status)
      if (status === null) return resolve(result)
      switch (status) {
        case 'complete':
          resolve(result)
          break
        case 'no_data':
          reject(new Error('没有数据'))
          break
        case 'error':
          reject(new Error('未知错误'))
      }
    }]))
  }

  export default {
    data () {
      return {
        _Autocomplete: null,
        queryLoading: false,
        queryResult: [],
        location: {}
      }
    },
    computed: {
      ...mapState({
        form: ({ merchant }) => merchant.form,
        isEdit: ({ merchant }) => merchant.isEdit,
        loading: ({ merchant }) => merchant.loading.edit
      }),
      queryItems () {
        return _.chain(this.queryResult).map(item => item.name).value()
      }
    },
    methods: {
      change (key, value) {
        if (key === 'address') {
          const item = (_.chain(this.queryResult).filter(item => item.name === value).value() || [])[0]
          const { district, name, location } = item
          const { lat, lng } = location || {}
          let address = (district || '') + (name || '')
          let locationInfo = { lat: lat, lng: lng, address: address }
          this.queryResult = []

          this.$store.commit(FORM_CHANGE, { key: 'address', value: address })
          this.$store.commit(FORM_CHANGE, { key: 'locationInfo', value: locationInfo })
        } else {
          this.$store.commit(FORM_CHANGE, { key: key, value: value })
        }
      },
      lazyQuery: _.debounce(function (keyword) { this.query(keyword) }, 300),
      async query (keyword) {
        if (!_.trim(keyword)) {
          this.queryResult = []
          return
        }
        if (keyword === this.form.address) {
          return
        }
        this.queryLoading = true
        const { _Autocomplete } = this
        try {
          const result = await exec.call(_Autocomplete, _Autocomplete.search, keyword)
          this.queryResult = _.chain(result.tips).filter(item => item.location).value()
        } catch (error) {
          this.queryResult = []
        } finally {
          this.queryLoading = false
        }
      }
    },
    async beforeMount () {
      const AMap = await loadScript()
      this._Autocomplete = await loadMod(AMap, 'plugin', 'Autocomplete', { city: '昆明' })
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>
