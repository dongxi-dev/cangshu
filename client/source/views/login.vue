<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  account: "",
  password: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<template>
  <div :class="$style.loginContainer">
    <div :class="$style.loginWrap">
      <div>
        <div :class="$style.title">仓鼠资产管理登陆</div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          label-position="top"
          :class="$style.loginMain"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              style="height: 40px"
              v-model="ruleForm.account"
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              style="height: 40px"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%; height: 40px"
              type="primary"
              @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style module lang="postcss">
.loginContainer {
  height: calc(100vh - 21px);
  background: repeating-linear-gradient(to right, #5a9ca8, #5b9da9);
  .loginWrap {
    width: 100%;
    height: 100%;
    background-image: url("../assets/loginBg.jpeg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 30px;
      text-align: center;
      color: #fff;
      margin-bottom: 24px;
      text-shadow: 1px 3px 3px #000;
    }
    .loginMain {
      width: 450px;
      background: rgba(255, 255, 255, 0.8);
      padding: 48px 48px 24px;
      border-radius: 12px;
    }
  }
}
</style>
