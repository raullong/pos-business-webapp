import fetch from './fetch'

export const list = params => fetch.get('/v1/task/install/list', { params })

export const create = payload => fetch.post('/v1/task/install/create', payload)

export const save = payload => fetch.post('/v1/task/install/save', payload)

export const info = uuid => fetch.get(`v1/task/install/info/${uuid}`)

export const del = (uuid) => fetch.post(`/v1/task/install/delete/${uuid}`)
