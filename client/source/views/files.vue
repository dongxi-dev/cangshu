<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { addFileEntry, getFilePage } from "~/services/file";

const state = reactive({
  page: null as DTI.Page | null,
  isCreateFolderDialogVisible: false,
  createFolderForm: {
    name: "",
  },
});

const init = async () => {
  state.page = await getFilePage();
};

onMounted(init);

const onAddFolder = async () => {
  await addFileEntry({
    type: 0,
    name: state.createFolderForm.name,
  });

  init();

  state.createFolderForm.name = "";

  state.isCreateFolderDialogVisible = false;
};
</script>

<template>
  <div>
    <ElRow>
      <ElCol :span="12">文件管理</ElCol>
      <ElCol :span="12">
        <ElButton
          type="primary"
          @click="state.isCreateFolderDialogVisible = true"
          >创建文件夹</ElButton
        >
        <el-dialog
          v-model="state.isCreateFolderDialogVisible"
          title="Warning"
          width="30%"
          align-center
        >
          <span>
            <ElInput v-model="state.createFolderForm.name" />
          </span>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="onAddFolder"> 确认 </el-button>
            </span>
          </template>
        </el-dialog>
        <ElButton type="primary">上传</ElButton>
      </ElCol>
    </ElRow>
    <ElSpace :size="16">
      <ElInput :class="$style.search" placeholder="请输入关键字" />
      <ElButton type="primary">搜索</ElButton>
    </ElSpace>

    <ElTable :data="state.page?.list">
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
