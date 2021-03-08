import Home from '../page/home'
import Company from '../page/company'
import CreateCode from '../components/CreateCode/index'

// mock 权限大全
const permission = ['home:index', 'company:index', 'company:admin', 'company:cuture', 'order:index', 'list:admin', 'auto:index', 'auto:create']

const menuList = [
  {
    name: '首页',
    title: '首页',
    path: '/home',
    icon: 'el-icon-goods',
    component: Home,
    permission: 'home:index',
  },
  {
    name: '企业管理',
    title: '企业管理',
    permission: 'company:index',
    icon: 'el-icon-picture-outline-round',
    children: [
      {
        permission: 'company:admin',
        name: '企业管理',
        title: '企业管理',
        path: '/company',
        icon: 'el-icon-s-cooperation',
        component: Company
      },
      {
        permission: 'company:cuture',
        name: '企业文化',
        title: '企业文化',
        icon: 'el-icon-s-flag',
        path: '/cuture'
      }
    ]
  },
  {
    name: '订单管理',
    title: '订单管理',
    permission: 'order:index',
    icon: 'el-icon-coordinate',
    children: [
      {
        permission: 'list:admin',
        name: '订单列表',
        title: '订单列表',
        icon: 'el-icon-view',
        path: '/list'
      }
    ]
  },
  {
    name: '自动化',
    title: '自动化',
    permission: 'auto:index',
    icon: 'el-icon-suitcase',
    children: [
      {
        permission: 'auto:create',
        name: '创建代码',
        title: '创建代码',
        icon: 'el-icon-table-lamp',
        path: '/code',
        component: CreateCode
      }
    ]
  }
]

function createMenuListByPermission(menus) {
  menus.forEach((item, key) => {
    if(permission.indexOf(item.permission) === -1) {
      menus.splice(key, 1)
    }
    if(item.children && item.children.length > 0) {
      createMenuListByPermission(item.children)
    }
  })
}

createMenuListByPermission(menuList)

export {menuList}