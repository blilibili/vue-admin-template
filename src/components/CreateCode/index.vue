<template>
    <div class="code-create-container">
        <ComponentList
                :actived-index="activeComponent"
                @dragFinishEmit="dragFinishEmitMethods"
                @updateAttributeEmit="updateAttributeMethods"
        />
        <CodeView :active-component-list="activeComponentList" ref="codeView" />
    </div>
</template>

<script>
  import CodeView from './componets/codeView'
  import ComponentList from './componets/componentList'
  export default {
    name: "index",
    components: {
      CodeView,
      ComponentList
    },
    data() {
      return {
        activeComponentList: [],
        activeComponent: -1
      }
    },
    mounted() {
      let targetX = this.$refs.codeView.$el.offsetLeft
    },
    methods: {
      dragFinishEmitMethods(msg) {
        let codeObj = {
            type: msg.target.dataset.type,
            value: '默认值'
        }

        this.activeComponentList.push(codeObj)
        this.activeComponent = this.activeComponentList.length - 1
      },
      updateAttributeMethods(msg) {
        const {fields, value} = msg
        this.activeComponentList[this.activeComponent][fields] = value
      }
    }
  }
</script>

<style scoped>
    .code-create-container{
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }
</style>