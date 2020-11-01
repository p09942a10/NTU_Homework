<template>
  <div class="form-page-container">
    <div
      style="display: inline-block;padding: 20px 45px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px;">{{ title }}</b>
      <span style="font-size: 28px;color: #efb336;margin-left: 10px">{{ originaForm.title }}</span>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;" class="hidden-xs-only" @click="handleBackToSite">
        back
      </el-button>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" class="hidden-sm-and-up" @click="handleBackToSite" />
    </div>
    <div style="background-color: white;padding:20px 30px;margin: 25px 30px;border-radius: 4px">
      <div :style="'display:'+display">
        <p style="display: inline-block">{{ company_title }}</p>
        <p style="display: inline-block">{{ originaForm.title }}</p>
        <div style="display: block;height: 1.5px;width: 100%;margin: 5px 0 25px 0;background-color: #DCDFE6;position: relative;box-sizing: inherit;box-sizing: inherit;"><!----></div>
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="Company" prop="company_id" style="margin: 20px 0">
          <el-select v-model="ruleForm.company_id" placeholder="Please choose the company" style="position: absolute;width: 100%">
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
          <el-button type="primary" @click="submitSiteForm('ruleForm')" size="small">Submit</el-button>
          <el-button type="info" @click="handleBackToSite" size="small">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyList } from '@/api/admin-model/company'
import { getOneSiteInfo, modifySite } from '@/api/admin-model/site'

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
      title: this.$route.query.site_id ? 'Edit Site' : 'Create Site',
      company_title: this.$route.params.company_info ? this.$route.params.company_info.company_title : '',
      display: this.$route.name === 'EditSite' ? 'block' : 'none',
      site_id: this.$route.query.site_id ? this.$route.query.site_id : '',
      companyList: [],
      originaForm: {
        title: this.$route.params.site_info ? this.$route.params.site_info.title : '',
        phone: this.$route.params.site_info ? this.$route.params.site_info.phone : '',
        description: this.$route.params.site_info ? this.$route.params.site_info.description : '',
        company_id: this.$route.params.company_info ? this.$route.params.company_info.company_id : ''
      },
      ruleForm: {
        title: this.$route.params.site_info ? this.$route.params.site_info.title : '',
        phone: this.$route.params.site_info ? this.$route.params.site_info.phone : '',
        description: this.$route.params.site_info ? this.$route.params.site_info.description : '',
        company_id: this.$route.params.company_info ? this.$route.params.company_info.company_id : ''
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
    // 防止用戶在此頁面刷新從而丟失路由時傳來的參數
    if (this.$route.name === 'EditSite' && !this.$route.params.site_info) {
      this.getOneSiteInfo()
    }
  },
  beforeMount() {
  },
  methods: {
    handleBackToSite() {
      this.$router.push({ name: 'SiteList' })
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
    getOneSiteInfo() {
      const data = {
        token: this.token,
        site_id: this.$route.query.site_id
      }
      getOneSiteInfo(data).then(response => {
        const site_info = response.result
        this.originaForm.company_id = site_info.company_id
        this.originaForm.title = site_info.title
        this.originaForm.phone = site_info.phone
        this.originaForm.description = site_info.description
        this.ruleForm.company_id = site_info.company_id
        this.ruleForm.title = site_info.title
        this.ruleForm.phone = site_info.phone
        this.ruleForm.description = site_info.description
      })
    },
    submitSiteForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.title === this.originaForm.title && this.ruleForm.phone === this.originaForm.phone && this.ruleForm.description === this.originaForm.description && this.ruleForm.company_id === this.originaForm.company_id) {
            this.$message({
              message: 'Information have not changed',
              type: 'warning',
              duration: 2 * 1000
            })
            return false
          } else {
            const data = {
              token: this.token,
              site_id: this.site_id,
              company_id: this.ruleForm.company_id,
              title: this.ruleForm.title,
              phone: this.ruleForm.phone,
              description: this.ruleForm.description
            }
            console.log(data)
            modifySite(data).then(response => {
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

