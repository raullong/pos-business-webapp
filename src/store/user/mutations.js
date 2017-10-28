import { LIST, QUERY_CHANGE, MODAL, EDIT, CREATE, FORM_CHANGE, USER_REMOTE_QUERY, USER_TYPES } from './keys'
import _ from 'lodash'
export default {
  [LIST] (state, data = {}) {
    state.list = data
  },
  [QUERY_CHANGE] (state, { key, value }) {
    state.query.page = 1
    state.query[key] = value
  },
  [MODAL] (state, { name, show }) {
    state.modal[name] = show
    if (name === 'form' && show) {
      state.form = _.cloneDeep(state._form)
      state.isEdit = false
      state.loading.edit = false
    }
  },
  [EDIT] (state, { status, info }) {
    state.loading.edit = status === 0
    state.isEdit = true
    if (status === 1) {
      state.form = { ...info }
    }
  },
  [CREATE] (state, { status }) {
    state.loading.create = status === 0
  },
  [FORM_CHANGE] (state, { key, value }) {
    state.form[key] = value
  },
  [USER_REMOTE_QUERY] (state, data = []) {
    state.remoteQueryUserResult = data
  },
  [USER_TYPES] (state, data = []) {
    state.userTypes = data
  }
}
