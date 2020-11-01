<template>
  <div class="form-page-container">
    <div
      style="display: inline-block;padding: 20px 45px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">{{ title }}</b>
      <span style="font-size: 28px;color: #20a0ff;margin-left: 10px">{{ originaForm.name }}</span>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;" class="hidden-xs-only" @click="handleBack">
        back
      </el-button>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" class="hidden-sm-and-up" @click="handleBack" />
    </div>
    <div style="background-color: white;padding:20px 30px;margin: 25px 30px;border-radius: 4px">
      <el-switch
        v-model="is_unlimited"
        style="float: right"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Unlimited"
        inactive-text="Limited"
      />
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left" :show-message="!is_unlimited">
        <el-form-item label="Avatar" style="margin: 20px 0">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="global"
            :show-file-list="false"
            :http-request="uploadRequest"
            :on-change="fileChange"
            :file-list="avatar.list"
            :auto-upload="false"
          >
            <img v-if="avatar.src" :src="avatar.src" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="Name" prop="name" style="margin: 20px 0">
          <el-input v-model="ruleForm.user_name" />
        </el-form-item>
        <el-form-item label="E-Mail" prop="email" style="margin: 30px 0">
          <el-input v-model="ruleForm.email" disabled />
        </el-form-item>
        <el-form-item label="Birthday" prop="birthday" style="margin: 30px 0">
          <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="Choose Date" style="width: 100%;" format=" yyyy - MM - dd" value-format="timestamp" />
        </el-form-item>
        <el-form-item label="Phone" prop="phone" style="margin: 30px 0">
          <el-input v-model="ruleForm.phone" v-enter-number />
        </el-form-item>
        <el-form-item label="Gender" prop="gender" style="margin: 30px 0" class="hidden-xs-only">
          <el-radio v-model="ruleForm.gender" label="male" border>
            male
            <svg-icon icon-class="male" style="font-size: 10px" />
          </el-radio>
          <el-radio v-model="ruleForm.gender" label="female" border>
            female
            <svg-icon icon-class="female" style="font-size: 10px" />
          </el-radio>
        </el-form-item>
        <el-form-item label="Gender" prop="gender" style="margin: 30px 0" class="hidden-sm-and-up">
          <el-radio v-model="ruleForm.gender" label="male" border>
            <svg-icon icon-class="male" style="font-size: 10px" />
          </el-radio>
          <el-radio v-model="ruleForm.gender" label="female" border style="margin-left: 0px">
            <svg-icon icon-class="female" style="font-size: 10px" />
          </el-radio>
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
          <el-button type="primary" size="small" @click="submitUserForm('ruleForm')">Submit</el-button>
          <el-button type="info" size="small" @click="handleBack">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOneUserInfo, modifyUser, uploadUserAvatar, modifyUnlimitedUser } from '@/api/admin-model/user.js'

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
      title: 'Edit User',
      user_id: this.$route.query.user_id,
      is_unlimited: false,
      avatar: {
        src: '',
        list: []
      },
      originaForm: {
        user_name: this.$route.params.user_info ? this.$route.params.user_info.name : '',
        phone: this.$route.params.user_info ? this.$route.params.user_info.phone : '',
        description: this.$route.params.user_info ? this.$route.params.user_info.description : '',
        gender: this.$route.params.user_info ? this.$route.params.user_info.gender : 'male',
        email: this.$route.params.user_info ? this.$route.params.user_info.email : '',
        birthday: this.$route.params.user_info ? this.$route.params.user_info.birthday : ''

      },
      ruleForm: {
        user_name: this.$route.params.user_info ? this.$route.params.user_info.name : '',
        phone: this.$route.params.user_info ? this.$route.params.user_info.phone : '',
        description: this.$route.params.user_info ? this.$route.params.user_info.description : '',
        gender: this.$route.params.user_info ? this.$route.params.user_info.gender : 'male',
        email: this.$route.params.user_info ? this.$route.params.user_info.email : '',
        birthday: this.$route.params.user_info ? this.$route.params.user_info.birthday : ''
      },
      rules: {
        user_name: [
          { required: true, message: 'Please enter the user name', trigger: 'blur' }
          // { min: 2, max: 10, message: ' Length between 2 ~ 10 characters ', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter the e-mail', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct e-mail', trigger: ['blur', 'change'] }
        ],
        birthday: [
          { required: true, message: 'Please enter the birthday', trigger: 'blur' }
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
    if (this.$route.params.user_info) {
      this.avatar.src = this.$route.params.user_info['avatar_file']
    }
    // 防止用戶在此頁面刷新從而丟失路由時傳來的參數
    if (this.$route.name === 'EditUser' && !this.$route.params.user_info) {
      const data = {
        token: this.token,
        user_id: this.$route.query.user_id
      }
      getOneUserInfo(data).then(response => {
        const user_info = response.result
        this.originaForm.user_name = user_info.name
        this.originaForm.phone = user_info.phone
        this.originaForm.description = user_info.description
        this.originaForm.gender = user_info.gender
        this.originaForm.email = user_info.email
        this.originaForm.birthday = user_info.birthday

        this.ruleForm.user_name = user_info.name
        this.ruleForm.phone = user_info.phone
        this.ruleForm.description = user_info.description
        this.ruleForm.gender = user_info.gender
        this.ruleForm.email = user_info.email
        this.ruleForm.birthday = user_info.birthday
        if (user_info['avatar_file'] !== '') {
          this.avatar.src = user_info['avatar_file']
        }
      })
    }
  },
  beforeMount() {
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
      // this.$router.push({ name: 'UserList' })
    },
    submitUserForm(formName) {
      if (this.is_unlimited) {
        this.submitUnlimitedUserForm()
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLimitedUserForm()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    submitUnlimitedUserForm() {
      if (!this.avatar.src && this.originaForm.birthday === this.ruleForm.birthday && this.originaForm.email === this.ruleForm.email && this.ruleForm.gender === this.originaForm.gender && this.ruleForm.description === this.originaForm.description && this.ruleForm.phone === this.originaForm.phone && this.ruleForm.user_name === this.originaForm.user_name ) {
        this.$message({
          message: 'Information have not changed',
          type: 'warning',
          duration: 2 * 1000
        })
        return false
      } else {
        const data = {
          token: this.token,
          user_id: this.user_id,
          name: this.ruleForm.user_name,
          phone: this.ruleForm.phone,
          description: this.ruleForm.description,
          gender: this.ruleForm.gender,
          email: this.ruleForm.email,
          birthday: this.ruleForm.birthday / 1000,
          password: this.ruleForm.password
        //  is_unlimited: this.is_unlimited
        }
        modifyUnlimitedUser(data).then(response => {
          this.handleBack()
        })
      }
    },
    submitLimitedUserForm() {
      if (!this.avatar.src && this.originaForm.birthday === this.ruleForm.birthday && this.originaForm.email === this.ruleForm.email && this.ruleForm.gender === this.originaForm.gender && this.ruleForm.description === this.originaForm.description && this.ruleForm.phone === this.originaForm.phone && this.ruleForm.user_name === this.originaForm.user_name) {
        this.$message({
          message: 'Information have not changed',
          type: 'warning',
          duration: 2 * 1000
        })
        return false
      } else {
        const data = {
          token: this.token,
          user_id: this.user_id,
          name: this.ruleForm.user_name,
          phone: this.ruleForm.phone,
          description: this.ruleForm.description,
          gender: this.ruleForm.gender,
          email: this.ruleForm.email,
          birthday: this.ruleForm.birthday / 1000,
          password: this.ruleForm.password
        //  is_unlimited: this.is_unlimited
        }
        modifyUser(data).then(response => {
          if (response.status === '200') {
            // 成功註冊後返回user_id並上傳用戶圖片
            if (this.avatar.src) {
              this.$refs.upload.submit()
            } else {
              this.handleBack()
            }
          }
        })
      }
    },
    clickTest() {
      this.$refs.upload.submit()
    },
    uploadRequest(data) {
      var formData = new FormData()
      const type = data.file.type.split('image/')[1]
      formData.append('file_name', this.user_id + '.' + type)
      formData.append('avatar_file', data.file)
      formData.append('user_id', this.user_id)
      formData.append('token', this.token)
      uploadUserAvatar(formData).then(response => {
        if (response.status === '200') {
          this.handleBack()
        }
      })
    },
    fileChange(file, fileList) {
      const isImage = file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg'
      const isLt10M = file.raw.size / 1024 / 1024 < 10
      if (!isImage) {
        this.$message.error('Only can support PNG,JPG,JPEG')
        fileList.pop()
      } else if (!isLt10M) {
        this.$message.error('Image must below 10MB')
        fileList.pop()
      } else {
        if (fileList.length > 1) {
          fileList.shift()
        }
        this.avatar.src = URL.createObjectURL(file.raw)
      }
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 100%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block
  }
</style>

