<template>
  <div class="login-container">
    <!-- 背景vedio -->
    <video poster="@/assets/login/1.jpg" loop autoplay muted>
      <source src="@/assets/login/Particles.mp4" />
    </video>

    <div class="login-form">
      <!-- 标题 -->
      <header>
        <img src="@/assets/logo.png" />
        <h3>vue3-admin</h3>
      </header>
      <!-- form组件 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input
            label="username"
            placeholder="username"
            v-model="loginForm.username"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            label="password"
            placeholder="password"
            v-model="loginForm.password"
            type="password"
          />
        </el-form-item>

        <el-form-item prop="verifyCode">
          <el-input
            v-model="loginForm.verifyCode"
            placeholder="验证码"
            type="text"
            style="display: inline-block; width: 40%"
            @keyup.enter="handleLogin"
          ></el-input>
          <div style="display: inline-block; margin-left: 15px; height: 40px">
            <img
              :src="codeUrl"
              @click="getValidCode"
              class="code-img"
              style=""
            />
          </div>
        </el-form-item>

        <el-form-item style="background: none; border: none">
          <el-button
            type="primary"
            style="margin-bottom: 30px; width: 100%"
            @click="handleLogin"
            >{{ $t('button.wLogin') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCode } from '@/api/Auth'
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/store/useUserStore'
import { FormInstance } from 'element-plus'

const loginForm = reactive({
  username: '',
  password: '',
  uuid: '',
  verifyCode: '',
})
// rules表单校验
const loginRules = reactive({
  username: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA_Z0-9]{2,10}$/,
      message: '请输入2到10的字母或者数字',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 15,
      message: '请输入3到15的字母或者数字',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 15,
      message: '请输入3到15的字母或者数字',
      trigger: 'blur',
    },
  ],
  verifyCode: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur',
    },
    {
      whitespace: true,
      message: '不能为空格',
    },
  ],
})

/**
 * 验证码
 */
const codeUrl = ref<string>()
// 获取验证码
const getValidCode = async () => {
  let res = await getCode()
  codeUrl.value = res.data.data.image
  loginForm.uuid = res.data.data.uuid
}
onMounted(() => {
  getValidCode()
  handleToken()
})

//登录事件
const userStore = useUserStore()
const loginFormRef = ref<FormInstance>()
const handleLogin = () => {
  loginFormRef.value &&
    loginFormRef.value.validate((valid: boolean) => {
      if (valid) {
        userStore.login(loginForm)
      } else {
        return false
      }
    })
}

// token登录测试
const handleToken = () => {
  const token = localStorage.getItem('token')
  if (token != null) {
    userStore.loginByToken(token)
  }
}
</script>

<style lang="scss" scoped>
// 隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.login-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    z-index: -1;
  }

  .login-form {
    display: flex;
    width: 380px;
    height: 380px;
    padding: 4vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url('@/assets/login/login_form.png');
    background-size: 100% 100%;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(247, 243, 243, 0.06);
    opacity: '0.2';

    header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      img {
        display: inline-block;
        width: 40px;
      }

      h3 {
        margin-bottom: 0;
        font-size: 18px;
        color: #fff;
        text-align: center;
      }
    }
    :deep(.el-form-item__content) {
      flex-wrap: nowrap;
    }
    :deep(.el-input__wrapper) {
      background-color: transparent !important;
      margin-left: 10px;
      input {
        padding: 12px 5px 12px 5px;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $loginBg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }

    .el-form-item {
      display: flex;
      flex-wrap: nowrap;
      border-radius: 5px;
      color: #454545;
    }

    .code-img {
      margin-bottom: -12px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
