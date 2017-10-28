import { MAP_LIST, INFO_DATA, COMPANY_LIST } from './keys'

export default {
  [MAP_LIST] (state, data) {
    state.list = data
  },
  [INFO_DATA] (state, info) {
    state.infoData = info
  },
  [COMPANY_LIST] (state, data) {
    state.companyList = data
  }
}
