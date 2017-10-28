import fetch from './fetch'

export const create = payload => fetch.post('/v1/machine', payload)

export const list = params => fetch.get('/v1/machine', { params })

export const modify = (code, payload) => fetch.post(`/v1/machine/modify/${code}`, payload)

export const info = (code) => fetch.get(`/v1/machine/info/${code}`)

export const save = payload => fetch.put('/v1/machine/save', payload)

export const query = code => fetch.get(`/v1/machine/query/${code}`)
