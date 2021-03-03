import Home from '../page/home'

// mock 权限大全
const permission = ['home:index', 'company:index', 'company:admin', 'company:cuture', 'order:index']

const menuList = [
  {
    name: '首页',
    title: '首页',
    path: '/home',
    icon: '',
    component: Home,
    permission: 'home:index',
  },
  {
    name: '企业管理',
    title: '企业管理',
    permission: 'company:index',
    children: [
      {
        permission: 'company:admin',
        name: '企业管理',
        title: '企业管理',
        path: '/company'
      },
      {
        permission: 'company:cuture',
        name: '企业文化',
        title: '企业文化',
        path: '/cuture'
      }
    ]
  },
  {
    name: '订单管理',
    title: '订单管理',
    permission: 'order:index',
    children: [
      {
        permission: 'list:admin',
        name: '订单列表',
        title: '订单列表',
        path: '/list'
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
console.log('menuList', menuList)

export {menuList}