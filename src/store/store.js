import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

/* 日志 start*/
// import createLogger from 'vuex/dist/logger'
// const debug = process.env.NODE_ENV !== 'production'
/* 日志 end */


Vue.use(Vuex);

//定义数据
const state = {};

const mutations = {};

const actions = {};


// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// 自动导入moudles中的模块进来
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// prev sate 代表之前的数据，mutations代表经过vuex中的mutations中方法修改后的数据
const store = new Vuex.Store({
  modules,
  getters,
  state,
  mutations,
  actions,
  // plugins: debug ? [createLogger()] : []
})

export default store