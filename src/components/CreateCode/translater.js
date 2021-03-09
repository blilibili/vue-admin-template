export const translater = (tree, formAttrObj) => {
  const codeMap = {
    form: 'el-form',
    input: 'el-input',
    select: 'el-select'
  }
  const {align, col} = formAttrObj
  const finalCol = parseInt(24 / col, 10)

  let codeStr = ''
  tree.forEach((item) => {
    codeStr = codeStr + `<${codeMap[item.type]}  label-position="${align}" :inline="true" :model="form" class="demo-form-inline"> \n`
    codeStr = codeStr + `<el-row> \n`
    item.children.forEach((child) => {
      codeStr = codeStr + `<el-col :span="${finalCol}"> \n`
      codeStr = codeStr + `<el-form-item label="${child.label}"> \n`
      const width = child.width.toString().indexOf('%') !== -1 ?`${child.width}`:`${parseInt(child.width, 10)}px`
      if(child.type === 'input') {
        codeStr = codeStr + `<${codeMap[child.type]} type="text" style="width: ${width}" /> \n`
      } else if(child.type === 'select') {
        codeStr = codeStr + ` <el-select placeholder="请选择">
                            <el-option
                                    v-for='idx in ${JSON.stringify(child.options)}'
                                    :key="idx.value"
                                    :label="idx.label"
                                    :value="idx.value">
                            </el-option>
                        </el-select>
        `
      }
      codeStr = codeStr + `</el-form-item> \n`
      codeStr = codeStr + `</el-col> \n`
    })
    codeStr = codeStr + `</el-row> \n`
    codeStr = codeStr + `</${codeMap[item.type]}>`
  })

  return codeStr
}