<template>
  <div class="page-container">
    <div
      style="display: inline-block;padding: 20px 45px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">Login List</b>
      <span style="font-size: 28px;color: #20a0ff;margin-left: 10px">{{ user_name }}</span>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;" class="hidden-xs-only" @click="handleBack">
        back
      </el-button>
      <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" class="hidden-sm-and-up" @click="handleBack" />
    </div>
    <div style="background-color: white;padding:20px 30px;margin: 20px 25px;border-radius: 4px">
      <!--user_login_list = { "token": "215622082075d1d67cf8b255", "available_time": "1562219007", "description": "", "is_deleted": "1", "login_time": "1562208207" } -->
      <el-table
        :data="user_login_list"
        stripe
        style="width: 100%"
        height="500">
        <el-table-column
          prop="token"
          label="Token">
        </el-table-column>
        <el-table-column
          prop="available_time"
          label="Available Time"
          sortable
        :formatter="tableTimeStampToTime.bind(this,'available_time')"
        >
        </el-table-column>
        <el-table-column
          prop="login_time"
          label="Login Time"
          sortable
          :formatter="tableTimeStampToTime.bind(this,'login_time')"
        >
        </el-table-column>
        <el-table-column
          prop="is_deleted"
          label="Deleted"
        :formatter="boolTransform">
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOneUserInfo, getLoginList } from '@/api/admin-model/user.js'
import { tableTimeStampToTime, boolTransform } from '@/utils/transform.js'
export default {
  data() {
    return {
      user_id: this.$route.query.user_id,
      user_name: this.$route.params.user_info ? this.$route.params.user_info.name : '',
      user_login_list: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    const data = {
      token: this.token,
      user_id: this.$route.query.user_id
    }
    if (!this.$route.params.user_info) {
      getOneUserInfo(data).then(response => {
        const user_info = response.result
        this.user_name = user_info.name
      })
    }
    getLoginList(data).then(response => {
      this.user_login_list = response.result
    })
  },
  methods: {
    tableTimeStampToTime,
    boolTransform,
    handleBack() {
      this.$router.push({ name: 'UserList' })
    }
  }
}
</script>
<style lang="scss">
  @import "@/styles/global-color.scss";
</style>
