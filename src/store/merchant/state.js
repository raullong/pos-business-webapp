import _ from 'lodash'

const form = {
  uuid: '',
  name: '',
  code: '',
  linkerName: '',
  linkerMobile: '',
  address: '',
  locationInfo: {},
  remark: '',
  machineCode: '',
  status: 1
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
  form: _.cloneDeep(form),
  remoteQueryResult: []
}
