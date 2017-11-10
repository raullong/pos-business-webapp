<template lang="pug">
  .user
    Table(:columns="columns" :data="users.list")
</template>
<script>
import { mapState } from 'vuex'
import iview from 'iview'
import { QUERY_CHANGE, LIST, USER_TYPES, EDIT, USER_RESET_PASSWORD } from 'store/user/keys'
import _ from 'lodash'

export default {
  computed: {
    ...mapState({
      users: ({user}) => user.list,
      userTypes: ({ user }) => user.userTypes
    }),
    columns () {
      const columns = [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '明星员工',
          key: 'superStar',
          width: 120,
          align: 'center',
          filters: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ],
          filterRemote: value => this.$store.dispatch(QUERY_CHANGE, { key: 'superStar', value: value.join(',') }),
          render: (h, { row }) => {
            const color = row.superStar === 0 ? '#ece9e9' : 'red'
            return <icon type="star" color={color} size="18"></icon>
          }
        },
        {
          title: '用户姓名',
          key: 'username'
        },
        {
          title: '手机号码',
          key: 'mobile'
        },
        {
          title: '用户昵称',
          key: 'nickname'
        },
        {
          title: '用户状态',
          width: 120,
          align: 'center',
          filters: [
            { label: '注销', value: 0 },
            { label: '正常', value: 1 }
          ],
          filterRemote: value => this.$store.dispatch(QUERY_CHANGE, { key: 'status', value: value.join(',') }),
          render: (h, { row }) => {
            const color = row.status === 1 ? 'green' : 'red'
            const text = row.status === 1 ? '正常' : '注销'
            return <tag type="dot" color={color}>{ text }</tag>
          }
        },
        {
          title: '用户类型',
          filters: [],
          filterRemote: value => this.$store.dispatch(QUERY_CHANGE, { key: 'type', value: value.join(',') }),
          render: (h, { row }) => {
            return <span>{ row.userType }</span>
          }
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '操作',
          align: 'center',
          render: (h, { row }) => {
            return <div style="margin: 4px 0">
              <i-button style="margin-right: 5px" size="small" type="primary" onClick={() => this.edit(row.uuid)}>编辑</i-button>
              <i-button size="small" onClick={() => this.resetPassword(row.uuid)}>重置密码</i-button>
            </div>
          }
        }
      ]
      columns[6].filters = this.filterUserType
      return columns
    },
    filterUserType () {
      let types = []
      _.forEach(this.userTypes, function (element) {
        types.push({ label: element.value, value: element.key })
      })
      return types
    }
  },
  created () {
    this.$store.dispatch(LIST)
    this.$store.dispatch(USER_TYPES)
  },
  methods: {
    edit (uuid) {
      this.$store.dispatch(EDIT, uuid)
    },
    resetPassword (uuid) {
      iview.Modal.confirm({
        title: '重置密码',
        content: `<p>确认要重置密码吗？</p>`,
        onOk: () => {
          this.$store.dispatch(USER_RESET_PASSWORD, uuid)
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

