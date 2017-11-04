<template lang="pug">
  Form(:label-width="72")
    Spin(v-if="loading", fix)
    Form-item(label="用户电话")
      Input(:value="form.mobile", @on-change="e => change('mobile', e.target.value)")
    Form-item(label="用户姓名")
      Input(:value="form.username", @on-change="e => change('username', e.target.value)")
    Form-item(label="用户昵称")
      Input(:value="form.nickname", @on-change="e => change('nickname', e.target.value)")
    Form-item(label="密码")
      Input(type="password", :value="form.password", @on-change="e => change('password', e.target.value)", :disabled="isEdit")
    Form-item(label="用户类型")
      Select(
        :model="form.type",
        filterable,
        @on-change="value => change('type', value)",
        clearable)
        Option(v-for="item in userTypes", :value="item.key", :key="item.id") {{item.value}}
    Form-item(label="状态")
      RadioGroup(v-model="form.status")
        Radio(label="0") 注销
        Radio(label="1") 正常
    Form-item(label="明星员工")
      RadioGroup(v-model="form.superStar")
        Radio(label="0") 否
        Radio(label="1") 是
</template>
<script>
  import { mapState } from 'vuex'
  import { FORM_CHANGE } from 'store/user/keys'
  export default {
    computed: {
      ...mapState({
        form: ({ user }) => user.form,
        isEdit: ({ user }) => user.isEdit,
        loading: ({ user }) => user.loading.edit,
        userTypes: ({ user }) => user.userTypes
      })
    },
    methods: {
      change (key, value) {
        this.$store.commit(FORM_CHANGE, { key, value })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import './style/modal-body'
</style>
