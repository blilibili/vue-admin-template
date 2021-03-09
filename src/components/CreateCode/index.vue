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

                    <el-form-item label="options" v-if="componentType === 'select'">
                        options: {{JSON.stringify(selectionOptionsArr)}}
                        <el-button size="mini" @click="addNewSelectOptions">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="表单属性" name="second">
                <el-form ref="form" label-position="left" :model="formAttrObj" label-width="80px">
                    <el-form-item label="列">
                        <el-input v-model="formAttrObj.col"></el-input>
                    </el-form-item>
                    <el-form-item label="对齐">
                        <el-radio-group v-model="formAttrObj.align">
                            <el-radio-button label="left">左对齐</el-radio-button>
                            <el-radio-button label="right">右对齐</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <div class="create-code-footer">
            <el-button type="primary" @click="createCodeByArr">生成源码</el-button>
        </div>

        <el-dialog
                title="新增select options"
                :visible.sync="addOptions"
                width="50%"
        >
            <div>
                <div v-for="(item, index) in selectionOptionsArr" style="display: flex;justify-content: space-around;margin-top: 8px;">
                    <div>
                        <span style="margin-right: 10px;">名称</span>
                        <el-input type="text" v-model="item.label" style="width: 300px;"></el-input>
                    </div>
                    <div>
                        <span style="margin-right: 10px;">值</span>
                        <el-input type="text" v-model="item.value" style="width: 300px;"></el-input>
                        <span class="el-icon-circle-plus-outline" style="margin-left: 8px;display: inline-block;cursor:pointer;" @click="addNewOptions"></span>
                        <span class="el-icon-remove-outline" style="margin-left: 8px;display: inline-block;cursor:pointer;" @click="removeSelectOptions(index)"></span>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOptions = false">取 消</el-button>
                <el-button type="primary" @click="addNewOptionsByIndex">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import CodeView from './componets/codeView'
  import ComponentList from './componets/componentList'
  import {translater} from './translater'
  export default {
    name: "index",
    components: {
      CodeView,
      ComponentList
    },
    data() {
      return {
        selectionOptionsArr: [
          {
            label: '',
            value: ''
          }
        ],
        addOptions: false,
        formAttrObj: {
          col: '',
          align: 'left'
        },
        activeName: 'first',
        activeComponentList: [
          {
            type: 'form',
            children: []
          }
        ],
        activeComponent: -1,
        componentType: '',
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
      addNewOptionsByIndex() {
        let options = this.selectionOptionsArr.slice()
        let targetIndex = this.activeComponent
        this.activeComponentList[0].children[targetIndex].options = options
        this.activeComponentList[0].children.splice(0,0)
        this.addOptions = false
      },
      removeSelectOptions(index) {
        if(this.selectionOptionsArr.length === 1) {
          this.$message.error('至少保留一个')
          return
        }
        this.selectionOptionsArr.splice(index, 1)
      },
      addNewOptions() {
        const addObj = {
          label: '',
          value: ''
        }
        this.selectionOptionsArr.push(addObj)
      },
      addNewSelectOptions() {
        this.addOptions = true
      },
      createCodeByArr() {
        let codeStr = translater(this.activeComponentList.slice(), this.formAttrObj)
        console.log('生成源码', codeStr)
      },
      activedComponentByIndexMethods(msg) {
        const {row, index} = msg
        Object.keys(this.attributeObj).forEach((key) => {
          this.attributeObj[key] = row[key]
        })
        this.componentType = row.type
        this.activeComponent = index
      },
      handleClick() {

      },
      dragFinishEmitMethods(msg) {
        let codeObj = {
            type: msg.target.dataset.type,
            value: '默认值',
            height: 300,
            width: '150',
            label: '标签'
        }

        if(msg.type === 'select') {
          codeObj.options = []
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
        position: relative;
    }
    .fields-attribute{
        width: 300px;
    }

    .create-code-footer{
        position: absolute;
        bottom: -33px;
        text-align: center;
        width: 100%;
    }
</style>