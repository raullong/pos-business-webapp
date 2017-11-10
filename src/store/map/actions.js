import { MAP_LIST, MERCHANT_LIST } from 'store/map/keys'
import * as api from 'api/map'
import iview from 'iview'

export default {
  async [MAP_LIST] ({ state, commit }) {
    try {
      commit(MAP_LIST, await api.list())
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
