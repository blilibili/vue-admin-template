<template>
    <mainSkeleton>
        <template v-slot:skeleton-body>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </template>
    </mainSkeleton>
</template>

<script>
  import mainSkeleton from "./layout/mainSkeleton"
  export default {
    name: "home",
    components: {
      mainSkeleton
    }
  }
</script>

<style scoped>

</style>