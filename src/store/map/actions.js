import { USER_LIST, MERCHANT_LIST } from 'store/map/keys'
import * as api from 'api/map'
import iview from 'iview'

export default {
  async [USER_LIST] ({ state, commit }) {
    try {
      commit(USER_LIST, await api.userList())
    } catch ({ message }) {
      iview.Message.error(message)
    }
  },
  async [MERCHANT_LIST] ({ state, commit }) {
    try {
      commit(MERCHANT_LIST, await api.merchantList())
    } catch ({ message }) {
      iview.Message.error(message)
    }
  }
}
