<template lang="pug">
  .table
    Table(:columns="columns" :data="note.list")
</template>
<script>
import { mapState } from 'vuex'
import iview from 'iview'
import { QUERY_CHANGE, LIST, EDIT, DELETE_NOTE } from 'store/note/keys'

export default {
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '紧急程度',
          filters: [
            { label: '紧急', value: 1 },
            { label: '一般', value: 0 }
          ],
          filterRemote: value => this.$store.dispatch(QUERY_CHANGE, { key: 'urgency', value: value.join(',') }),
          render: (h, { row }) => {
            const color = row.urgency === 1 ? 'red' : 'blue'
            const text = row.urgency === 1 ? '紧急' : '一般'
            return <tag type="dot" color={color}>{ text }</tag>
          }
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '创建人',
          align: 'center',
          render: (h, { row }) => {
            const { createUser } = row
            return <span>{ createUser.nickname || createUser.username }</span>
          }
        },
        {
          title: '操作',
          width: 140,
          render: (h, { row }) => {
            return <div>
              <span style="margin-right:8px"><i-button size="small" type="primary" onClick={() => this.edit(row.uuid)}>编辑</i-button></span>
              <span><i-button type="error" size="small" onClick={() => this.delete(row)}>删除</i-button></span>
            </div>
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      note: ({note}) => note.list
    })
  },
  methods: {
    edit (uuid) {
      this.$store.dispatch(EDIT, uuid)
    },
    delete (row) {
      iview.Modal.confirm({
        title: '删除公告',
        content: `<p>确认删除公告吗？</p>`,
        onOk: () => {
          this.$store.dispatch(DELETE_NOTE, row.uuid)
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

