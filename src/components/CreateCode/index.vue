<template>
    <div class="code-create-container">
        <ComponentList
                :actived-index="activeComponent"
                @dragFinishEmit="dragFinishEmitMethods"
                @updateAttributeEmit="updateAttributeMethods"
        />
        <div class="code-view-box">
            <CodeView
                    :active-component-list="activeComponentList"
                    :rows-attr-config="formAttrObj"
                    ref="codeView"
            />
        </div>

        <el-tabs class="fields-attribute" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="字段属性" name="first">
                <el-form ref="form" label-position="left" :model="attributeObj" label-width="80px">
                    <el-form-item label="宽度">
                        <el-input v-model="attributeObj.width" @blur="updateAttributeByIndex('width')"></el-input>
                    </el-form-item>

                    <el-form-item label="span">
                        <el-input v-model="attributeObj.span" @blur="updateAttributeByIndex('span')"></el-input>
                    </el-form-item>

                    <el-form-item label="model">
                        <el-input v-model="attributeObj.model" @blur="updateAttributeByIndex('model')"></el-input>
                    </el-form-item>

                    <el-form-item label="标签">
                        <el-input v-model="attributeObj.label" @blur="updateAttributeByIndex('label')"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="表单属性" name="second">
                <el-form ref="form" label-position="left" :model="formAttrObj" label-width="80px">
                    <el-form-item label="列">
                        <el-input v-model="formAttrObj.col"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
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
        formAttrObj: {
          col: ''
        },
        activeName: 'first',
        activeComponentList: [
          {
            type: 'form',
            children: []
          }
        ],
        activeComponent: -1,
        attributeObj: {
          width: '',
          span: '',
          model: '',
          label: ''
        }
      }
    },
    mounted() {
      let targetX = this.$refs.codeView.$el.offsetLeft
      this.$bus.$on('activedComponentByIndex', (msg) => {
        this.activedComponentByIndexMethods(msg)
      })
    },
    methods: {
      activedComponentByIndexMethods(msg) {
        const {row, index} = msg
        Object.keys(this.attributeObj).forEach((key) => {
          this.attributeObj[key] = row[key]
        })
        this.activeComponent = index
      },
      handleClick() {

      },
      dragFinishEmitMethods(msg) {
        let codeObj = {
            type: msg.target.dataset.type,
            value: '默认值',
            height: 300,
            width: '50%',
            label: '标签'
        }

        // 先默认第一个是表单  暂时没有想到拖拽嵌套应该怎么写
        this.activeComponentList[0].children.push(codeObj)
        this.activeComponent = this.activeComponentList.length - 1
      },
      updateAttributeByIndex(model) {
        this.activeComponentList[0].children[this.activeComponent][model] = this.attributeObj[model]
        this.activeComponentList.splice(0,0)
        this.activeComponentList[0].children.splice(0,0)
        console.log(this.activeComponentList[0].children)
      },
      updateAttributeMethods(msg) {
        const {fields, value} = msg
        this.activeComponentList[this.activeComponent][fields] = value
      }
    }
  }
</script>

<style scoped>
    .code-view-box{
        width: 960px;
        border: 1px solid lightgray;
        min-height: 650px;
    }
    .code-create-container{
        padding: 15px;
        display: flex;
        justify-content: space-between;
    }
    .fields-attribute{
        width: 300px;
    }
</style>