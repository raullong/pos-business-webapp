import { MAP_LIST, INFO_DATA, MERCHANT_LIST } from './keys'

export default {
  [MAP_LIST] (state, data) {
    state.list = data
  },
  [INFO_DATA] (state, info) {
    state.infoData = info
  },
  [MERCHANT_LIST] (state, data) {
    state.merchantList = data
  }
}
