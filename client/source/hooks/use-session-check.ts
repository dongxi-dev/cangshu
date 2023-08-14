import { getSessionStatus } from '~/services'
import { useGlobalStore } from '~/store/global'

export const useSessionCheck = async () => {
  const route = useRoute()
  const router = useRouter()
  const globalStore = useGlobalStore()

  if (!globalStore.state.isLogin && route.path.startsWith('/workspace')) {
    // TODO: 检查是否登录
    const isValid = await globalStore.checkSessionValid()

    if (!isValid) {
      router.replace('/login')
    }
  } else if (globalStore.state.isLogin && route.path.startsWith('/login')) {
    // TODO: 如果已经登录直接跳转
  }
}
