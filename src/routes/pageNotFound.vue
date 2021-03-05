<template>
    <div>页面丢失啦</div>
</template>

<script>
  export default {
    name: "pageNotFound",
    created() {
      window.location.href = "/my-new-404-page.html";
    }
  }
</script>

<style scoped>

</style>