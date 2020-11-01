
<template>
  <div>
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
    <el-button style="margin-left: 10px;" size="small" type="success" @click="handleUpload">Uplad Test</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { uploadUserAvatar } from '@/api/admin-model/user.js'
export default {
  components: {
  },
  data() {
    return {
      avatar: {
        src: '',
        list: []
      },
      user_id:''
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
    handleBack() {
      this.$router.go(-1)
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
    },
    handleUpload(user_id) {
      user_id = this.user_id
      this.$refs.upload.submit()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
