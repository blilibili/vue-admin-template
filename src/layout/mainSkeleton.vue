<template>
    <div class="main-skeleton-container">
        <div class="left-menu-container">
            <MyMenu ref="menuRef" @pushRouter="pushRouterMethods" />
        </div>
        <div class="right-content-container" :style="{width:`calc(100% - ${headerWidth}px)`}">
            <MyHeader @openOrHideMenu="openOrHideMenuMethods" />
            <HistoryNav :history="history" @delHistoryTagEmit="delHistoryTagCallBack" />
            <div class="right-content-container-slot">
                <slot name="skeleton-body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
  import MyHeader from './component/header'
  import MyMenu from './component/menu'
  import HistoryNav from './component/historyNav'
  export default {
    name: "mainSkeleton",
    components: {
      MyHeader,
      MyMenu,
      HistoryNav
    },
    data() {
      return {
        rightWidth: 0,
        headerWidth: 210,
        history: []
      }
    },
    mounted() {
      let widthX = document.body.clientWidth - 210
      this.rightWidth = widthX
    },
    methods: {
      delHistoryTagCallBack(index) {
        this.history.splice(index, 1)
      },
      openOrHideMenuMethods() {
        if(!this.$refs.menuRef._data.isCollapse) {
          // this.headerWidth = 65
        } else {
          // this.headerWidth = 210
        }
        this.$refs.menuRef._data.isCollapse = !this.$refs.menuRef._data.isCollapse
      },
      pushRouterMethods(msg) {
        document.title = msg.name
        const filters = this.history.filter((result) => {
          return result.path === msg.path
        })
        // 没有重复
        if(filters && filters.length === 0) {
          this.history.push(msg)
        }
      }
    },
  }
</script>

<style scoped>
    .main-skeleton-container{
        width: 100%;
        display: flex;
        height: 100%;
        overflow: hidden;
    }
    .left-menu-container{
        flex-shrink: 0;
    }
    .right-content-container{
        /*margin-left: 210px;*/
        /*width: 100%;*/
    }
    .right-content-container-slot{
        padding: 15px;
    }
</style>