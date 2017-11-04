import fetch from './fetch'

export const list = params => fetch.get('/v1/note/list', { params })

export const create = payload => fetch.post('/v1/note/create', payload)

export const save = payload => fetch.post('/v1/note/save', payload)

export const info = uuid => fetch.get(`v1/note/info/${uuid}`)

export const del = (uuid) => fetch.post(`/v1/note/delete/${uuid}`)
