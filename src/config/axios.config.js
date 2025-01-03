
/*global $ returnCitySN require ClipboardJS wx err process*/
import axios from 'axios'
import store from '../store/index'
import router from '../router'
import { getCookie } from '@/service/util.service'
let $instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: false,
  baseURL: (process.env.NODE_ENV === 'production') ? 'https://hash-api.888bbm.com/api' : '/api',
  timeout: 30000,
  retry: 1,
  retryDelay: 1000,
  __retryCount: 0
});

// 设置全局参数方法
$instance.setParams = (posted = false, query = {}) => {
  const token = getCookie('token') || store.state.auth.userInfo?.token;
  if (token) {
    $instance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete $instance.defaults.headers.Authorization; // 确保没有无效的Authorization头
  }
  return $instance.defaults.data;
};

// 初始化设置
$instance.setParams(true);

// POST传参序列化
$instance.interceptors.request.use((config) => {
  if (typeof config.data === 'string') {
    config.baseURL = '';
    return config;
  }

  // 设置全局参数
  $instance.setParams(false, {});

  // 如果是POST请求并且不是简单的请求，则可能触发预检请求
  if (config.method.toLowerCase() === 'post') {
    config.headers['Content-Type'] = 'application/json'; // 或者 application/x-www-form-urlencoded
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器配置
$instance.interceptors.response.use((response) => {
  if (response.data && response.data.code === 1001) {
    // 处理业务逻辑错误
  } else if (response.status === 403 || response.data.status === 403) {
  } else if ([-3, -2].includes(response.data.status)) {
    setTimeout(() => {
    }, 2000);
  }
  return response;
}, function (error) {
  console.error(error);
  if (error.response && error.response.status === 401) {
  }
  return Promise.reject(error);
});

export default $instance;
