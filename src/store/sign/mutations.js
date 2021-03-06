import { LIST, QUERY_CHANGE, MODAL, EDIT, CREATE, FORM_CHANGE } from './keys'
import _ from 'lodash'
export default {
  [LIST] (state, { list, page, size, total }) {
    state.list = list
    state.total = total
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
  }
}
