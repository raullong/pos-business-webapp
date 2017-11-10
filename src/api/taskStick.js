import fetch from './fetch'

export const list = params => fetch.get('/v1/task/stick/list', { params })

export const create = payload => fetch.post('/v1/task/stick/create', payload)

export const save = payload => fetch.post('/v1/task/stick/save', payload)

export const info = (uuid) => fetch.get(`v1/task/stick/info/${uuid}`)

export const del = (uuid) => fetch.post(`/v1/task/stick/delete/${uuid}`)
