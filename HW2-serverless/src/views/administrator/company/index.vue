<template>
  <div class="page-container">
    <div
      style="display: inline-block;padding: 20px 50px;width:calc(100%);margin-bottom:20px;top: 0;background-color:white;min-width: 360px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">Company</b>
      <el-divider content-position="center" direction="vertical" />
      <el-button
        type="danger"
        icon="el-icon-plus"
        style="vertical-align: middle;"
        class="hidden-xs-only"
        @click="handleCreateCompany"
      >Create Company
      </el-button>
      <el-button type="danger" icon="el-icon-plus" class="hidden-sm-and-up" @click="handleCreateCompany"/>
    </div>
    <el-row class="company-card-group" :gutter="25" style="margin:10px 20px">
      <el-col v-for="(value,index) in companyList" :key="index" :xs="24" :sm="12" :md="8" :lg="6" class="company-card">
        <el-card shadow="hover">
          <div>{{ value.title }}</div>
          <div style="font-weight: normal;font-size:15px;margin: 12px 0 7px 0;color: grey">{{ value.phone }}</div>
          <div style="font-weight: normal;font-size:15px;color: grey">{{ value.address }}</div>
          <br>
          <el-button-group>
            <el-button type="info" icon="el-icon-edit" size="small" style="width: 120px" @click="handleEditCompany(value)">Edit</el-button>
            <el-button icon="el-icon-s-custom" size="small" style="width: 120px" @click="handleSetManager(value.company_id,value.title)">Set Manager</el-button>
          </el-button-group>
          <br>
          <el-button
            type="site"
            icon="el-icon-menu"
            style="margin-top: 10px;background: #efb336;border-color:#efb336;color: white;"
            size="small"
            @click="clickSite(value.company_id,value.title) "
          >
            <div style="display: inline-block">Site</div>
            <div style="border-radius: 100%;margin-left:2px;background-color: #bbc3cc;padding:1.5px 0 0 0;width: 15px;height: 15px;display: inline-block">{{ value.site_count }}</div>
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyList } from '@/api/admin-model/company'

export default {
  name: 'Company',
  data() {
    return {
      companyList: []
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  watch: {
    '$route'(to, from) {
      this.getCompanyList()
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    getCompanyList() {
      getCompanyList(this.token).then(response => {
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
    handleCreateCompany() {
      this.$router.push({ name: 'CreateCompany' })
    },
    handleEditCompany(company_info) {
      this.$router.push({
        // path: '/admin/company/edit-company',
        name: 'EditCompany',
        query: { company_id: company_info.company_id },
        params: { company_info: company_info }
      })
    },
    handleSetManager(company_id, company_title) {
      this.$router.push({
        name: 'SetCompanyManager',
        query: {
          company_id: company_id,
          company_title: company_title
        }
      })
    },
    clickSite(company_id, company_title) {
      this.$router.push({
        name: 'CompanySiteList',
        query: {
          company_id: company_id,
          company_title: company_title
        }
      })
    }
  }
}
</script>
<style lang="scss">
  @import "@/styles/global-color.scss";

  .page-container {
    background-color: $app-background;
    position: relative;
    min-height: inherit;
    padding: 0 0 10px 0;

    .el-card__body {
      padding: 20px 0;
    }
  }
  .el-button--site:focus, .el-button--site:hover{
    background:$site-color!important;
border-color: $site-color!important;
    color:white;
  }
  .company-card {
    height: 150px;
    margin-bottom: 90px;
    font-size: large;
    text-align: center;
    font-weight: bold;
    min-width: 270px;
  }

</style>
