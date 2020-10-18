<template>
  <div class="app-container">
    <el-row class="selection-group" :gutter="50">
      <div class="ui-navbar">
        <navbar />
      </div>
      <el-col :xs="24" :sm="12" :lg="8" class="ui-selection">
        <el-button class="selection-button" @click="handleClick('weather')">
          <el-card shadow="hover" class="card">
            <el-divider content-position="left">
              <svg-icon
                icon-class="photo"
                class="select-avatar"
                style="width: 60px;height: 60px"
              />
            </el-divider>
            <div style="margin: 40px 0 40px 0;font-weight: bolder">天氣預報</div>
            <el-divider content-position="right">
              <span style="font-weight: bold;color: #dea874">Kevin</span>
            </el-divider>
          </el-card>
        </el-button>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="ui-selection">
        <el-button class="selection-button" disabled @click="handleClick('not_yet')">
          <el-card shadow="hover" class="card">
            <el-divider content-position="left">
              <svg-icon
                icon-class="x"
                class="select-avatar"
                style="width: 60px;height: 60px"
              />
            </el-divider>
            <div style="margin: 40px 0 40px 0;font-weight: bolder">暫未開放</div>
            <el-divider content-position="right">
              <span style="font-weight: bold;color: #dea874">Kevin</span>
            </el-divider>
          </el-card>
        </el-button>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8" class="ui-selection">
        <el-button class="selection-button" disabled @click="handleClick('not_yet')">
          <el-card shadow="hover" class="card">
            <el-divider content-position="left">
              <svg-icon
                icon-class="x"
                class="select-avatar"
                style="width: 60px;height: 60px"
              />
            </el-divider>
            <div style="margin: 40px 0 40px 0;font-weight: bolder">暫未開放</div>
            <el-divider content-position="right">
              <span style="font-weight: bold;color: #dea874">Kevin</span>
            </el-divider>
          </el-card>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/layout/components/UI-Selector-Navbar.vue'
import 'element-ui'

export default {
  name: 'UISelector',
  components: { 'navbar': Navbar },
  data() {
    return {
      uiList: []
    }
  },
  watch: {
    isAdmin: function(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.isAdmin = newValue
      }
    },
    deep: true
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
  },
  methods: {
    handleClick(value) {
      const that = this
      switch (value) {
        case 'weather': {
          this.$store.dispatch('user/setRole', that.token).then(() => {
            this.$router.push({ name: 'Weather' })
          }).catch((err) => {
            console.log((err))
          })
          break
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import "@/styles/global-color.scss";

  .ui-navbar {
    position: absolute;
    top: 15px;
    right: 30px;
  }

  .selection-button {
    border-width: 0px;
    padding: 0 0 0 0;
    width: calc(100% - 32px);
    position: relative;
    line-height: 100%;
    text-align: center;
    border-radius: 5px;
  }

  .selection-group {

    display: table-cell;
    vertical-align: middle;

    .card {
      min-height: 150px;
      min-width: 150px;
      text-align: center;
      border-color: #dfdfdf;
    }

    .ui-selection {
      margin: 50px 0 10px 0;
    }

    .el-card__body {
      padding: 30px 0 0 0;
      font-size: large;
      text-align: center;
    }
  }

  .select-avatar {
    border-radius: 30%;
    padding: 5px;
    box-shadow: 0 0 0 1px #b0a5a4, 0 0 0 5px #fff;
    background-color: #FFFFFF;
  }

  .admin-type {
    float: right;
    padding-right: 20px;
    color: $admin-color;
    font-size: small;
  }

  .company-type {
    float: right;
    padding-right: 20px;
    color: $company-color;
    font-size: small;
  }

  .site-type {
    float: right;
    padding-right: 20px;
    color: $site-color;
    font-size: small;
  }
</style>
