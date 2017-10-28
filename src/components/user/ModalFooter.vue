<template lang="pug">
  .footer
    Button(@click="close", :disabled="loading") 取消
    Button(type="primary", @click="sure", :loading="loading") {{ sureName }}
</template>

<script>
  import { mapState } from 'vuex'
  import { MODAL, CREATE, SAVE } from 'store/user/keys'

  export default {
    computed: {
      ...mapState({
        loading: ({ user }) => user.loading.create,
        isEdit: ({ user }) => user.isEdit
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
