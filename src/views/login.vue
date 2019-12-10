<template>
  <div class="login-box">
    <h1 class="login-title">渠道经理远程调度系统</h1>
    <section class="login-content">
      <h2 class="lg-name">用户登录</h2>
      <span class="input input-haruki">
        <input id="userid" v-model="loginForm.username" class="input-field input-field-haruki" type="text" @blur="onInputBlur" @focus="onInputFocus">
        <label class="input-label input-label-haruki" for="userid">
          <span class="input-label-content input-label-content-haruki">用户名</span>
        </label>
      </span>
      <span class="input input-haruki">
        <input id="pwd" v-model="loginForm.password" class="input-field input-field-haruki" type="password" @blur="onInputBlur" @focus="onInputFocus">
        <label class="input-label input-label-haruki" for="pwd">
          <span class="input-label-content input-label-content-haruki">密码</span>
        </label>
      </span>
    </section>
    <button id="login_btn" class="btn btn-1 btn-1e" @click="handleLogin">登录</button>
  </div>
</template>

<script>
import AesUtil from '@/utils/AesUtil.js'
import { setToken } from '@/utils/auth'
import CryptoJS from 'crypto-js'
import '@/assets/css/login.css'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin123',
        uuid: ''
      },
      loading: false,
      redirect: undefined
    }
  },
  methods: {
    onInputFocus(ev) {
      ev.target.parentNode.classList.add('input-filled')
    },
    onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('input-filled')
      }
    },
    handleLogin() {
      const user = {
        apollo: this.loginForm.username,
        app: this.loginForm.password,
        uuid: this.loginForm.uuid
      }
      //  this.loading = true
      const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex)
      const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex)
      const aesUtil = new AesUtil(128, 1000)
      const ciphertext = aesUtil.encrypt(salt, iv, user.uuid, user.app)
      const usertext = aesUtil.encrypt(salt, iv, user.uuid, user.apollo)
      user.apollo = (iv + '::' + salt + '::' + usertext)
      user.app = (iv + '::' + salt + '::' + ciphertext)
      this.$http.postForm(this.$http.adornUrl(this.$path.MapLogin), user).then(({ data }) => {
        if (data && data.code === 0) {
          setToken(data.token)
          // 跳转到首页
          //   this.loading = false
          this.$router.push({ path: '/' })
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>
<style>
</style>
