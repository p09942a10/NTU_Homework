<template>
  <div class="form-page-container">
    <div
      style="display: inline-block;padding: 20px 30px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">Change Password</b>
      <span style="font-size: 28px;color: #20a0ff;margin-left: 10px" class="hidden-xs-only">{{user_name}}</span>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;" class="hidden-xs-only" @click="handleBack">
        back
      </el-button>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" class="hidden-sm-and-up" @click="handleBack" />
    </div>
    <div style="background-color: white;padding:20px 30px;margin: 2% 5% 10px 5%;border-radius: 4px;min-width: 350px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="135px" label-position="left">
        <el-form-item label="New Password" prop="newPass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Check Password" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" style="margin-top: 20px" @click="submitForm('ruleForm')">Submit</el-button>
          <el-button size="small" @click="handleBack">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { modifyPassword } from '@/api/admin-model/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('The passwords you enter twice must be the same'))
      } else {
        callback()
      }
    }
    return {
      user_name: this.$route.query.user_name,
      user_id: this.$route.query.user_id,
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        newPass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, message: ' Length must more than 6 characters ', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            password: this.ruleForm.pass,
            user_id: this.user_id,
            token: this.token
          }
          modifyPassword(data).then(response => {
            if (response.status === '200') {
              this.handleBack()
            }
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
</style>
