import fetch from './fetch'

export const userList = () => fetch.get('/v1/user/mapList')

export const merchantList = () => fetch.get('v1/merchant/mapList')
