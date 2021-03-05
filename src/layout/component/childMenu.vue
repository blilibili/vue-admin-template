<template>
    <div>
        <template v-for="(item, index) in menuList">
            <el-submenu :index="`${index}${item.title}`" v-if="item.children && item.children.length > 0">
                <i slot="title" :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
                <child-menu :menu-list="item.children" />
            </el-submenu>

            <el-menu-item :index="item.path" v-else>
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
  export default {
    name: "childMenu",
    props: {
      menuList: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>

</style>