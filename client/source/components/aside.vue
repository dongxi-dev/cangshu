<script lang="ts" setup>
import { logout } from '~/services'

const router = useRouter()

const onLogout = async () => {
  await ElMessageBox({
    title: '提示',
    message: '是否确认退出登录？',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
  const message = ElMessage({
    message: '退出中',
  })
  try {
    await logout()
    message.close()
    ElMessage({
      message: '退出成功，即将跳转登录页面',
      type: 'success',
    })
    router.push('/login')
  } catch (error) {
    message.close()
    ElMessage({
      message: '退出失败',
      type: 'error',
    })
  }
}
</script>

<template>
  <ElMenu active-text-color="#409eff" :router="true" :class="$style.pod">
    <div :class="$style.logo">logo</div>
    <ElMenuItem index="/workspace">
      <template #title>
        <el-icon></el-icon>
        <span>首页</span>
      </template>
    </ElMenuItem>
    <ElMenuItem index="/workspace/files">
      <template #title>
        <el-icon></el-icon>
        <span>文件管理</span>
      </template>
    </ElMenuItem>
    <ElDropdown :class="$style.user_actions">
      <div :class="$style.user">
        <ElAvatar />
        张三
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled>设置</el-dropdown-item>
          <el-dropdown-item divided @click="onLogout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </ElDropdown>
  </ElMenu>
</template>

<style module>
.pod {
  width: 240px;
  flex: 0 0 auto;
  display: flex;
  flex-flow: column;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: #eee;
}
.user_actions {
  margin: auto 0 0;
}
.user {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
}
</style>
