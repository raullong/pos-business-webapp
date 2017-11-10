<template lang="pug">
  .extra
    .content
      span(style="font-weight: bold; margin-bottom: 1px") 设备信息
      Table(:columns="columns" :data="list" size="small" highlight-row)
</template>
<script>
export default {
  props: {
    machine: Object
  },
  computed: {
    columns () {
      const columns = [
        {
          title: '设备名称',
          key: 'name'
        },
        {
          title: '设备编号',
          key: 'code'
        },
        {
          title: '设备终端号',
          key: 'terminalNumber'
        },
        {
          title: '设备型号',
          key: 'type'
        },
        {
          title: '设备创建人',
          key: ''
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '备注信息',
          key: 'remark'
        }
      ]
      return columns
    },
    list () {
      const args = []
      args.push(this.machine)
      return args
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './style/expand'
</style>
