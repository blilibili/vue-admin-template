<template>
    <mainSkeleton>
        <template v-slot:skeleton-body>
            <router-view></router-view>
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