import axios from 'axios'   //安装axios并引入
import { ElLoading} from 'element-plus';
import {environment} from '@/utils/config.js'
// 加载中
let options = null;
function loading(){
   options = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}
// 关闭
function enloading(){
  options.close();
}
const autograph = function auths (url, query) {
  var headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  }
  return { query, headers }
}

// 创建axios实例
const service = axios.create({
 baseURL:environment(),
//延迟
  timeout:  6000, //设置超时
})


// request 拦截器,这些直接复制粘贴,都是死的代码,若想更丰富,懂了之后可以添加更多的精彩
service.interceptors.request.use(function(config) {
  loading();
  const data = autograph(config.url, config.data)
  if (config.method === 'get') {
    config.params = data.query
  }
  if (config.method === 'post') {
    config.data = data.query
  }
  config.headers = data.headers
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// 响应后的拦截
// response 拦截器   异常处理
service.interceptors.response.use(
  response => {
    enloading();
        return {
            code: response.status,
            message: response.statusText,
            data: response.data
        }
  },
  error => {
    enloading();
    if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求'
            break
          case 401:
            error.message = '未授权，请重新登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求错误,未找到该资源'
            break
          case 405:
            error.message = '请求方法未允许'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器端出错'
            break
          case 501:
            error.message = '网络未实现'
            break
          case 502:
            error.message = '网络错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网络超时'
            break
          case 505:
            error.message = 'http版本不支持该请求'
            break
          default:
            error.message = `连接错误${err.response.status}`
        }
        let errData = {
            code: error.response.status,
            message: error.message
          }
          // 统一错误处理可以放这，例如页面提示错误...
          console.log('统一错误处理: ', errData)
    }
    return Promise.reject(error)
  }
)

export default service




