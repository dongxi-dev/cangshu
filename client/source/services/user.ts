import client from '@j-l/request'

export const checkSession = async () => {
  const result: unknown = await client.get('/auth/check')
  return result
}

export const login = async (params: App.DTO.Login) => {
  const result: unknown = await client.post('/auth', params)
  return result
}

export const loginUser = async (params: {
  password: string
  username: string
}) => {
  const result: any = await client.post('/auth', params)
  return result
}

export const getUserList = async () => {
  const result: any = await client.get('/users')
  return result
}

export const createOneUser = async () => {
  const result: any = await client.get('/users/create')
  return result
}

// 检查是否登录
export const checkLogin = async () => {
  const result: any = await client.get('/auth/check')
  return result
}
// 退出
export const loginOut = async () => {
  const result: any = await client.get('/auth/out')
  return result
}
