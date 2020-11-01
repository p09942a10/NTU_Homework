<template>
  <div class="form-page-container">
    <div
      style="display: inline-block;padding: 20px 45px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px;">{{ title }}</b>
      <span style="font-size: 28px;color: #efb336;margin-left: 10px" />
      <el-button
        type="info"
        icon="el-icon-caret-left"
        style="float: right;"
        class="hidden-xs-only"
        @click="handleBackToSite"
      >
        back
      </el-button>
      <el-button
        type="info"
        icon="el-icon-caret-left"
        style="float: right;padding: 12px"
        class="hidden-sm-and-up"
        @click="handleBackToSite"
      />
    </div>
    <div style="background-color: white;padding:20px 30px;margin: 25px 30px;border-radius: 4px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="Company" prop="company_id" style="margin: 20px 0">
          <el-select
            v-model="ruleForm.company_id"
            placeholder="Please choose the company"
            style="position: absolute;width: 100%"
          >
            <el-option v-for="(value,key) in companyList" :key="key" :label="value.title" :value="value.company_id" />
          </el-select>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary" size="small" @click="submitSiteForm('ruleForm')">Submit</el-button>
          <el-button type="info" size="small" @click="handleBackToSite">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyList } from '@/api/admin-model/company'
import { createSite } from '@/api/admin-model/site'

export default {
  data() {
    // 僅輸入數字方法
    const checkNumber = (rule, value, callback) => {
      if ((Number(value))) {
        callback()
      } else {
        return callback(new Error('Please enter the correct number'))
      }
    }
    const checkCompany = (rule, value, callback) => {
      if (value !== '') {
        callback()
      } else {
        return callback(new Error('Please choose the company'))
      }
    }
    return {
      title: 'Create Site',
      company_title: '',
      companyList: [],
      ruleForm: {
        title: '',
        phone: '',
        description: '',
        company_id: this.$route.query.company_id ? this.$route.query.company_id : ''
      },
      rules: {
        title: [
          { required: true, message: 'Please enter the title', trigger: 'blur' },
          { min: 2, max: 20, message: ' Length between 2 ~ 10 characters ', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please enter the phone number', trigger: 'blur' },
          { min: 10, max: 10, message: ' Please enter the correct phone number ', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        company_id: [
          { validator: checkCompany, trigger: 'blur' }
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
    // 獲取公司選單列表
    this.getCompanyList()
  },
  beforeMount() {
  },
  methods: {
    handleBackToSite() {
      this.$router.go(-1)
    },
    getCompanyList() {
      getCompanyList(this.token).then(response => {
        console.log(response)
        this.companyList = response.result
        /* console.log(this.companyList)
              { "company_id": "4",
              "title": "丸鐵",
              "phone": "0988776666",
              "description": "丸鐵",
              "site_count": 1,
              " is_delete ": false }*/
      })
    },
    submitSiteForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          {
            const data = {
              token: this.token,
              site_id: this.site_id,
              company_id: this.ruleForm.company_id,
              title: this.ruleForm.title,
              phone: this.ruleForm.phone,
              description: this.ruleForm.description
            }
            console.log(data)
            createSite(data).then(response => {
              console.log(response)
              if (response.status === '200') {
                this.handleBackToSite()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

