<template>
    <div>
        我是首页
        <el-button @click="goToTest">跳转</el-button>
        <el-form  label-position="left" :inline="true" :model="form" class="demo-form-inline">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="标签1">
                        <el-select placeholder="请选择">
                            <el-option
                                    v-for='idx in [{"label":"测试","value":"3"},{"label":"测试2","value":"5"}]'
                                    :key="idx.value"
                                    :label="idx.label"
                                    :value="idx.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="标签6">
                        <el-select placeholder="请选择">
                            <el-option
                                    v-for='idx in [{"label":"测试","value":"3"},{"label":"测试2","value":"5"}]'
                                    :key="idx.value"
                                    :label="idx.label"
                                    :value="idx.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="标签2">
                        <el-input type="text" style="width: 150px" />
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