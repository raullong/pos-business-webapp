<template lang="pug">
  Table(:columns="columns" :data="list.list")
</template>

<script>
import { mapState } from 'vuex'
import iview from 'iview'
import { QUERY_CHANGE, EDIT, LIST, DELETE_TASK } from 'store/taskOld/keys'
import extraExpand from './ExtraExpand'

export default {
  components: { extraExpand },
  computed: {
    ...mapState({
      list: ({taskOld}) => taskOld.list
    }),
    columns () {
      const columns = [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(extraExpand, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '序号',
          type: 'index',
          width: 80
        },
        {
          title: '商户名称',
          width: 150,
          render: (h, { row }) => {
            const merchant = row.merchant
            return <span>{merchant.name}</span>
          }
        },
        {
          title: '商户编码',
          render: (h, { row }) => {
            const merchant = row.merchant
            return <span>{merchant.code}</span>
          }
        },
        {
          title: '终端编码',
          render: (h, { row }) => {
            const merchant = row.merchant
            return <span>{merchant.machineCode}</span>
          }
        },
        {
          title: '联系人信息',
          render: (h, { row }) => {
            const merchant = row.merchant
            return <div style="margin: 4px 0">
              <div style="color: #9E9E9E">{merchant.linkerName || ''}</div>
              <div>{merchant.linkerMobile || ''}</div>
            </div>
          }
        },
        {
          title: '维护类型',
          key: 'type'
        },
        {
          title: '维护负责人',
          render: (h, { row }) => {
            const { serverUser } = row
            return <div style="margin: 4px 0">
              <div style="color: #9E9E9E">{serverUser.nickname || serverUser.username || ''}</div>
              <div>{serverUser.mobile || ''}</div>
            </div>
          }
        },
        {
          title: '创建人',
          render: (h, { row }) => {
            const user = row.createUser
            if (user) {
              return <div style="margin: 4px 0">
                <div style="color: #9E9E9E">{user.nickname || user.username || ''}</div>
                <div>{user.mobile || ''}</div>
              </div>
            } else return ''
          }
        },
        {
          title: '完成情况',
          align: 'center',
          width: 150,
          filters: [
            { label: '未派发', value: 0 },
            { label: '已派发', value: 1 },
            { label: '进行中', value: 2 },
            { label: '已完成', value: 3 },
            { label: '未完成', value: -1 }
          ],
          filterRemote: value => this.$store.dispatch(QUERY_CHANGE, { key: 'status', value: value.join(',') }),
          render: (h, { row }) => {
            const text = {
              0: '未派发',
              1: '已派发',
              2: '进行中',
              3: '已完成',
              '-1': '未完成'
            }[row.status] || row.status
            const color = {
              0: 'yellow',
              1: 'yellow',
              2: 'blue',
              3: 'green',
              '-1': 'red'
            }[row.status] || 'yellow'
            return <tag type="dot" color={color}>{ text }</tag>
          }
        },
        {
          title: '操作',
          width: 160,
          render: (h, { row }) => {
            return <div>
              <span style="margin-right:8px"><i-button size="small" type="primary" onClick={() => this.edit(row.uuid)}>编辑</i-button></span>
              <span><i-button type="error" size="small" onClick={() => this.delete(row)}>删除</i-button></span>
            </div>
          }
        }
      ]
      return columns
    }
  },
  methods: {
    edit (uuid) {
      this.$store.dispatch(EDIT, uuid)
    },
    delete (row) {
      iview.Modal.confirm({
        title: '删除工单',
        content: `<p>确认删除工单吗？</p>`,
        onOk: () => {
          this.$store.dispatch(DELETE_TASK, row.uuid)
          this.$store.dispatch(LIST)
        },
        onCancel: () => {
        }
      })
    }
  },
  created () {
    this.$store.dispatch(LIST)
  }
}
</script>

