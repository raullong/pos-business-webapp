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
        show: ({ company }) => company.modal.form,
        isEdit: ({ company }) => company.isEdit
      }),
      title () {
        return this.isEdit ? '编辑商户' : '创建商户'
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
