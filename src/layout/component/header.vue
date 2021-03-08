<template>
    <div class="header-container">
        <div class="el-icon-s-fold" @click="openMenu"></div>
        <div class="block">
            <el-popover
                    placement="top-start"
                    title=""
                    width="200"
                    trigger="hover"
            >
                <div class="my-list-row">
                    <div class="my-list-col" @click="loginOut">
                        登出
                    </div>
                </div>
                <el-avatar slot="reference" :size="30" :src="circleUrl"></el-avatar>
            </el-popover>
        </div>
    </div>
</template>

<script>
  export default {
    name: "MyHeader",
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
    methods: {
      openMenu() {
        this.$emit('openOrHideMenu')
      },
      loginOut() {
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>
    .my-list-col:hover{
        /*background-color: #eee;*/
    }
    .my-list-col{
        width: 100%;
        cursor: pointer;
    }
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