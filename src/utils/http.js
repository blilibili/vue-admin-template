import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const responseMap = {
  success: 10000,
  auth: 50004, // token过期
  permission: -2 // 权限不足
}

function loginOut() {

}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url 读取config配置文件
  timeout: 10000 // 请求超时时间,一般5000，ihome需要同步分台，时间会比较久
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === "post") {

    }

    // 设置 token
    config.headers['token'] = getToken()
    //config  每次请求的格式以及所有 参数
    return config
  },
  error => {
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: "error"
    })
    return Promise.reject(error)
  }
)

// respone拦截器,  当服务端返回特殊的状态码，统一做处理，如没权限或者token失效等操作。
service.interceptors.response.use(
  /**
   * 如果您想要获取http信息，如头信息或状态信息
   * Please return  response => response
   */
  response => {
    const res = response.data

    // 如果自定义代码不是10000成功，就会被判定为错误。
    if (res.code != responseMap.success) {

      // 50004:Token 过期了;-2：权限不足，重新登录
      if (res.code === responseMap.auth || res.code == responseMap.permission) {
        // to re-login
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 登出逻辑
          loginOut()
        })
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        });
        //判断下载文件,如果成功数据为空，但返回的是一串乱码，则下载成功
        if(JSON.stringify(res) != null){
          return res
        }
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,// 连接异常
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }

)

export default service