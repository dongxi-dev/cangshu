<script setup lang="ts">
import Aside from '~/components/aside.vue'
import Head from '~/components/head.vue'
import { useSessionCheck } from '~/hooks'

useSessionCheck()
</script>

<template>
  <div :class="$style.lot">
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
