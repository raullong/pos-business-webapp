import _ from 'lodash'

const form = {
  uuid: '',
  merchantName: '',
  merchantCode: '',
  machineCode: '',
  issuseTime: '',
  type: '',
  serverName: '',
  serverMobile: '',
  taskTime: '',
  question: '',
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
    edit: false
  },
  _form: _.cloneDeep(form),
  form: _.cloneDeep(form)
}
