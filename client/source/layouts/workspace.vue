<script setup lang="ts"></script>

<template>
  <div :class="$style.lot">
    <div>side</div>
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
  background: lightblue;
}
</style>
