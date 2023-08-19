import client from '@j-l/request'

export const getSessionStatus = async () => {
  const result = await client.get<API.DTO.GetSessionStatus.Return>('auth')
  return result.isValid
}

export const login = async (params: API.DTO.Login.Params) => {
  await client.put<unknown>('auth', params)
}

export const logout = async () => {
  await client.delete('auth')
}

export const getSessionUserInfo = async () =>
  client.get<API.DTO.GetSessionUserInfo.Return>('users/-')
