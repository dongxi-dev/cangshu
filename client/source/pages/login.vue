<script setup lang="ts">
import { type FormInstance, type FormRules } from 'element-plus'
import { useSessionCheck } from '~/hooks'
import { login } from '~/services'
import { useGlobalStore } from '~/store/global'

const formRef = ref<FormInstance>()
useSessionCheck()
const globalStore = useGlobalStore()
const router = useRouter()
const state = reactive({
  form: {
    username: '',
    password: '',
  },
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const onSubmit = async () => {
  await formRef.value?.validate()

  const message = ElMessage({
    message: '登录中',
    type: 'info',
  })
  try {
    /**
     * TODO
     * 1. lock ui
     * 2. toast tips and show loading
     * 3. fetch data and logic
     * 4. notice user
     */
    await globalStore.login(state.form)

    message.close()
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    router.push('/')
  } catch (error) {
    message.close()
    ElMessage({
      message: '登录失败',
      type: 'error',
    })
  }
}
</script>

<template>
  <div :class="$style.pod">
    <ElForm
      statusIcon
      labelPosition="top"
      ref="formRef"
      :class="$style.form"
      :model="state.form"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <div :class="$style.title">仓鼠</div>
      <ElFormItem label="账号" prop="username">
        <ElInput
          v-model="state.form.username"
          autoFocus
          placeholder="请输入账号"
        />
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput
          v-model="state.form.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton :class="$style.button" type="primary" nativeType="submit">
          登录
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style module>
.pod {
  height: 100vh;
  display: flex;
  background: no-repeat center / cover url('../assets/loginBg.png');
}

.title {
  color: #333;
  font: 32px / 1 '';
  text-align: center;
  margin: 0 0 1em;
}

.form {
  width: 400px;
  margin: auto;
  background: #fffe;
  padding: 32px;
  border-radius: 3px;
}
.button {
  width: 100%;
  margin: 12px 0 0;
}
</style>
