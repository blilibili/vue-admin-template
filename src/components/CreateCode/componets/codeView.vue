<template>
    <div class="code-viewer">
        <div v-for="(item, index) in activeComponentList">
            <el-form v-if="item.type === 'form'" ref="form" :model="form" label-width="80px">

            </el-form>

            <div v-else-if="item.type === 'text'">
                {{item.value}}
            </div>

            <div v-else-if="item.type === 'input'">
                <el-input type="text"></el-input>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "codeView",
    props: {
      activeComponentList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        form: {

        }
      }
    }
  }
</script>

<style scoped>
    .code-viewer{
        min-height: 650px;
        width: 375px;
        border: 1px solid lightgray;
    }
</style>