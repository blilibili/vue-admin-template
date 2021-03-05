# 管理后台模板  基于 vue + element + axios 搭建

## 项目依赖安装
```
npm install
```

### 启动服务
```
npm run serve
```

### 编译
```
npm run build
```

# 目录介绍
```
.env 环境变量  可将变量打包到代码里
vue.config  项目配置  重要的是devServer  可以解决开发时跨域问题
```

# 重要配置
```
--src -> routes ->  menuList 左侧菜单栏的配置，自动写入到路由 无须再次引用， 菜单里需要引入组件，否则默认的错误提示组件
--src -> routes ->  serve  业务路由，配置跳转路由，会自动加载到routes
--src -> routes -> other  其他路由 不在骨架里的页面  例如 登录
```

# todo
```
公司logo的配置，常用登录页面，拖拽生成登录页面代码, 收缩问题
```

# demo
http://120.48.8.131:82/base/cuture