import _ from 'lodash'

const form = {
  uuid: '',
  username: '',
  mobile: '',
  nickname: '',
  password: '',
  status: 1,
  type: 1,
  position: {},
  client: ''
}
export default {
  list: {},
  query: {
    page: 1,
    size: 10,
    searchKey: '',
    status: '',
    type: ''
  },
  modal: {
    form: false
  },
  isEdit: false,
  loading: {
    create: false,
    edit: false,
    resetPassword: false
  },
  _form: _.cloneDeep(form),
  form: _.cloneDeep(form),
  remoteQueryUserResult: [],
  userTypes: []
}
