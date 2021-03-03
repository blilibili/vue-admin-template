<template>
    <div class="main-skeleton-container">
        <div class="left-menu-container">
            <Menu ref="menuRef" />
        </div>
        <div class="right-content-container">
            <Header @openOrHideMenu="openOrHideMenuMethods" />
            <div class="right-content-container-slot">
                <slot name="skeleton-body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
  import Header from './component/header'
  import Menu from './component/menu'
  export default {
    name: "mainSkeleton",
    components: {
      Header,
      Menu
    },
    data() {
      return {
        headerWidth: 210
      }
    },
    methods: {
      openOrHideMenuMethods() {
        if(!this.$refs.menuRef._data.isCollapse) {
          // this.headerWidth = 65
        } else {
          // this.headerWidth = 210
        }
        this.$refs.menuRef._data.isCollapse = !this.$refs.menuRef._data.isCollapse
      }
    }
  }
</script>

<style scoped>
    .main-skeleton-container{
        width: 100%;
        display: flex;
        height: 100%;
    }
    .left-menu-container{
        flex-shrink: 0;
    }
    .right-content-container{
        /*margin-left: 210px;*/
        width: 100%;
    }
    .right-content-container-slot{
        padding: 15px;
    }
</style>