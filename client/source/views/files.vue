<script setup lang="ts">
import { watch } from "vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  addFileEntry,
  getFilePage,
  removeFileEntry,
  updateFileEntry,
  uploadFile,
} from "~/services/file";

const route = useRoute();

const state = reactive({
  page: null as DTI.Page | null,
  isCreateFolderDialogVisible: false,
  queryNote: {
    keyword: "",
  } as DTI.PageNote,
  createFolderForm: {
    id: "",
    name: "",
  },
});

const getPage = async (number?: number, parentId?: string) => {
  console.log(7777777777);
  const page = await getFilePage({
    number: number || state.page?.note.number || 1,
    size: 10,
    keyword: state.queryNote.keyword,
    parentId,
  });
  console.log(8888888);
  console.log(JSON.stringify(page, null, 2));
  state.page = page;
};

const onSearch = () => {
  getPage(1);
};

onMounted(getPage);

const onEditFileEntry = async () => {
  if (state.createFolderForm.id) {
    // update file entry
    await updateFileEntry(state.createFolderForm.id, {
      name: state.createFolderForm.name,
    });
  } else {
    await addFileEntry({
      type: 0,
      name: state.createFolderForm.name,
    });
  }

  getPage();

  state.createFolderForm.name = "";
  state.createFolderForm.id = "";

  state.isCreateFolderDialogVisible = false;
};

const onPageChange = (number: number) => {
  getPage(number);
};

const onRemove = async (id: string) => {
  await removeFileEntry(id);
  getPage();
};

const onEdit = (record: { id: string; name: string }) => {
  state.isCreateFolderDialogVisible = true;
  state.createFolderForm.id = record.id;
  state.createFolderForm.name = record.name;
};

const onCreateFolder = () => {
  state.isCreateFolderDialogVisible = true;
  state.createFolderForm.id = "";
};

const onPreview = () => {};

const onDownload = (url: string) => {
  window.open(url);
};

const handleSelectionChange = (value: { id: string }[]) => {
  console.log(value);
};

const onBeforeUpload = async (file: File) => {
  const url = await uploadFile(file);

  await addFileEntry({
    name: file.name,
    type: 1,
    url,
  });

  getPage();
  return false;
};

watch(
  () => route.query.id as string,
  () => {
    getPage(1, route.query.id as string);
  }
);
</script>

<template>
  <div
    style="
      box-sizing: border-box;
      padding: 24px;
      display: flex;
      flex-flow: column;
      height: calc(100vh - 74px);
    "
  >
    <div style="display: flex; align-items: flex-start">
      <div style="line-height: 32px; margin: 0 auto 0 0">文件管理</div>
      <ElButton type="primary" @click="onCreateFolder" style="margin: 0 16px"
        >创建文件夹</ElButton
      >
      <el-dialog
        v-model="state.isCreateFolderDialogVisible"
        width="30%"
        align-center
      >
        <span>
          <ElInput
            placeholder="编辑文件名/文件夹名"
            v-model="state.createFolderForm.name"
          />
        </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="onEditFileEntry">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
      <el-upload
        class="upload-demo"
        style="margin: 0"
        :beforeUpload="onBeforeUpload"
      >
        <ElButton type="primary">上传</ElButton>
      </el-upload>
    </div>

    <div style="margin: 8px 0 24px">
      <ElSpace :size="16">
        <ElInput
          :class="$style.search"
          v-model="state.queryNote.keyword"
          placeholder="请输入关键字"
        />
        <ElButton type="primary" @click="onSearch">搜索</ElButton>
      </ElSpace>
    </div>

    <ElTable
      :data="state.page?.list"
      row-key="id"
      @selection-change="handleSelectionChange"
      style="flex: 1; overflow-y: auto; width: 100%"
    >
      <el-table-column type="selection" width="50" />
      <ElTableColumn prop="id" label="ID" width="80" />
      <ElTableColumn prop="name" label="文件名">
        <template #default="scope">
          <RouterLink :to="`/workspace/files?id=${scope.row.id}`">
            {{ scope.row.name }}
          </RouterLink>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="size" label="文件尺寸" width="100" />
      <ElTableColumn prop="createAt" label="创建时间" width="220" />
      <ElTableColumn prop="" label="操作" width="180">
        <template #default="scope">
          <ElPopconfirm title="确认删除？" @confirm="onRemove(scope.row.id)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </ElPopconfirm>
          <el-button
            link
            type="primary"
            size="small"
            @click="onEdit(scope.row)"
          >
            编辑
          </el-button>
          <ElButton
            link
            type="primary"
            size="small"
            @click="onDownload(scope.row.url)"
          >
            下载
          </ElButton>
          <ElButton link type="primary" size="small" @click="onPreview">
            预览
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <ElPagination
      layout="prev, pager, next"
      :total="state.page?.total"
      :current="state.page?.note.number"
      @currentChange="onPageChange"
      style="margin: auto 0 0"
    />
  </div>
</template>

<style module lang="postcss">
.search {
  width: 400px;
}
</style>
