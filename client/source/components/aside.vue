<template>
  <ElMenu
      default-active="/"
      active-text-color="#409eff"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
  >
    <div :class="$style.log">
      logo
    </div>
    <template v-for="(m, idx) in menuData">
      <template v-if="!m.hideInMenu">
        <ElSubMenu v-if="m.children && m.children.length" :key="idx.toString()" :index="idx.toString()">
          <template #title>
            <ElIcon>{{ m.icon }}</ElIcon>
            <span>{{ m.name }}</span>
          </template>
          <template v-for="(sub, sIdx) in m.children">
            <template v-if="!sub.hideMenu">
              <ElMenuItem :key="sub.path" :index="sub.path">
                <template #title>
                  <el-icon>{{ sub.icon }}</el-icon>
                  <span>{{ sub.name }}</span>
                </template>
              </ElMenuItem>
            </template>
          </template>
        </ElSubMenu>
        <ElMenuItem v-else :key="m.path" :index="m.path">
          <template #title>
            <el-icon>{{ m.icon }}</el-icon>
            <span>{{ m.name }}</span>
          </template>
        </ElMenuItem>
      </template>
    </template>
  </ElMenu>
</template>

<script lang="ts" setup>
import { menus } from '~/store/menu'
import {
  checkLogin,
} from "~/services/user";
import { ElMessage } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const menuData = menus().menu

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const checkIsLogin = async () => {
  const res = await checkLogin();
  if (!res) {
    ElMessage({
      message: "登录失效，请登录！！！",
      type: "warning",
      onClose() {
        router.push("/login");
      },
    });
  }
};
onMounted(checkIsLogin);
</script>


<style module lang="postcss">
  .log {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    height: 40px;
    background: #eee;
  }
</style>
