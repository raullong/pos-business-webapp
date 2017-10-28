import fetch from './fetch'

export const list = params => fetch.get('/v1/user/list', { params })

export const create = payload => fetch.post('/v1/user/create', payload)

export const types = () => fetch.get('/v1/user/types')

export const info = uuid => fetch.get(`/v1/user/info/${uuid}`)

export const save = payload => fetch.put('/v1/user/save', payload)

export const modify = (mobile, payload) => fetch.post(`/v1/user/modify/${mobile}`, payload)

export const query = searchKey => fetch.get(`/v1/user/query/${searchKey}`)

export const remote = mobile => fetch.get(`/v1/user/remote/${mobile}`)

export const resetPassword = uuid => fetch.post(`/v1/user/resetPassword/${uuid}`)
