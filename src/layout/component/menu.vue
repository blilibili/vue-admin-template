<template>
    <el-row class="tac menu-container">
        <el-col :span="24" style='height: 100%;'>
            <el-menu
                    :collapse="isCollapse"
                    background-color="#304156"
                    text-color="rgb(191, 203, 217)"
                    @select="selectionChildMenu"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                <template v-for="(item, index) in menuList">
                    <el-submenu :index="item.name" v-if="item.children && item.children.length > 0">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <el-menu-item :index="idx.path" v-for="(idx, key) in item.children" >
                            <i :class="idx.icon"></i>
                            <span slot="title">{{idx.title}}</span>
                        </el-menu-item>
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
    name: "menu",
    data() {
      return {
        isCollapse: false,
        menuList: menuList
      }
    },
    mounted() {
      console.log(this.menuList)
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      },
      selectionChildMenu(index, path) {
        if(index === null) {
          return
        }
        this.$router.push(index)
      }
    }
  }
</script>

<style scoped>
    .menu-container{
        height: 100%;
    }
</style>