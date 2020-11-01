<template>
  <div class="navbar">
    <breadcrumb style="margin-left: 35px" class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            v-if="avatar!==''"
            :src="avatar"
            style="width: 55px;height: 55px; border-radius: 100%;box-shadow: 0 0 0 1px #b0a5a4, 0 0 0 5px #fff;"
          >
          <svg-icon
            v-else
            icon-class="admin-user"
            style="width: 60px;height: 60px;border-radius: 100%;box-shadow: 0 0 0 1px #b0a5a4, 0 0 0 5px #fff;"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/admin/admin-management-system">
            <el-dropdown-item>
              Set Admin
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item divided>
              UI Selector
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/global-color.scss";
  .navbar {
    height: 80px;
    overflow: hidden;
    position: relative;
    background: $navBar;
    border-style:none none solid none;
    border-width: 1.5px;
    border-color: $border;

    .hamburger-container {
      line-height: 70px;
      height: 100%;
      float: left;
      margin-left: 10px;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      line-height: 70px;
      float: left;
      font-size: large;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 15px;
          position: relative;


          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
