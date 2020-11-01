<template>
  <div>

  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: { type: String },
    back: { type: String }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>
