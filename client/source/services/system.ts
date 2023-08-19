import client from '@j-l/request'

export const setup = () => {}

export const getSystemInfo = () =>
  client.get<API.Models.Global['system']>('system')
