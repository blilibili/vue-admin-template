<template>
    <div class="history-nav-container">
        <el-tag
                style="margin-left: 5px;cursor: pointer;"
                @click="clickHistoryTagMethods(tag)"
                @close="delHistoryTagMethods(tag, index)"
                v-for="(tag, index) in history"
                :key="tag.title"
                closable
                effect="plain"
                size="small"
                :type="tag.type">
            {{tag.title}}
        </el-tag>
    </div>
</template>

<script>
  export default {
    name: "historyNav",
    props: {
      history: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        tags: [
          {
            name: '测试1',
            type: ''
          }
        ]
      }
    },
    methods: {
      clickHistoryTagMethods(item) {
        this.$router.push(item.path)
      },
      delHistoryTagMethods(row , index) {
        this.$emit('delHistoryTagEmit', index)
      }
    }
  }
</script>

<style scoped>
    .history-nav-container{
        margin-top: 5px;
        padding: 8px;
        background: white;
        position: relative;
        box-shadow: 0 1px 4px rgb(0 21 41/8%);
        width: 100%;
        box-sizing: border-box;
    }
</style>