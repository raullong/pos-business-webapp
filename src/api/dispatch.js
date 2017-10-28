import fetch from './fetch'

export const list = params => fetch.get('/v1/dispatch/list', { params })

export const create = payload => fetch.post('/v1/dispatch/create', payload)

export const save = payload => fetch.post('/v1/dispatch/save', payload)

export const info = uuid => fetch.get(`v1/dispatch/info/${uuid}`)

export const del = (uuid) => fetch.post(`/v1/dispatch/delete/${uuid}`)
