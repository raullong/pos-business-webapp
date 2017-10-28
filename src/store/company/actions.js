import { LIST, CREATE, MODAL, QUERY_CHANGE, EDIT, SAVE, DELETE_MERCHANT, REMOTE_QUERY } from './keys'

import iview from 'iview'

import * as api from 'api/company'

export default {
  async [LIST] ({ state, commit }) {
    commit(LIST, await api.list(state.query))
  },
  [QUERY_CHANGE] ({ commit, dispatch }, payload) {
    commit(QUERY_CHANGE, payload)
    dispatch(LIST)
  },
  async [CREATE] ({ state, commit, dispatch }) {
    const form = { ...state.form }
    try {
      commit(CREATE, { status: 0 })
      if (!form.address) throw new Error('商户地址不能为空')
      if (!form.name) throw new Error('商户名称不能为空')
      if (!/1\d{10}/.test(form.linkerMobile)) throw new Error('联系人电话不正确')
      if (!form.linkerName) throw new Error('联系人姓名不能为空1')
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
      await api.save(form)
      dispatch(LIST)
      commit(MODAL, { name: 'form', show: false })
      commit(CREATE, { status: 1 })
    } catch ({ message }) {
      commit(CREATE, { status: -1 })
      iview.Message.error(message)
    }
  },
  async [DELETE_MERCHANT] ({ state, dispatch }, uuid) {
    await api.del(uuid)
    dispatch(LIST)
  },
  async [REMOTE_QUERY] ({ state, commit }, name) {
    commit(REMOTE_QUERY, await api.remote(name))
  }
}
