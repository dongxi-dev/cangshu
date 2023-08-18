<script setup lang="ts">
import { watch } from 'vue'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import {
  addFileEntry,
  getFilePage,
  removeBatchFileEntries,
  removeFileEntry,
  updateFileEntry,
  uploadFile,
} from '~/services/file'

const route = useRoute()

const state = reactive({
  page: null as DTI.Page<any, { parentId?: string }> | null,
  isCreateFolderDialogVisible: false,
  queryNote: {
    keyword: '',
  } as DTI.PageNote,
  createFolderForm: {
    id: '',
    name: '',
  },
  selected: [] as any[],
})

const getPage = async (number?: number, parentId?: string) => {
  const page = await getFilePage({
    number: number || state.page?.note.number || 1,
    size: 10,
    keyword: state.queryNote.keyword,
    parentId: parentId ?? (route.query.id as string),
  })
  state.page = page
}

const onSearch = () => {
  getPage(1)
}

onMounted(getPage)

const onEditFileEntry = async () => {
  if (state.createFolderForm.id) {
    // update file entry
    await updateFileEntry(state.createFolderForm.id, {
      name: state.createFolderForm.name,
    })
  } else {
    await addFileEntry({
      type: 0,
      name: state.createFolderForm.name,
      parentId: route.query.id as string,
    })
  }

  getPage()

  state.createFolderForm.name = ''
  state.createFolderForm.id = ''

  state.isCreateFolderDialogVisible = false
}

const onPageChange = (number: number) => {
  getPage(number)
}

const onRemove = async (id: string) => {
  await removeFileEntry(id)
  getPage()
}

const onEdit = (record: { id: string; name: string }) => {
  state.isCreateFolderDialogVisible = true
  state.createFolderForm.id = record.id
  state.createFolderForm.name = record.name
}

const onCreateFolder = () => {
  state.isCreateFolderDialogVisible = true
  state.createFolderForm.id = ''
}

const onPreview = () => {}

const onDownload = (url: string) => {
  window.open(url)
}

const onSelectionChange = (value: { id: string }[]) => {
  state.selected = value
}

const onBeforeUpload = async (file: File) => {
  const url = await uploadFile(file)
  let type = 99
  if (file.type.startsWith('image/')) {
    type = 1
  }

  await addFileEntry({
    name: file.name,
    type,
    url,
    size: file.size,
    parentId: route.query.id as string,
  })

  getPage()
  return false
}

const onBatchRemove = async () => {
  //
  const idList = state.selected.map((i) => i.id)
  if (!idList.length) {
    ElMessage('请选择要删除的项')
    return
  }
  await removeBatchFileEntries(idList)
  getPage()
}

watch(
  () => route.query.id as string,
  () => {
    getPage(1, (route.query.id as string) || '')
  },
)
</script>

<template>
  <div
    style="
      box-sizing: border-box;
      padding: 24px;
      display: flex;
      flex-flow: column;
      height: 100%;
    "
  >
    <div style="display: flex; align-items: flex-start">
      <div style="line-height: 32px; margin: 0 auto 0 0">
        <ElButton v-if="$route.query.id" @click="$router.back()">返回</ElButton>
        文件管理
      </div>
      <ElButton type="primary" @click="onCreateFolder" style="margin: 0 16px">
        创建文件夹
      </ElButton>
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
            <el-button type="primary" @click="onEditFileEntry">确认</el-button>
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

    <div style="display: flex; align-items: center; justify-content: flex-end">
      <div>
        <ElPopconfirm title="确认删除？" @confirm="onBatchRemove">
          <template #reference>
            <el-button>批量删除</el-button>
          </template>
        </ElPopconfirm>
      </div>
    </div>

    <ElTable
      :data="state.page?.list"
      row-key="id"
      @selectionChange="onSelectionChange"
      style="flex: 1; overflow-y: auto; width: 100%"
    >
      <el-table-column type="selection" width="50" />
      <ElTableColumn prop="id" label="ID" width="80" />
      <ElTableColumn prop="type" label="文件类型" width="80">
        <template #default="scope">
          {{ scope.row.type }}
        </template>
      </ElTableColumn>
      <ElTableColumn prop="name" label="文件名">
        <template #default="scope">
          <RouterLink
            v-if="scope.row.type === 0"
            :to="`/workspace/files?id=${scope.row.id}`"
          >
            {{ scope.row.name }}
          </RouterLink>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="size" label="文件尺寸" width="100">
        <template #default="scope">{{ scope.row.size }}B</template>
      </ElTableColumn>
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
            v-if="scope.row.type !== 0"
          >
            下载
          </ElButton>
          <ElButton
            link
            type="primary"
            size="small"
            @click="onPreview"
            v-if="scope.row.type !== 0"
          >
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
