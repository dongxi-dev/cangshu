<script setup lang="ts">
import { useGlobalStore } from '~/store'

const globalStore = useGlobalStore()

onMounted(globalStore.getSystem)
</script>

<template>
  <RouterView v-if="globalStore.state.system" />
  <div v-else>loading</div>
</template>
