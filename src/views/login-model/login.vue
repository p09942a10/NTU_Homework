<template>
  <div
    class="login-container"
  >
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="form-container">
        <div class="title-container">
          <img :src="logo" class="logo">
        </div>

        <el-form-item prop="account">
          <span class="svg-container">
            <svg-icon icon-class="user-ico" />
          </span>
          <el-input
            ref="account"
            v-model="loginForm.account"
            placeholder="Account"
            name="Account"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="info"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >Login
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import logo from '../../assets/Kevin/logo.png'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, message: 'Please enter the account', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter the password', trigger: 'blur' },
          { min: 3, max: 30, message: 'Length between 3 ~ 30 characters', required: true, trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      logo: logo
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "@/styles/global-color.scss";

  $light_gray: rgba(0, 0, 0, 0.1);
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: $color-background;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        max-width: calc(100% - 20px);
        padding: 12px 5px 12px 15px;
        margin: 0 0 0 10px;
        color: $color-black !important;
        height: 47px;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 100px $color-background inset !important;
        }
      }
    }

    .el-form-item {
      // border: 1px solid rgba(255, 255, 255, 0.1);
      background: $color-background;
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  @import "@/styles/global-color.scss";

  $dark_gray: #889aa4;
  $light_gray: rgba(0, 0, 0, 0.1);

  .login-container {
    min-height: 100%;
    width: 100%;
    min-width: 341px;
    background-color: $app-background;
    overflow: hidden;

    .form-container {
      background-color: $color-white;
      width: 100%;
      max-width: 322px;
      margin: 0 auto;
      border: solid 1px $app-background;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      padding: 20px;
      font-size: 1rem;
      position: relative;
    }

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 100px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .logo {
        position: relative;
        max-width: 250px;
        margin-bottom: 20px;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $color-black;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
