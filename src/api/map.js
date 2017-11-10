import fetch from './fetch'

export const list = () => fetch.get('/v1/gps/list')

export const merchantList = () => fetch.get('v1/merchant/mapList')
