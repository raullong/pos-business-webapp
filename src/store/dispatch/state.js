import _ from 'lodash'

const form = {
  merchantName: '',
  merchantCode: '',
  machineCode: '',
  type: '新装',
  money: 0,
  moneyType: '',
  messageMoney: 0,
  signUserName: '',
  signUserMobile: '',
  drawUserName: '',
  drawUserMobile: '',
  installUserName: '',
  installUserMobile: '',
  installTime: '',
  remark: '',
  status: 0
}
export default {
  list: {},
  query: {
    page: 1,
    size: 10,
    searchKey: '',
    status: ''
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
  form: _.cloneDeep(form)
}
