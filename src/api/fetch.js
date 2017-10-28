import iView from 'iview'
import axios from 'axios'

let headers = {}

const instance = axios.create({
  baseURL: `${window.location.origin}/api`,
  headers
})

instance.interceptors.response.use(response => Promise.resolve(response.data), error => {
  if (error.response && error.response.status < 500) {
    if (error.response.status === 401) {
      iView.Modal.warning({
        title: '登录超时',
        content: '登录超时，请重新登录',
        onOk () {
          window.location.href = `${window.location.origin}/auth.html`
        }
      })
    } else {
      return Promise.reject(new Error(error.response.data.message))
    }
  } else {
    return Promise.reject(error)
  }
})

export default instance
