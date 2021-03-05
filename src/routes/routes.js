import VueRouter from 'vue-router'
import defaultComponent from './default'
import {menuList} from './menuList'
import PageNotFound from './pageNotFound'
import Home from '@src/home.vue'

const rootRoutes = '/base'

//  业务路由
const pageRouterArr = []
const pageFiles = require.context('./server', false, /\.js$/)
pageFiles.keys().forEach(key => {
  // 正则找到key
  if(pageFiles(key).default) {
    pageRouterArr.push(...pageFiles(key).default)
  } else {
    let keyStr = key.replace('.js', '').replace('./', '')
    pageRouterArr.push(...pageFiles(key)[keyStr])
  }
})

// 其他路由  不在骨架中的页面，例如登录页
const otherRouterArr = []
const otherFiles = require.context('./others', false, /\.js$/)
otherFiles.keys().forEach(key => {
  // 正则找到key
  if(otherFiles(key).default) {
    otherRouterArr.push(otherFiles(key).default)
  } else {
    let keyStr = key.replace('.js', '').replace('./', '')
    otherRouterArr.push(...otherFiles(key)[keyStr])
  }
})

const routes = {
  mode: 'history',
  routes: [
    {
      path: rootRoutes,
      component: Home,
      children: [...pageRouterArr]
    },
    ...otherRouterArr
  ]
}


function recursionMenuList(menus) {
  menus.forEach((item) => {
    if(item.children && item.children.length > 0) {
      recursionMenuList(item.children)
    } else {
      let routeUrl = {
        path: item.path?rootRoutes + item.path: 'error',
        component: item.component?item.component: defaultComponent,
        name: item.name?item.name: '',
        title: item.title?item.title: ''
      }
      routes.routes[0].children.push(routeUrl)
    }
  })
}
recursionMenuList(menuList)

let notFoundRoutes = { path: "*", component: PageNotFound }
routes.routes.push(notFoundRoutes)
/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

console.log(routes.routes)
const router = new VueRouter(routes)

export {router, routes}