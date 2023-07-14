<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import {
  loginUser,
  getUserList,
  createOneUser,
  checkLogin,
} from "~/services/user";
import { useRouter } from "vue-router";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any) => {
    if (valid) {
      let userList = await getUserList();
      if (!userList?.length) {
        ElMessageBox({
          title: "提示",
          message: "暂无账号，将初始化创建一个账号为admin，密码为admin的账号",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then(async (action) => {
          await createOneUser();
          ElMessage({
            message: "创建成功",
            type: "success",
          });
        });
        return;
      }
      await loginUser(ruleForm);
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      router.push("/");
    } else {
      return false;
    }
  });
};
const checkIsLogin = async () => {
  const res = await checkLogin();
  if (res) {
    ElMessage({
      message: "已登录，即将跳转首页",
      type: "success",
      onClose() {
        router.push("/");
      },
    });
  }
};
onMounted(checkIsLogin);
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
          :class="$style.login_main"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              style="height: 40px"
              v-model="ruleForm.username"
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
}

.loginWrap {
  width: 100%;
  height: 100%;
  background-image: url("../assets/loginBg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 30px;
  text-align: center;
  color: #fff;
  margin-bottom: 24px;
  text-shadow: 1px 3px 3px #000;
}

.login_main {
  width: 450px;
  background: rgba(255, 255, 255, 0.8);
  padding: 48px 48px 24px;
  border-radius: 12px;
}
</style>
