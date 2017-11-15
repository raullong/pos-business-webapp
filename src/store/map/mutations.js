import { USER_LIST, INFO_DATA, MERCHANT_LIST } from './keys'

export default {
  [USER_LIST] (state, data) {
    state.userList = data
  },
  [INFO_DATA] (state, info) {
    state.infoData = info
  },
  [MERCHANT_LIST] (state, data) {
    state.merchantList = data
  }
}
