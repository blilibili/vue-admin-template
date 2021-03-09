<template>
    <div class="code-viewer">
        <div v-for="(item, index) in activeComponentList">
            <el-form
                    v-if="item.type === 'form' && rowsAttrConfig.col === ''"
                    :style="`height: ${item.height}px;`"
                    ref="form"
                    :model="form"
                    label-position="left"
                    label-width="80px">
                <codeView v-if="item.children && item.children.length > 0" :rows-attr-config="rowsAttrConfig" :active-component-list="item.children" />
            </el-form>

            <el-form
                    v-else-if="item.type === 'form' && rowsAttrConfig.col !== ''"
                    :inline="true"
                    :model="form"
                    class="demo-form-inline"
                    label-position="left"
            >
                <el-row>
                    <codeView v-if="item.children && item.children.length > 0" :rows-attr-config="rowsAttrConfig" :active-component-list="item.children" />
                </el-row>
            </el-form>

            <div v-else-if="item.type === 'text'">
                {{item.value}}
            </div>

            <div v-else-if="item.type === 'input'">
                <el-col v-if="rowsAttrConfig.col !== ''" :span="parseInt(24 / rowsAttrConfig.col, 10)">
                    <el-form-item :label="item.label">
                        <el-input
                                @focus="activedCurrentComponent(item, index)"
                                type="text"
                                :style="{width: item.width.toString().indexOf('%') !== -1 ?`${item.width}`:`${parseInt(item.width, 10)}px`}"
                        ></el-input>
                    </el-form-item>
                </el-col>

                <el-form-item v-else :label="item.label">
                    <el-input
                            @focus="activedCurrentComponent(item, index)"
                            type="text"
                            :style="{width: item.width.toString().indexOf('%') !== -1?`${item.width}`:`${parseInt(item.width, 10)}px`}"
                    ></el-input>
                </el-form-item>
            </div>

            <div v-else-if="item.type === 'select'">
                <el-col v-if="rowsAttrConfig.col !== ''" :span="parseInt(24 / rowsAttrConfig.col, 10)">
                    <el-form-item :label="item.label">
                        <el-select placeholder="请选择" @focus="activedCurrentComponent(item, index)">
                            <el-option
                                    v-for="child in item.options"
                                    :key="child.value"
                                    :label="child.label"
                                    :value="child.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-form-item v-else :label="item.label">
                    <el-select placeholder="请选择" @focus="activedCurrentComponent(item, index)">
                        <el-option
                                v-for="child in item.options"
                                :key="child.value"
                                :label="child.label"
                                :value="child.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "codeView",
    props: {
      rowsAttrConfig: {
        type: Object,
        default: () => {
          return {
            col: ''
          }
        }
      },
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
    },
    methods: {
      testmethods() {
        console.log('介绍')
      },
      activedCurrentComponent(row, index) {
        this.$bus.$emit('activedComponentByIndex', {row: row, index: index})
      }
    }
  }
</script>

<style scoped>

</style>