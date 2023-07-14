<script setup lang="ts">
import Side from "~/components/aside.vue";
import Head from "~/components/head.vue";
</script>

<template>
  <div :class="$style.lot">
    <Side />
    <div :class="$style.content">
      <Head />
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
