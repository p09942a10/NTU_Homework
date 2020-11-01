<template>
  <div class="set-ui-page-container">
    <div
      style="display: inline-block;padding: 20px 40px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 400px;box-shadow: 0 0 3px #888888;"
    >
      <div class="hidden-xs-only">
        <b style="font-size: 32px">Admin Management System</b>
        <el-button type="info" icon="el-icon-caret-left" style="float: right;" @click="handleBack">
          back
        </el-button>
      </div>
      <div class="hidden-sm-and-up">
        <b style="font-size: 20px;">Admin Management System</b>
        <el-button type="info" icon="el-icon-caret-left" style="float: right;padding: 12px" @click="handleBack" />
      </div>
    </div>
    <div style="background-color: white;padding:30px;margin: 15px 20px 0 36px;border-radius: 4px;min-height: 68vh">
      <el-checkbox-group v-model="selectionList">
        <el-row>
          <el-col
            v-for="(value,key) in adminList"
            :key="key"
            :xs="{span:12}"
            :sm="{span:6}"
            :lg="{span:6}"
            :xl="{span:4}"
            style="margin-bottom: 20px"
          >
            <el-checkbox
              :label="value.user_id"
              border
              :checked="value.is_ui_admin"
              style="width: calc(90%);height: 120px;margin:0 auto;"
            >
              <div class="admin-sys-span">
                <b>{{ value.name }}</b><br>
                <p>{{value.email}}</p>
                <p>{{ value.gender }}</p>
              </div>
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
      <!--<p>{{ selecttionList }}</p>-->
      <div style="margin: 30px 20px;">
        <el-button type="primary" size="small" @click="handleUpdate">Update</el-button>
        <el-button type="info" size="small" @click="handleBack">Cancel</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAdminList, updateAdminList } from '@/api/admin-model/administrator'
import admin from '../../../../mock/admin'
export default {
  components: {
  },
  data() {
    return {
      selectionList: [],
      adminList: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.getAdminList()
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    getAdminList() {
      const data = {
        object_id: '0',
        token: this.token
      }
      getAdminList(data).then(response => {
        /* birthday: "455126400"
        description: ""
        email: "Kevin@gmail.com"
        gender: "male"
        is_ui_admin: false
        name: "Kevin"
        phone: "0965877666"
        user_id: "21"*/
        this.adminList = response.result
      })
    },
    handleUpdate() {
      const data = {
        token: this.token,
        object_id: '0',
        user_ids: this.selectionList
      }
      updateAdminList(data).then(response => {
        if (response.status === '200') {
          this.handleBack()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  // 勾選框
  /deep/ .el-checkbox__input .el-checkbox__inner {
    background-color: #fff;
    border-color: #6c7c92;
    border-radius: 100%;
    margin-top: 30px;
    margin-right: 10px;
  }
  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
    border: 2px solid #6c7c92;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    top: 1px;
    width: 3px;
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  //文字超出換行
  /deep/ .el-checkbox__label {
    word-break: normal;
    width: auto;
    display: inline-grid;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
    block-size: inherit;
    line-height: 14px;
  }
  // 一行一項
  /deep/ .el-checkbox {
    width: 100%;
    margin-top: 20px;
    padding-top: 10px;
  }
  .set-ui-page-container{
    min-width: 400px;
    clear: both;
    .el-checkbox.is-bordered{
     }
    .el-checkbox.is-bordered.is-checked{
      background-color: rgb(228,246,254);
    }
  }

</style>
