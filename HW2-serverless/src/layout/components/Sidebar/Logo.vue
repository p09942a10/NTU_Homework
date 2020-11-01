<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="collapse" :src="logo" class="collapse-sidebar-logo">
        <img v-else :src="logo" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logo from '@/assets/Kevin/logo.png'
import icon from '@/assets/Kevin/icon.png'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Kevin'
    }
  },
  computed: {
    logo() {
      const url = this.collapse ? icon : logo
      return url
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/styles/global-color.scss";
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 80px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  background-color: $menuBg;
  border-style:none none solid none;
  border-width: 1.5px;
  border-color: $border;
  & .sidebar-logo-link {
    height: 99%;
    width: 99%;

    & .sidebar-logo {
      width: 100px;
      height: 100px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .collapse-sidebar-logo {
      width: 50px;
      height: 50px;
      margin-right: 12px;
      margin: 0;
      margin-top: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color:black;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
