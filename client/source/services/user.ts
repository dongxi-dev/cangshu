import client from '@j-l/request'

export const getUserList = async () => {
  const result: any = await client.get('/users')
  return result
}

export const createOneUser = async () => {
  const result: any = await client.get('/users/create')
  return result
}
