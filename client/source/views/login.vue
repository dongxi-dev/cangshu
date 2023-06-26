<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    account: '',
    password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>

<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px">
        <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
    </el-form>
</template>
