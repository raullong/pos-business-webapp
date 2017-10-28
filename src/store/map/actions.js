import { MAP_LIST, COMPANY_LIST } from 'store/map/keys'
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
  async [COMPANY_LIST] ({ state, commit }) {
    try {
      commit(COMPANY_LIST, await api.companyList())
    } catch ({ message }) {
      iview.Message.error(message)
    }
  }
}
