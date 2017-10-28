<template lang="pug">
  .footer
    Button(@click="close", :disabled="loading") 取消
    Button(type="primary", @click="sure", :loading="loading") {{ sureName }}
</template>

<script>
  import { mapState } from 'vuex'
  import { MODAL, CREATE, SAVE } from 'store/note/keys'

  export default {
    computed: {
      ...mapState({
        loading: ({ note }) => note.loading.create,
        isEdit: ({ note }) => note.isEdit
      }),
      sureName () {
        return this.isEdit ? '修改' : '创建'
      }
    },
    methods: {
      close () {
        this.$store.commit(MODAL, { name: 'form', show: false })
      },
      sure () {
        if (this.isEdit) {
          this.$store.dispatch(SAVE)
        } else {
          this.$store.dispatch(CREATE)
        }
      }
    }
  }
</script>
