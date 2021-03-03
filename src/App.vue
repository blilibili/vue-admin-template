<template>
  <div id="app">
      <mainSkeleton>
          <template v-slot:skeleton-body>
              <router-view></router-view>
          </template>
      </mainSkeleton>
  </div>
</template>

<script>
import mainSkeleton from "./layout/mainSkeleton"
export default {
  name: 'App',
  components: {
    mainSkeleton
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
    height: 100%;
}
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}
.el-menu {
    height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse){
    width: 210px;
    height: 100%;
}
</style>
