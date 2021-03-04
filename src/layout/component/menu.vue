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
                <template v-for="(item, index) in menuList">
                    <el-submenu :index="'null'" v-if="item.children && item.children.length > 0">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <template v-for="(idx, key) in item.children">
                            <el-menu-item :index="idx.path">
                                <i :class="idx.icon"></i>
                                <span slot="title">{{idx.title}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>

                    <el-menu-item :index="item.path" v-else>
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
  import {menuList} from '@src/routes/menuList'
  export default {
    name: "MyMenu",
    data() {
      return {
        isCollapse: false,
        menuList: menuList,
        otherMenuList: []
      }
    },
    mounted() {
      this.otherMenuList = []
      this.menuListForOne(this.menuList)
      const routes = this.otherMenuList.filter((result) => {
        return result.path === this.$route.path
      })[0]
      if(routes) {
        this.$emit('pushRouter', routes)
      }
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
      selectionChildMenu(index, paths) {
        this.otherMenuList = []
        const path = paths[paths.length-1]
        if(path === null) {
          return
        }

        this.menuListForOne(this.menuList)
        const routes = this.otherMenuList.filter((result) => {
          return result.path === path
        })[0]
        console.log(routes)
        if(routes) {
          this.$emit('pushRouter', routes)
        }
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>
    .menu-container{
        height: 100%;
    }
</style>