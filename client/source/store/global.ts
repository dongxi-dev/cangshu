import { defineStore } from 'pinia'
import {
  getSessionUserInfo,
  login as asyncLogin,
  logout as asyncLogout,
  getSessionStatus,
} from '~/services'

export const useGlobalStore = defineStore('global', () => {
  const state = reactive({
    isLogin: false,
    user: null as App.Models.LoginUser | null,
  })

  const getUserInfo = async () => {
    const user = await getSessionUserInfo()
    state.isLogin = true
    state.user = user
  }

  const login = async (params: Parameters<typeof asyncLogin>[0]) => {
    await asyncLogin(params)
    await getUserInfo()
  }

  const logout = async () => {
    await asyncLogout()
    state.isLogin = false
    state.user = null
  }

  const checkSessionValid = async () => {
    if (state.isLogin) {
      return true
    }
    const isValid = await getSessionStatus()
    if (!isValid) {
      return false
    }
    await getUserInfo()
    return true
  }

  return { state, login, logout, checkSessionValid }
})
