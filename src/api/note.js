import fetch from './fetch'

export const list = params => fetch.get('/v1/note/list', { params })

export const create = payload => fetch.post('/v1/note/create', payload)

export const save = payload => fetch.put('/v1/user/save', payload)

export const info = uuid => fetch.get(`v1/note/${uuid}`)
