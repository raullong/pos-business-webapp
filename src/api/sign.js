import fetch from './fetch'

export const list = params => fetch.get('/v1/sign/list', { params })

export const create = payload => fetch.post('/v1/sign/create', payload)

export const save = payload => fetch.put('/v1/sign/save', payload)

export const info = uuid => fetch.get(`v1/sign/${uuid}`)
