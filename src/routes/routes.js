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

console.log(routes)
const router = new VueRouter(routes)

export {router}