import fetch from './fetch'

export const list = params => fetch.get('/v1/merchant/list', { params })

export const create = payload => fetch.post('/v1/merchant/create', payload)

export const info = (uuid) => fetch.get(`/v1/merchant/info/${uuid}`)

export const save = payload => fetch.post('/v1/merchant/save', payload)

export const del = (uuid) => fetch.post(`/v1/merchant/delete/${uuid}`)

export const remote = name => fetch.get(`/v1/merchant/remote/${name}`)
