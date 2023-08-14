<script setup lang="ts">
import Aside from '~/components/aside.vue'
import { useSessionCheck } from '~/hooks'
import { useGlobalStore } from '~/store/global'

const globalStore = useGlobalStore()
useSessionCheck()
</script>

<template>
  <div :class="$style.lot" v-if="globalStore.state.isLogin">
    <Aside />
    <div :class="$style.content">
      <RouterView />
    </div>
  </div>
</template>

<style module lang="postcss">
.lot {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.content {
  flex: 1;
}
</style>
