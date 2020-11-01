<template>
  <div class="page-container">
    <div
      style="display: inline-block;padding: 20px 50px;width:calc(100%);margin-bottom:10px;top: 0;background-color:white;min-width: 360px;box-shadow: 0 0 3px #888888;"
    >
      <b style="font-size: 32px">Site</b>
      <span style="font-size: 28px;color: #d81e06;margin-left: 10px">{{ company_title }}</span>
      <el-divider content-position="center" direction="vertical" />
      <el-button
        type="danger"
        icon="el-icon-plus"
        style="vertical-align: middle;"
        class="hidden-xs-only"
        @click="handleCreateSite"
      >Create Site
      </el-button>
      <el-button type="danger" icon="el-icon-plus" class="hidden-sm-and-up" @click="handleCreateSite" />
    </div>
    <div v-for="(value,index) in siteList" :key="index" style="margin-left: 40px">
      <h2 style="">{{ value.company_title }}</h2>
      <!--  value     { "company_id": "1", "company_title": "文化大學 ", "site_count": 2, "site_info": [ { "site_id": "1", "title": "文化推廣部", "phone": "0988888666", "is_deleted": "0", "description": "", "user_count": 1 }, { "site_id": "5", "title": "推廣部", "phone": "0988272727", "is_deleted": "0", "description": "", "user_count": 1 } ] }-->
      <el-divider />
      <el-row class="site-card-group" :gutter="25" style="margin:10px 20px">
        <el-col
          v-for="(item,index) in value.site_info"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          class="site-card"
        >
          <!--  item  { "site_id": "1", "title": "文化推廣部", "phone": "0988888666", "is_deleted": "0", "description": "", "user_count": 1 }-->
          <el-card shadow="hover">
            <span>{{ item.title }}</span>
            <br>
            <el-button-group style="margin-top: 20px">
              <el-button type="info" icon="el-icon-edit" size="small" @click="handleEditSite(item,value.company_id,value.company_title)">Edit</el-button>
              <el-badge :value="item.user_count" class="item">
                <el-button type="primary" icon="el-icon-s-custom" size="small" @click="clickUser(item.site_id,item.title)">User</el-button>
              </el-badge>
            </el-button-group>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSiteList } from '@/api/admin-model/site'

export default {
  name: 'Site',
  data() {
    return {
      company_title: '',
      siteList: []
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
    this.getSiteList()
  },
  methods: {
    getSiteList() {
      this.company_title = ''
      const data = {
        token: this.token,
        company_id: this.$route.query.company_id ? this.$route.query.company_id : ''
      }
      getSiteList(data).then(response => {
        console.log(response)
        this.siteList = response.result
        this.company_title = this.$route.query.company_title
      })
    },
    handleCreateSite() {
      this.$router.push({
        name: 'CreateSite',
        query: {
          company_id: this.$route.query.company_id
        }
      })
    },
    handleEditSite(site_info, company_id, company_title) {
      const company_info = {
        company_id: company_id,
        company_title: company_title
      }
      this.$router.push({
        // path: '/admin/company/edit-company',
        name: 'EditSite',
        query: { site_id: site_info.site_id },
        params: {
          site_info: site_info,
          company_info: company_info
        }
      })
    },
    clickUser(site_id, site_title) {
      this.$router.push({
        // path: '/admin/company/edit-company',
        name: 'SiteUserList',
        query: {
          site_id: site_id,
          site_title: site_title }
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

  .site-card {
    height: 100px;
    margin-bottom: 50px;
    font-size: large;
    text-align: center;
    font-weight: bold;
    min-width: 270px;
  }

</style>
