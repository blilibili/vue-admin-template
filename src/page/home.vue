<template>
    <div>
        我是首页
        <el-button @click="goToTest">跳转</el-button>
    </div>
</template>

<script>
  export default {
    name: "home",
    methods: {
      goToTest() {
        this.$router.push('/test')
      }
    }
  }
</script>

<style scoped>

</style>