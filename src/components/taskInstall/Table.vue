<template lang="pug">
  Table(:columns="columns" :data="list.list" stripe highlight-row)
</template>
<script>
import { mapState } from 'vuex'
import iview from 'iview'
import { EDIT, LIST, QUERY_CHANGE, DELETE_DISPATCH } from 'store/taskInstall/keys'
import extraExpand from './ExtraExpand'

export default {
  components: { extraExpand },
  computed: {
    ...mapState({
      list: ({taskInstall}) => taskInstall.list
    })
  },
  created () {
    this.$store.dispatch(LIST)
  },
  data () {
    return {
      columns: [
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
          width: '60'
        },
        {
          title: '商户名称',
          render: (h, { row }) => {
            const merchant = row.merchant
            return merchant ? <span>{merchant.name}</span> : ''
          }
        },
        {
          title: '商户编码',
          render: (h, { row }) => {
            const merchant = row.merchant
            return merchant ? <span>{merchant.code}</span> : ''
          }
        },
        {
          title: '终端编码',
          render: (h, { row }) => {
            const merchant = row.merchant
            return merchant ? <span>{merchant.machineCode}</span> : ''
          }
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '押金(元)',
          key: 'money'
        },
        {
          title: '押金类型',
          key: 'moneyType'
        },
        {
          title: '签约人',
          render: (h, { row }) => {
            const { signUser } = row
            if (signUser) {
              return <div style="margin: 4px 0">
                <div style="color: #9E9E9E">{signUser.nickname || signUser.username || ''}</div>
                <div>{signUser.mobile || ''}</div>
              </div>
            } else return ''
          }
        },
        {
          title: '设备领用人',
          render: (h, { row }) => {
            const { drawUser } = row
            if (drawUser) {
              return <div style="margin: 4px 0">
                <div style="color: #9E9E9E">{drawUser.nickname || drawUser.username || ''}</div>
                <div>{drawUser.mobile || ''}</div>
              </div>
            } else return ''
          }
        },
        {
          title: '装机人',
          render: (h, { row }) => {
            const { installUser } = row
            if (installUser) {
              return <div style="margin: 4px 0">
                <div style="color: #9E9E9E">{installUser.nickname || installUser.username || ''}</div>
                <div>{installUser.mobile || ''}</div>
              </div>
            } else return ''
          }
        },
        {
          title: '装机时间',
          width: '135',
          key: 'installTime'
        },
        {
          title: '工单状态',
          width: '130',
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
          width: 150,
          key: 'action',
          render: (h, { row }) => {
            return <div>
              <span style="margin-right:8px"><i-button type="primary" size="small" onClick={() => this.edit(row.uuid)}>编辑</i-button></span>
              <span><i-button type="error" size="small" onClick={() => this.delete(row)}>删除</i-button></span>
            </div>
          }
        }
      ]
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
          this.$store.dispatch(DELETE_DISPATCH, row.uuid)
          this.$store.dispatch(LIST)
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped module>
  .red
    color red
</style>
