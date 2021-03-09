<template>
    <div>
        我是首页
        <el-button @click="goToTest">跳转</el-button>
        <el-form  label-position="left" :inline="true" :model="form" class="demo-form-inline">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="标签">
                        <el-select placeholder="请选择">
                            <el-option
                                    v-for='idx in [{"label":"1","value":"2"},{"label":"3","value":"4"}]'
                                    :key="idx.value"
                                    :label="idx.label"
                                    :value="idx.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: "home",
    methods: {
      goToTest() {
        this.$router.push('/test')
      }
    }
  }
</script>

<style scoped>

</style>