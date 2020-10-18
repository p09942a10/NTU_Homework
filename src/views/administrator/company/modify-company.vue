<template>
  <div class="form-page-container">
    <div
      style="display: inline-block;padding: 20px 45px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">{{ title }}</b>
      <span style="font-size: 28px;color: #d81e06;margin-left: 10px">{{ originaForm.title }}</span>
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
          <el-input v-enter-number v-model="ruleForm.phone" />
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
          <el-button type="primary" @click="submitCompanyForm('ruleForm')" size="small">Submit</el-button>
          <el-button type="info" @click="handleBack" size="small">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOneCompanyInfo, modifyCompany } from '@/api/admin-model/company'

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
      title: this.$route.query.company_id ? 'Edit Company' : 'Create Company',
      company_id: this.$route.query.company_id ? this.$route.query.company_id : '',
      originaForm: {
        title: this.$route.params.company_info ? this.$route.params.company_info.title : '',
        phone: this.$route.params.company_info ? this.$route.params.company_info.phone : '',
        description: this.$route.params.company_info ? this.$route.params.company_info.description : ''
      },
      ruleForm: {
        title: this.$route.params.company_info ? this.$route.params.company_info.title : '',
        phone: this.$route.params.company_info ? this.$route.params.company_info.phone : '',
        description: this.$route.params.company_info ? this.$route.params.company_info.description : ''
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
  watch: {
    '$route'(to, from) {
      this.getSiteList()
    }
  },
  created() {
    // 防止用戶在此頁面刷新從而丟失路由時傳來的參數
    if (this.$route.name === 'EditCompany' && !this.$route.params.company_info) {
      const data = {
        token: this.token,
        company_id: this.$route.query.company_id
      }
      getOneCompanyInfo(data).then(response => {
        const company_info = response.result
        this.originaForm.title = company_info.title
        this.originaForm.phone = company_info.phone
        this.originaForm.description = company_info.description
        this.ruleForm.title = company_info.title
        this.ruleForm.phone = company_info.phone
        this.ruleForm.description = company_info.description
      })
    }
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
          if (this.ruleForm.title === this.originaForm.title && this.ruleForm.phone === this.originaForm.phone && this.ruleForm.description === this.originaForm.description) {
            this.$message({
              message: 'Information have not changed',
              type: 'warning',
              duration: 2 * 1000
            })
            return false
          } else {
            const data = {
              token: this.token,
              company_id: this.company_id,
              title: this.ruleForm.title,
              phone: this.ruleForm.phone,
              description: this.ruleForm.description
            }
            modifyCompany(data).then(response => {
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

