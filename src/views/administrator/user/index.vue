<template>
  <div class="page-container">
    <div
      style="display: inline-block;padding: 20px 50px;width:calc(100%);margin-bottom:5px;top: 0;background-color:white;min-width: 360px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">User</b>
      <el-divider content-position="center" direction="vertical" />
      <el-button
        type="danger"
        icon="el-icon-plus"
        style="vertical-align: middle;"
        class="hidden-xs-only"
        @click="onClickMenu('CreateUser')"
      >Create User
      </el-button>
      <el-radio-group v-model="listType" style="margin:10px 20px 15px 0;float: right">
        <el-radio-button label="Card" />
        <el-radio-button label="Table" />
      </el-radio-group>
    </div>
    <!--{ "user_id": "15", "is_deleted": "false", "create_time": "1562229188", "description": "", "update_time": "1562229188", "name": "User A", "birthday": "1546272000", "email": "app@compal.com", "gender": "male", "phone": "0911111111", "site_title": "siteA,siteB" }-->
    <div v-if="listType==='Card'" class="card-container">
      <el-row class="user-card-group" :gutter="25" style="margin:0 20px">
        <el-col v-for="(value,index) in userList" :key="index" :xs="24" :sm="12" :md="8" :lg="6" class="user-card">
          <el-card shadow="hover">
            <img
              v-if="value['avatar_file']!==''"
              :src="value['avatar_file']"
              class="user-avatar"
              style="width: 50px;height: 50px"
            >
            <svg-icon
              v-else
              icon-class="admin-user"
              class="user-avatar"
              style="width: 50px;height: 50px"
            />
            <el-dropdown trigger="click" style="position: absolute;right: 25px;top:10px;font-size: medium">
              <span class="el-dropdown-link"><i class="el-icon-s-tools" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-date" @click.native="onClickMenu('LoginList',value)">Login List</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit" @click.native="onClickMenu('EditUser',value)">Edit</el-dropdown-item>
                <el-dropdown-item icon="el-icon-lock" @click.native="onClickMenu('ChangePassword',value)">Change Password</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" @click.native="onClickMenu('Delete',value)">Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <template>
              <div style="margin-top: 7%;font-weight: bold">
                {{ value.name }}
                <svg-icon v-if="value.gender === 'male'" icon-class="male" style="font-size: 10px" />
                <svg-icon v-else icon-class="female" style="font-size: 10px" />
              </div>
              <p style="margin:7px 0 0 0;font-size: small"><svg-icon icon-class="small-email" style="margin:0 2px 0 0;font-size: 10px" />{{ value.email }}</p>
              <p style="margin:10px 0 0 0;font-size: small"><svg-icon icon-class="small-phone" style="margin:0 2px 0 0;font-size: 10px" />{{ value.phone }}</p>
              <p style="margin:10px 0 0 0;font-size: small"><svg-icon icon-class="small-cake" style="margin:0 2px 0 0;font-size: 10px" />{{ timestampToTime(value.birthday,'birthday') }}</p>
              <p style="margin:10px 0 0 0;font-size: small"><svg-icon icon-class="small-user" style="margin:0 2px 0 0;font-size: 10px" />{{ timestampToTime(value.create_time,'create_time') }}</p>
            </template>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <span>Are you sure to delete user</span>
        <span>{{ " ‘"+ currentChoice.name+"’ " }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAction(0)">Cancel</el-button>
          <el-button type="danger" @click="dialogAction(1)">Delete</el-button>
        </span>
      </el-dialog>
    </div>

    <template v-else>
      <div style="background-color: white;padding:20px 30px;margin: 20px 25px;border-radius: 4px">
        <el-table
          :data="userList"
          style="width: 100%;margin-top: 10px;"
          stripe
          height="470"
        >
          <el-table-column
            prop="id"
            label="ID"
            width="70"
          />
          <el-table-column
            prop="name"
            label="Name"
            width="100"
            sortable
          />
          <el-table-column
            prop="gender"
            label="Gender"
            width="70"
            show-overflow-tooltip
          />
          <el-table-column
            prop="birthday"
            label="Birthday"
            :formatter="tableTimeStampToTime.bind(this,'birthday')"
            show-overflow-tooltip
          />
          <el-table-column
            prop="email"
            label="E-mail"
            width="150"
            show-overflow-tooltip
          />
          <el-table-column
            prop="phone"
            label="Phone"
            show-overflow-tooltip
          />
          <el-table-column
            prop="description"
            label="Description"
            show-overflow-tooltip
            width="100"
          />
          <el-table-column
            label="Site"
          >
            <template slot-scope="scope">
              <el-tag v-for="(value,index) in scope.row.organization" :key="index" style="margin:1px ">{{ value.site_title }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="CreateTime"
            :formatter="tableTimeStampToTime.bind(this,'create_time')"
            show-overflow-tooltip
            width="130"
            sortable
          />
          <el-table-column
            prop="update_time"
            label="UpdateTime"
            :formatter="tableTimeStampToTime.bind(this,'update_time')"
            show-overflow-tooltip
            width="130"
            sortable
          />

          <el-table-column
            prop="is_deleted"
            label="Deleted"
          />
        </el-table>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserList, userDelete } from '@/api/admin-model/user.js'
import { tableTimeStampToTime, timestampToTime } from '@/utils/transform.js'

export default {
  data() {
    return {
      userList: [],
      listType: 'Card',
      dialogVisible: false,
      currentChoice: {
        user_id: '',
        name: ''
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
      this.getUserList()
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    tableTimeStampToTime,
    timestampToTime,
    getUserList() {
      const data = {
        token: this.token
      }
      getUserList(data).then(response => {
        this.userList = response.result
      })
    },
    onClickMenu(page, user_info) {
      if (page === 'Delete') {
        this.currentChoice = user_info
        this.dialogVisible = true
      } else if (page === 'CreateUser') {
        this.$router.push({
          name: page
        })
      } else if (page === 'ChangePassword') {
        console.log(user_info)
        this.$router.push({
          name: page,
          query: { user_id: user_info.user_id, user_name: user_info.name }
        })
      } else {
        this.$router.push({
          name: page,
          query: { user_id: user_info.user_id },
          params: { user_info: user_info }
        })
      }
    },
    dialogAction(value) {
      if (value) {
        const data = {
          user_id: this.currentChoice.user_id,
          token: this.token
        }
        userDelete(data).then(response => {
          if (response.status === '200') {
            this.getUserList()
            this.dialogVisible = false
          }
        })
      } else {
        this.dialogVisible = false
      }
    }
  }
}
</script>
<style lang="scss">
  @import "@/styles/global-color.scss";
  .user-avatar {
    position: absolute;
    border-radius: 100%;
    top: -15%;
    left:calc(50% - 20px);;
    box-shadow: 0 0 0 1px #b0a5a4, 0 0 0 5px #fff;
    background-color: #FFFFFF;
  }
  .user-card{
    position: relative;
    border-radius:5px;
    margin-bottom: 50px;
  }
  .card-container{
    margin-top: 45px;
    width: calc(100%)
  }
  .user-card-group{
    text-align: center;
    vertical-align: middle;
  }
</style>
