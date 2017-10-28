<template lang="pug">
  .table
    Table(:columns="columns" :data="note")
</template>
<script>
import { mapState } from 'vuex'
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
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '公告类型',
          key: 'type'
        },
        {
          title: '紧急程度',
          render: (h, { row }) => {
            const color = row.flag === 1 ? 'red' : 'blue'
            const text = row.flag === 1 ? '紧急' : '一般'
            return <tag type="dot" color={color}>{ text }</tag>
          }
        },
        {
          title: '所属单位',
          align: 'center',
          render: (h, { row }) => {
            const user = row.user
            return <span>{user.company}</span>
          }
        },
        {
          title: '创建人',
          align: 'center',
          render: (h, { row }) => {
            return <span>{ row.user.username }</span>
          }
        },
        {
          title: '操作',
          width: 80,
          render: (h, { row }) => {
            return <i-button type="error" size="small">删除</i-button>
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
  created () {
    this.$store.dispatch('note/list')
  }
}
</script>

