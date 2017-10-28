<template lang="pug">
  .option-r
    Button-group(vertical)
      Button(@click="optionTask()")
        span 派任务
      Button(@click="optionTaskList()")
        span 任务列表
</template>

<script>
  import { mapMutations } from 'vuex'
  import { TASK_DISPLAY, TASK_LIST_DISPLAY } from 'store/map/keys'

  export default {
    methods: {
      ...mapMutations({ TASK_DISPLAY, TASK_LIST_DISPLAY }),
      optionTask () {
        this.TASK_DISPLAY()
      },
      optionTaskList () {
        this.TASK_LIST_DISPLAY()
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import './style/optionR'
</style>

