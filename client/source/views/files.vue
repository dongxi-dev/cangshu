<script setup lang="ts">
import { onMounted } from "vue";
import { useFileStore } from "~/store/file";

const fileStore = useFileStore();

onMounted(() => {
  fileStore.getPage();
});
</script>

<template>
  <div>
    <ElRow>
      <ElCol :span="12"> 文件管理 </ElCol>
      <ElCol :span="12">
        <ElButton type="primary">创建文件夹</ElButton>
        <ElButton type="primary">上传</ElButton>
      </ElCol>
    </ElRow>
    <ElSpace :size="16">
      <ElInput :class="$style.search" placeholder="请输入关键字" />
      <ElButton type="primary">搜索</ElButton>
    </ElSpace>

    <ElTable :data="fileStore.page?.list">
      <ElTableColumn prop="id" label="ID" width="180" />
      <ElTableColumn prop="name" label="文件名" width="180" />
      <ElTableColumn prop="createAt" label="创建时间" width="180" />
    </ElTable>

    <ElPagination layout="prev, pager, next" :total="100" />
  </div>
</template>

<style module lang="postcss">
.search {
  width: 400px;
}
</style>
