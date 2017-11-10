<template lang="pug">
  Table(:columns="columns" :data="list.list")
</template>

<script>
import { mapState } from 'vuex'
import { EDIT, LIST } from 'store/merchant/keys'

export default {
  computed: {
    ...mapState({
      list: ({ merchant }) => merchant.list
    }),
    columns () {
      const columns = [
        {
          title: '序号',
          type: 'index',
          width: 80
        },
        {
          title: '商户名称',
          key: 'name',
          width: '160px'
        },
        {
          title: '商户编码',
          key: 'code'
        },
        {
          title: '终端编码',
          key: 'machineCode'
        },
        {
          title: '商户地址',
          key: 'address'
        },
        {
          title: '联系人',
          key: 'linkerName',
          render: (h, { row }) => {
            return <div style="margin: 4px 0">
              <div style="color: #9E9E9E">{row.linkerName || ''}</div>
              <div>{row.linkerMobile || ''}</div>
            </div>
          }
        },
        {
          title: '状态',
          filters: [
            { label: '正常', value: 1 },
            { label: '注销', value: 0 }
          ],
          filterRemote: value => this.$store.dispatch('merchant/query/change', { key: 'status', value: value.join(',') }),
          render: (h, { row }) => {
            const color = row.status === 1 ? 'green' : 'red'
            const text = row.status === 1 ? '正常' : '注销'
            return <tag type="dot" color={color}>{ text }</tag>
          }
        },
        {
          title: '创建人',
          render: (h, { row }) => {
            const { createUser } = row
            if (createUser) {
              return <div style="margin: 4px 0">
                <div style="color: #9E9E9E">{createUser.username || ''}</div>
                <div>{createUser.mobile || ''}</div>
              </div>
            } else return ''
          }
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          width: 80,
          render: (h, { row }) => {
            return <div>
              <span style="margin-right:8px"><i-button type="primary" size="small" onClick={() => this.edit(row.uuid)}>编辑</i-button></span>
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
    }
  },
  created () {
    this.$store.dispatch(LIST)
  }
}
</script>

