<template lang="pug">
  Modal(
    :value="show",
    :title="title",
    :closable="false",
    :mask-closable="false",
    :styles="style")
    AppModalBody
    AppModalFooter(slot="footer")
</template>

<script>
  import AppModalBody from './ModalBody'
  import AppModalFooter from './ModalFooter'
  import { mapState } from 'vuex'
  export default {
    components: { AppModalBody, AppModalFooter },
    computed: {
      ...mapState({
        show: ({ taskStick }) => taskStick.modal.form,
        isEdit: ({ taskStick }) => taskStick.isEdit
      }),
      title () {
        return this.isEdit ? '编辑维护工单' : '创建维护工单'
      },
      style () {
        return {
          top: '32px',
          marginBottom: '32px'
        }
      }
    }
  }
</script>
