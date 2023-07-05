<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { addFileEntry, getFilePage, removeFileEntry } from "~/services/file";

const state = reactive({
  page: null as DTI.Page | null,
  isCreateFolderDialogVisible: false,
  queryNote: {
    keyword: "",
  } as DTI.PageNote,
  createFolderForm: {
    name: "",
  },
});

const getPage = async (number?: number) => {
  state.page = await getFilePage({
    number: number || state.page?.note.number || 1,
    size: 10,
    keyword: state.queryNote.keyword,
  });
};

const onSearch = () => {
  getPage(1);
};

onMounted(getPage);

const onAddFolder = async () => {
  await addFileEntry({
    type: 0,
    name: state.createFolderForm.name,
  });

  getPage();

  state.createFolderForm.name = "";

  state.isCreateFolderDialogVisible = false;
};

const onPageChange = (number: number) => {
  getPage(number);
};

const onRemove = async (id: string) => {
  await removeFileEntry(id);
  getPage();
};

const onEdit = () => {};

const onPreview = () => {};

const onDownload = (url: string) => {
  window.open(url);
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
      <ElInput
        :class="$style.search"
        v-model="state.queryNote.keyword"
        placeholder="请输入关键字"
      />
      <ElButton type="primary" @click="onSearch">搜索</ElButton>
    </ElSpace>

    <ElTable :data="state.page?.list">
      <ElTableColumn prop="id" label="ID" width="180" />
      <ElTableColumn prop="name" label="文件名" width="180" />
      <ElTableColumn prop="createAt" label="创建时间" width="180" />
      <ElTableColumn prop="" label="操作" width="280">
        <template #default="scope">
          <ElPopconfirm title="确认删除？" @confirm="onRemove(scope.row.id)">
            <template #reference>
              <el-button link type="primary" size="small"> 删除 </el-button>
            </template>
          </ElPopconfirm>
          <el-button link type="primary" size="small" @click="onEdit"
            >编辑</el-button
          >
          <ElButton
            link
            type="primary"
            size="small"
            @click="onDownload(scope.row.id)"
          >
            下载
          </ElButton>
          <ElButton link type="primary" size="small" @click="onPreview">
            Preview
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      layout="prev, pager, next"
      :total="state.page?.total"
      :current="state.page?.note.number"
      @currentChange="onPageChange"
    />
  </div>
</template>

<style module lang="postcss">
.search {
  width: 400px;
}
</style>
