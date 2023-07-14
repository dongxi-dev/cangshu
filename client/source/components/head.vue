<script lang="ts" setup>
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import {
  loginOut
} from "~/services/user";
const router = useRouter();
const logOut = () => {
  ElMessageBox({
    title: "提示",
    message: "是否确认退出登录？",
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(async (action) => {
    await loginOut()
    router.push("/login");
  });
};
</script>
<template>
  <div :class="$style.headWrap">
    <div :class="$style.title">仓鼠资产管理登陆</div>
    <div>
      <span :class="$style.logout" @click="logOut">退出</span>
      <el-icon :size="20" color="#000">
        <SwitchButton style="width: 1em; height: 1em; margin-right: 8px" />
      </el-icon>
    </div>
  </div>
</template>

<style module lang="postcss">
.headWrap {
  height: 48px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background: rgba(91, 157, 169, 0.5);
  margin-bottom: 24px;
}
.title {
  font-weight: bold;
}
.logout {
  cursor: pointer;
}
</style>
