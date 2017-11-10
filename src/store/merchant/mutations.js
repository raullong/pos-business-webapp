import { MODAL, CREATE, LIST, FORM_CHANGE, QUERY_CHANGE, EDIT, REMOTE_QUERY } from './keys'

import _ from 'lodash'

export default {
  [LIST] (state, data = {}) {
    state.list = data
  },

  [MODAL] (state, { name, show }) {
    state.modal[name] = show
    if (name === 'form' && show) {
      state.form = _.cloneDeep(state._form)
      state.isEdit = false
      state.loading.edit = false
    }
  },
  [CREATE] (state, { status }) {
    state.loading.create = status === 0
  },
  [FORM_CHANGE] (state, { key, value }) {
    state.form[key] = value
  },
  [QUERY_CHANGE] (state, { key, value }) {
    state.query.page = 1
    state.query[key] = value
  },
  [EDIT] (state, { status, info }) {
    state.loading.edit = status === 0
    state.isEdit = true
    if (status === 1) {
      state.form = { ...info }
    }
  },
  [REMOTE_QUERY] (state, data = []) {
    state.remoteQueryResult = data
  }
}
