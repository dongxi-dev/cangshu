import { createHash } from 'node:crypto'

export const encryptPassword = (password: string, salt = '') => {
  return createHash('md5').update(`${password}:${salt}`).digest('hex')
}

console.log('密码为2加密后的密码为：', encryptPassword('2'))
