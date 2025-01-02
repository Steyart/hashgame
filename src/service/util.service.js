import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'
import axios from '@/config/axios.config'

const project = 'free_';


export function hasNecessaryRoute(to) {
  return router.hasRoute(to.name)
}
export function generateRoutes() {
  store.dispatch('set_addRoutes', { router })
}
export function saveCookie(name, value) {
  if (window.localStorage) {
    localStorage.setItem(name, (typeof value === 'string' ? value : JSON.stringify(value)));
    localStorage.setItem('expires', new Date().getTime());
  }
  Cookies.set(name, value)
}

export function getCookie(name) {
  return Cookies.get(name) || (window.localStorage ? localStorage.getItem(name) : '')
}

export function getTokenInfo(params) {
  return axios.post(`/gameLike/link`, params)
    .then(({ data }) => {
      if (data.code === 200) {
        const token = data.data.token;
        if (token) {
          // 将 token 存储到 cookie 中a
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;
          setCookie('token', token, 1); // 设置 cookie，有效期为 1 天
        }
        return token;
      }
    })
    .catch((err) => {
      console.error('获取 token 失败:', err);
    });
}

export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function removeCookie(name) {
  if (window.localStorage) {
    localStorage.removeItem(name);
  }
  Cookies.remove(name)
}

export function getUrlParam(name) {
  var url = window.location.search.substr(1);
  if (url.indexOf('&amp') !== -1) {
    url = url.replace(/&amp;/g, '&');
  }
  if (url.indexOf('&amp%3B') !== -1) {
    url = url.replace(/&amp%3B/g, '&');
  }
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var reg_p = new RegExp("(^|/)" + name + "/([^/]*)(/|$)");
  var r = url.match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    var i = '';
    var rp = window.location.pathname.match(reg_p);
    if (rp != null) {
      i = rp[2].replace('.html', '')
    }
    return i;
  }
}

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
export const showtime = (end, type = 'html') => {
  var start = new Date().getTime()
  var lefttime = end - start,  //距离结束时间的毫秒数
    leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
    lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
    leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
    lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数

  if (type == 'html') {
    if (lefttime < 0) {
      return { status: 0, value: `<span>已过期</span>` };
    } else {
      let html = `
        <span>倒计时：</span>
        <span class="t-li">${leftd}</span>
        <span>天</span>
        <span class="t-li">${lefth}</span>
        <span>时</span>
        <span class="t-li">${leftm}</span>
        <span>分</span>
        <span class="t-li">${lefts}</span>
        <span>秒</span>
        `
      return { status: 1, value: html };
    }
  } else {
    if (lefttime < 0) {
      return showtime(new Date(new Date().toLocaleDateString()).getTime() + (24 * 60 * 60) * 1000, 'number')
    } else {
      if (lefth < 10) {
        lefth = `0${lefth}`
      }
      if (leftm < 10) {
        leftm = `0${leftm}`
      }
      if (lefts < 10) {
        lefts = `0${lefts}`
      }
      return { leftd, lefth, leftm, lefts }
    }
  }
};


/* 处理url参数 */
export function setSearch(channel) {
  let obj = {}
  window.location.search.split('?')[1].split('&').map(v => {
    let k = v.split('=')
    obj[k[0]] = k[1]
  })
  obj.channel_id = channel
  let str = ""
  Object.keys(obj).map((v, k) => {
    let s = ""
    s = `${v}=${obj[v]}`
    if (k >= Object.keys(obj).length - 1) {
      str = `${str}${s}`
    } else {
      str = `${s}&${str}`
    }
  })
  return str
}