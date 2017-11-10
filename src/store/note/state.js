import _ from 'lodash'

const form = {
  uuid: '',
  title: '',
  content: '',
  urgency: 0
}
export default {
  list: {},
  query: {
    page: 1,
    size: 10,
    searchKey: '',
    urgency: ''
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
