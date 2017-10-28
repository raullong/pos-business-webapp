import { LIST, QUERY_CHANGE, CREATE, MODAL, EDIT, SAVE, MODIFY, USER_REMOTE_QUERY, USER_TYPES, USER_RESET_PASSWORD } from './keys'

import * as api from 'api/user'
import iview from 'iview'

export default {
  async [LIST] ({ state, commit }) {
    try {
      commit(LIST, await api.list(state.query))
    } catch ({ message }) {
      iview.Message.error(message)
    }
  },
  [QUERY_CHANGE] ({ commit, dispatch }, payload) {
    commit(QUERY_CHANGE, payload)
    dispatch(LIST)
  },
  async [CREATE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.mobile) throw new Error('请填写用户手机号码')
      if (!/1\d{10}/.test(form.mobile)) throw new Error('电话格式不正确')
      if (!form.username) throw new Error('请填写用户姓名')
      await api.create(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
  },
  async [EDIT] ({ commit }, uuid) {
    try {
      commit(EDIT, { status: 0 })
      commit(MODAL, { name: 'form', show: true })
      commit(EDIT, { status: 1, info: await api.info(uuid) })
    } catch ({ message }) {
      commit(EDIT, { status: -1 })
      iview.Message.error(message)
    }
  },
  async [SAVE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.username) throw new Error('请填写姓名')
      await api.save(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
  },
  // 禁用、启用用户
  async [MODIFY] ({ state, commit }, { mobile, data }) {
    await api.modify(mobile, { ...data })
    commit(LIST, await api.list(state.query))
  },
  async [USER_REMOTE_QUERY] ({ state, commit }, mobile) {
    commit(USER_REMOTE_QUERY, await api.remote(mobile))
  },
  async [USER_TYPES] ({ commit }) {
    commit(USER_TYPES, await api.types())
  },
  async [USER_RESET_PASSWORD] ({ dispatch }, uuid) {
    try {
      await api.resetPassword(uuid)
      iview.Notice.success({
        title: '密码重置',
        desc: '密码重置成功'
      })
    } catch ({ message }) {
      iview.Notice.error({
        title: '密码重置',
        desc: '密码重置失败'
      })
    }
    dispatch(LIST)
  }
}
