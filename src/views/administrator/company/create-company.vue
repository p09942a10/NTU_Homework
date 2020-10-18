<template>
  <div class="form-page-container">
    <div
      style="display: inline-block;padding: 20px 45px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">{{ title }}</b>
      <span style="font-size: 28px;color: #d81e06;margin-left: 10px"></span>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;" class="hidden-xs-only" @click="handleBack">
        back
      </el-button>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" class="hidden-sm-and-up" @click="handleBack" />
    </div>
    <div style="background-color: white;padding:20px 30px;margin: 25px 30px;border-radius: 4px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="Title" prop="title" style="margin: 20px 0">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone" style="margin: 30px 0">
          <el-input v-model="ruleForm.phone" v-enter-number />
        </el-form-item>
        <el-form-item label="Description" prop="description" style="margin: 30px 0 20px 0">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            :rows="10"
            maxlength="300"
            show-word-limit
          />
        </el-form-item>
        <el-form-item style="min-width: 260px">
          <el-button type="primary" size="small" @click="submitCompanyForm('ruleForm')">Submit</el-button>
          <el-button type="info" size="small" @click="handleBack">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createCompany } from '@/api/admin-model/company'

export default {
  data() {
    const checkNumber = (rule, value, callback) => {
      if ((Number(value)) && (value) % 1 === 0) {
        callback()
      } else {
        return callback(new Error('Please enter the correct number'))
      }
    }
    return {
      title: 'Create Company',
      ruleForm: {
        title: '',
        phone: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please enter the title', trigger: 'blur' },
          { min: 2, max: 20, message: ' Length between 2 ~ 20 characters ', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please enter the phone number', trigger: 'blur' },
          { min: 10, max: 10, message: ' Please enter the correct phone number ', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
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
  beforeMount() {
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },

    submitCompanyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          {
            const data = {
              token: this.token,
              company_id: this.company_id,
              title: this.ruleForm.title,
              phone: this.ruleForm.phone,
              description: this.ruleForm.description
            }
            createCompany(data).then(response => {
              if (response.status === '200') {
                this.handleBack()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      }
      )
    }
  }
}
</script>

<style scoped>
</style>

