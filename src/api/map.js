import fetch from './fetch'

export const list = () => fetch.get('/v1/gps/list')

export const companyList = () => fetch.get('v1/merchant/mapList')
