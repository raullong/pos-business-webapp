<template lang="pug">
  Form(:label-width="72" :model="form")
    Spin(v-if="loading", fix)
    Form-item(label="商户名称")
      Select(
        v-model="form.merchantName",
        filterable,
        remote,
        :remote-method="remoteQueryMerchant",
        :loading="loading", placeholder="请输商户名称",
        @on-change="e => change('merchantName', e)")
          Option(v-for="item in remoteQueryResult", :value="item.name", :key="item.uuid") {{item.name}}
    Form-item(label="商户编码")
      Input(:value="changedMerchant.code" readonly)
    Form-item(label="终端编码")
      Input(:value="form.machineCode", v-model="form.machineCode", @on-change="e => change('machineCode', e.target.value)")
    Form-item(label="类型")
      Input(placeholder="请输入类型", v-model="form.type", @on-change="e => change('type', e.target.value)")
    Form-item(label="押金")
      Input(placeholder="请输入押金" v-model="form.money", @on-change="e => change('money', e.target.value)")
        Span(slot="append") 元
    Form-item(label="通讯费")
      Input(placeholder="请输入通讯费", v-model="form.messageMoney", @on-change="e => change('messageMoney', e.target.value)")
        Span(slot="append") 元
    Form-item(label="签约人")
      Select(
        v-model="form.signUserMobile",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入签约人电话",
        @on-change="e => change('signUserMobile', e)")
          Option(v-for="user in remoteQueryUserResult", :value="user.mobile", :key="user.uuid") {{user.mobile}} - {{user.username}}
    Form-item(label="设备领用人")
      Select(
        v-model="form.drawUserMobile",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入机具领用人电话",
        @on-change="e => change('drawUserMobile', e)")
          Option(v-for="user in remoteQueryUserResult", :value="user.mobile", :key="user.uuid") {{user.mobile}} - {{user.username}}
    Form-item(label="装机人")
      Select(
        v-model="form.installUserMobile",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请输入装机人电话",
        @on-change="e => change('installUserMobile', e)")
          Option(v-for="user in remoteQueryUserResult", :value="user.mobile", :key="user.uuid")  {{user.mobile}} - {{user.username}}
    Form-item(label="装机时间")
      Date-picker(
        v-model="form.installTime",
        @on-change="e => change('installTime', e)",
        type="datetime",
        placement="top",
        placeholder="选择装机时间"
        format="yyyy-MM-dd HH:mm",
        :clearable="false",
        :editable="false")
    Form-item(label="备注")
      Input(:value="form.remark", @on-change="value => change('remark', value.target.value)" :rows="5" type="textarea", placeholder="请输入备注内容")
    Form-item(label="状态")
      RadioGroup(v-model="form.status")
        Radio(label="0") 未派发
        Radio(label="1") 已派发
        Radio(label="2") 进行中
        Radio(label="3") 已完成
        Radio(label="-1") 未完成
</template>
<script>
  import { mapState } from 'vuex'
  import { FORM_CHANGE } from 'store/taskInstall/keys'
  import { REMOTE_QUERY } from 'store/company/keys'
  import { USER_REMOTE_QUERY } from 'store/user/keys'
  import _ from 'lodash'

  export default {
    data () {
      return {
        changedMerchant: {}
      }
    },
    computed: {
      ...mapState({
        form: ({ taskInstall }) => taskInstall.form,
        isEdit: ({ taskInstall }) => taskInstall.isEdit,
        loading: ({ taskInstall }) => taskInstall.loading.edit,
        remoteQueryResult: ({ company }) => company.remoteQueryResult,
        remoteQueryUserResult: ({ user }) => user.remoteQueryUserResult
      })
    },
    methods: {
      change (key, value) {
        if (key === 'merchantName') {
          let temp = _.find(this.remoteQueryResult, function (arg) {
            return arg.name === value
          })
          this.changedMerchant = { ...temp }
        }
        this.$store.commit(FORM_CHANGE, { key, value })
      },
      // 商户搜索
      remoteQueryMerchant (name) {
        if (name !== '') {
          this.$store.dispatch(REMOTE_QUERY, name)
        }
      },
      // 用户搜索
      async remoteQueryUser (mobile) {
        if (mobile !== '') {
          this.$store.dispatch(USER_REMOTE_QUERY, mobile)
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>
