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
      Input(:value="changedMerchant.machineCode" readonly)
    Form-item(label="发布时间")
      Date-picker(
        v-model="form.issueTime",
        @on-change="e => change('issueTime', e)",
        type="datetime",
        placement="top",
        placeholder="请选择发布时间"
        format="yyyy-MM-dd HH:mm",
        :clearable="false",
        :editable="false")
    Form-item(label="维护类型")
      Input(:value="form.type", @on-change="value => change('type', value.target.value)" placeholder="请输入维护类型", )
    Form-item(label="维护人")
      Select(
        v-model="form.serverMobile",
        filterable,
        remote,
        :remote-method="remoteQueryUser",
        :loading="loading",
        placeholder="请维护人电话",
        @on-change="e => change('serverMobile', e)")
          Option(v-for="user in remoteQueryUserResult", :value="user.mobile", :key="user.uuid") {{user.mobile}} - {{user.username}} - {{ user.nickname }}
    Form-item(label="维护时间")
      Date-picker(
        v-model="form.serverTime",
        @on-change="e => change('serverTime', e)",
        type="datetime",
        placement="top",
        placeholder="请选择维护时间"
        format="yyyy-MM-dd HH:mm",
        :clearable="false",
        :editable="false")
    Form-item(label="备注")
      Input(:value="form.remark", @on-change="value => change('remark', value.target.value)" :rows="5" type="textarea", placeholder="请输入问题描述")
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
  import { FORM_CHANGE } from 'store/taskStick/keys'
  import { REMOTE_QUERY } from 'store/merchant/keys'
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
        form: ({ taskStick }) => taskStick.form,
        isEdit: ({ taskStick }) => taskStick.isEdit,
        loading: ({ taskStick }) => taskStick.loading.edit,
        remoteQueryResult: ({ merchant }) => merchant.remoteQueryResult,
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
