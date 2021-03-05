<template>
  <!-- 多选返回事件 changeRow -->
  <div>
    <!--表格 row-key="id" 导致展开有问题-->
    <el-table
      ref="commonTableRef"
      :header-cell-style="{background: '#F5F7FA'}"
      :data="tData"
      style="width: 100%;position: relative;"
      class="commonTable"
      border
      :max-height="tHeight"
      @expand-change="expandChangeMethods"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="$props.isSelection"
        :selectable="isCanSelectionFunc"
        :reserve-selection="$props.isReserveSelect"
        type="selection"
        width="55"
      />
      <el-table-column v-if="$props.isHasExpand" type="expand" width="50" label="明细">
        <template slot-scope="scope">
          <slot
            name="expandSlot"
            :row="scope.row"
            :arrIndex="scope.$index"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="$props.isShowIndex"
        type="index"
        width="50"
        label="序号"
      />
      <el-table-column
        v-for="(item , index) in getCol"
        :key="item.prop + '-' + index + '-' + 'only'"
        :align="item.isCenter?'center': 'left'"
        :show-overflow-tooltip="true"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <!--          <div v-if="item.filter && item.filter === 'date'">-->
          <!--            {{scope.row[item.prop] | transformDate}}-->
          <!--          </div>-->
          <!--          <div v-else-if="item.filter && item.filter === 'times'">-->
          <!--            {{scope.row[item.prop] | transformTimes}}-->
          <!--          </div>-->
          <div v-if="item.filter && item.filter === 'percent'">
            {{ scope.row[item.prop] }}%
          </div>
          <!--有值存在-->
          <div v-else-if="item.filter && item.filter === 'keyValue' && scope.row[item.prop] !== undefined && scope.row[item.prop] !== null">
            {{ item.options[scope.row[item.prop]] }}
          </div>
          <div v-else-if="item.isEdit && item.inputType === 'string'">
            <input v-model="scope.row[item.prop]" type="text" style="padding: 3px;border-radius: 4px;border: 1px solid lightgrey;" @blur="blurInputValue(item.prop , scope.$index , scope.row[item.prop] , item.validateType , scope.row)">
          </div>
          <!--开关控件-->
          <div v-else-if="item.isEdit && item.inputType === 'switch'">
            <el-switch
              :value="scope.row[item.prop]"
              :active-value="item.switchOpt[0]"
              :inactive-value="item.switchOpt[1]"
              :active-text="item.switchOptTip[0]"
              :inactive-text="item.switchOptTip[1]"
              active-color="#13ce66"
              inactive-color="#999999"
              @change="updateStatus(item.prop , scope.row , scope.$index , item.switchOpt)"
            />
          </div>
          <!--单选下拉控件-->
          <div v-else-if="item.isEdit && item.inputType === 'select'">
            <el-select v-model="scope.row[item.prop]" placeholder="请选择" @change="refreshView">
              <el-option
                v-for="(im , idx) in item.dataSource"
                :key="idx"
                :label="im.label"
                :value="im.value"
              />
            </el-select>
          </div>
          <!--自定义 slotName 插槽名称-->
          <div v-else-if="item.prop === 'slot'">
            <slot
              :name="item.slotName"
              :row="scope.row"
              :arrIndex="scope.$index"
            />
          </div>
          <div v-else v-html="scope.row[item.prop]" />
        </template>
      </el-table-column>

      <el-table-column v-if="$props.isHasOpera" fixed="right" :width="parseInt($props.operatingWidth)" label="操作">
        <template slot-scope="scope">
          <slot
            name="operate"
            :row="scope.row"
            :arrIndex="scope.$index"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

// import {FormatDate} from '@/utils/filters'
export default {
  name: 'RulesCommonTable',
  filters: {
    // transformDate(value) {
    //   if (value) {
    //     return FormatDate(new Date(value))
    //   }
    //   return ''
    // },
    // transformTimes(value) {
    //   if (value) {
    //     return FormatDate(new Date(value)).split(' ')[1]
    //   }
    //   return ''
    // }
  },
  props: {
    isHasExpand: {
      type: Boolean,
      default: false
    },
    // 控制操作的长度默认是空
    operatingWidth: {
      type: String || Number,
      default: ''
    },
    // 是否显示序列号
    isShowIndex: {
      type: Boolean,
      default: false
    },
    // 是否展示操作
    isHasOpera: {
      type: Boolean,
      default: true
    },
    // 是否展示跨页全选
    isReserveSelect: {
      type: Boolean,
      default: false
    },
    // 当前第几页
    currentPage: {
      type: Number,
      default: 1
    },
    // 默认发射选中的方法名
    emitSelectionName: {
      type: String,
      default: 'changeRow'
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    tColumnData: {
      type: Array,
      default: () => []
    },
    tData: {
      type: Array,
      default: () => []
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    tHeight: {
      type: Number,
      default: 520
    }
  },
  computed: {
    // 过滤isShow 不展示的值
    getCol() {
      const tmp = []
      this.$props.tColumnData.forEach((v) => {
        if (v.isShow) {
          tmp.push(v)
        }
      })
      return tmp
    }
  },
  mounted() {
    this.$nextTick(() => {
      let calWidth = 0
      this.$props.tColumnData.forEach((v) => {
        calWidth = parseInt(calWidth, 10) + parseInt(v.width, 10)
      })
      const documentWidth = parseInt(this.$refs.commonTableRef.bodyWidth.split('p')[0], 10)

      if (calWidth < documentWidth && document.body.clientWidth > 1366) {
        this.$refs.commonTableRef.$el.style.width = '100%'
      }
    })
  },
  methods: {
    isCanSelectionFunc(row, index) {
      if (row.isCanSelect === undefined) {
        return true
      } else {
        if (row.isCanSelect && row.isCanSelect === true) {
          return true
        } else {
          return false
        }
      }
    },
    expandChangeMethods(rows, expandRow) {
      console.log(rows, expandRow)
    },
    blurInputValue(filed, index, row, validateType, arr) {
      // 小数点取后两位
      if (validateType === 'int') {
        this.$props.tData[index][filed] = parseInt(this.$props.tData[index][filed], 10)
      } else if (validateType === 'float') {
        this.$props.tData[index][filed] = parseFloat(parseFloat(this.$props.tData[index][filed]).toFixed(2))
      }
      this.$props.tData.splice(0, 0)
      this.$emit('inputBlurCallBack', {
        filed: filed, index: index, value: row, arr: arr
      })
    },
    refreshView() {
      this.tData.splice(0, 0)
    },
    updateStatus(col, row, index, opt) {
      const currentData = row[col]
      let updateData = ''
      if (opt.indexOf(currentData) === 0) {
        [updateData] = [opt[1]]
      } else {
        [updateData] = [opt[0]]
      }
      this.$emit('switchUpdate', {
        col: col, data: row, index: index, updateValue: updateData
      })
    },
    handleSelectionChange(val) {
      this.$emit(this.$props.emitSelectionName, val)
    }
  }
}
</script>

<style scoped>
.commonTable /deep/ .el-table__body .cell {
  padding: 0px 8px !important;
}
</style>
