<template lang="pug">
  Table(:columns="columns")
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: '序号',
          type: 'index'
        },
        {
          title: '签到人',
          key: ''
        },
        {
          title: '签到时间',
          key: ''
        },
        {
          title: '签到地址',
          key: ''
        },
        {
          title: '签到情况',
          render: (h, { row }) => {

          }
        }
      ]
    }
  }
}
</script>

