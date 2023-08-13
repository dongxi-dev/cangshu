export const useSessionCheck = () => {
  const route = useRoute()

  if (route.path.startsWith('/workspace')) {
    // TODO: 检查是否登录
  } else if (route.path.startsWith('/login')) {
    // TODO: 如果已经登录直接跳转
  }
}
