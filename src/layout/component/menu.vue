<template>
    <el-row class="tac menu-container">
        <el-col :span="24" style='height: 100%;'>
            <el-menu
                    :default-active="$route.path"
                    :collapse="isCollapse"
                    background-color="#304156"
                    text-color="rgb(191, 203, 217)"
                    @select="selectionChildMenu"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <childMenu :menu-list="menuList" />
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
  import {menuList} from '@src/routes/menuList'
  import {routes} from '@src/routes/routes'
  import childMenu from "./childMenu";
  export default {
    name: "MyMenu",
    components: {
      childMenu
    },
    data() {
      return {
        isCollapse: false,
        menuList: menuList,
        otherMenuList: [],
        routes: routes
      }
    },
    mounted() {
      this.$bus.$on('pushHistoryNav', (msg) => {
        this.pushHistoryRoutes(msg)
      })
      this.pushHistoryRoutes(this.$route.path)
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
      // 菜单平铺
      menuListForOne(menus) {
        menus.forEach((item) => {
          this.otherMenuList.push(item)
          if(item.children && item.children.length > 0) {
            this.menuListForOne(item.children)
          }
        })
      },
      pushHistoryRoutes(path) {
        console.log(path)
        const routes = this.routes.routes[0].children.filter((result) => {
          return result.path === path
        })[0]

        if(!routes.title) {
          routes.title = routes.name || ''
        }
        if(routes) {
          this.$emit('pushRouter', routes)
        }
      },
      selectionChildMenu(index, paths) {
        this.otherMenuList = []
        const path = paths[paths.length-1]
        if(path === null) {
          return
        }
        let basePath = this.$route.matched[0].path
        this.pushHistoryRoutes(basePath+path)
        this.$router.push(routes.routes[0].path + path)
      }
    }
  }
</script>

<style scoped>
    .menu-container{
        height: 100%;
    }
</style>