<template>
    <div class="header-container">
        <div class="el-icon-s-fold" @click="openMenu"></div>
        <div class="block">
            <el-avatar :size="30" :src="circleUrl"></el-avatar>
        </div>
    </div>
</template>

<script>
  export default {
    name: "header",
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
    methods: {
      openMenu() {
        this.$emit('openOrHideMenu')
      }
    }
  }
</script>

<style scoped>
    .header-container{
        box-shadow: 0 1px 4px rgb(0 21 41/8%);
        position: relative;
        background: #fff;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>