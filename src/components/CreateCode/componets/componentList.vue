<template>
    <div class="component-list-view">
        <div class="component-fields-box">
            <div>基础字段</div>
            <div class="component-box">
                <div v-for="(item, index) in componentList" class="component-col">
<!--                    <draggable-->
<!--                            :data-type="item.type"-->
<!--                            :options="{group:'people'}"-->
<!--                            :sort="false"-->
<!--                            @end="onDragend"-->
<!--                            @move="onDragenter"-->
<!--                    >-->
<!--                        <div>{{item.label}}</div>-->
<!--                        <div>{{item.eng}}</div>-->
<!--                    </draggable>-->

                    <div
                            :data-type="item.type"
                            draggable
                            @dragend.stop="onDragend"
                            @dragenter.stop="onDragenter"
                    >
                        <div>{{item.label}}</div>
                        <div>{{item.eng}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="attribute-box" v-if="false">
            <div class="attribute-box-row">
                <div class="attribute-box-col">
                    标签宽度：<el-input v-model="attribute.labelWidth" @blur="updateAttribute('labelWidth')" size="mini" class="attribute-input" />
                </div>
                <div class="attribute-box-col">
                    栅格比例：<el-input v-model="attribute.span" @blur="updateAttribute('span')" size="mini" class="attribute-input" />
                </div>

                <div class="attribute-box-col">
                    内容：<el-input v-model="attribute.value" @blur="updateAttribute('value')" size="mini" class="attribute-input" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: "componentList",
    components: {
      draggable
    },
    props: {
      validateX: {
        type: Number,
        default: 0
      },
      activedIndex: {
        type: Number,
        default: -1
      }
    },
    data() {
      return {
        attribute: {
          labelWidth: '',
          span: '',
          value: ''
        },
        componentList: [
          // {
          //   label: '表单',
          //   eng: 'Form',
          //   type: 'form'
          // },
          {
            label: '输入框',
            eng: 'Input',
            type: 'input'
          },
          {
            label: '下拉框',
            eng: 'Select',
            type: 'select'
          },
          {
            label: '文本',
            eng: 'Text',
            type: 'text'
          }
        ]
      }
    },
    methods: {
      onEnd(ev) {

      },
      updateAttribute(model) {
        const val = this.attribute[model]
        this.$emit('updateAttributeEmit', {fields: model, value: val})
      },
      onDragend(ev) {
        this.$emit('dragFinishEmit', ev)
      },
      onDragenter(ev) {

      }
    }
  }
</script>

<style scoped>
    .attribute-box-row{
        display: flex;
    }
    .attribute-box{
        border-top: 1px solid lightgray;
        position: absolute;
        bottom: 0;
        /*padding: 10px;*/
        /*width: 100%;*/
        box-sizing: border-box;
    }
    .attribute-box-col:not(:first-child) {
        margin-left: 10px;
    }
    .component-box{
        margin-top: 8px;
        width: 200px;
        display: flex;
    }
    .component-col{
        width: 80px;
    }
    .component-fields-box{
        width: 150px;
    }
    .component-list-view{
        position: relative;
        /*border: 1px solid lightgray;*/
        /*width: 100%;*/
        height: 650px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
    }
    .attribute-input{
        width: 80px;
    }
</style>