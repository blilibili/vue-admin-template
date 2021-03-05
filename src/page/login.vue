<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>登录</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="users" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="users.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="users.pass" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        users: {
          name: '',
          pass: ''
        }
      }
    }
  }
</script>

<style scoped>
    .container{
        background-color: #909399;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>