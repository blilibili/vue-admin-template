import VueRouter from 'vue-router'
import defaultComponent from './default'
import {menuList} from './menuList'

const routes = {
  mode: 'history',
  routes: []
}


function recursionMenuList(menus) {
  menus.forEach((item) => {
    if(item.children && item.children.length > 0) {
      recursionMenuList(item.children)
    } else {
      let routeUrl = {
        path: item.path?item.path: '',
        component: item.component?item.component: defaultComponent,
      }
      routes.routes.push(routeUrl)
    }
  })
}
recursionMenuList(menuList)

/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter(routes)

export {router}