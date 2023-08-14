import client from '@j-l/request'

export const getSessionStatus = async () => {
  const result: any = await client.get('auth')
  return !!result?.isValid
}

export const login = async (params: App.DTO.Login) => {
  const result: unknown = await client.put('auth', params)
  return result
}

export const logout = async () => {
  const result: any = await client.delete('auth')
  return result
}

export const getSessionUserInfo = async (): Promise<App.Models.LoginUser> => {
  const result: any = await client.get('users/-')
  return {
    id: result?.id,
    name: result?.name,
    avatar: result?.avatar,
  }
}
