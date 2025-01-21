import './assets/main.css'
import './style.css'

import { require } from '@/service/util.helper'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

import 'swiper/css';

import axios from './config/axios.config'
import { MotionPlugin } from '@vueuse/motion'
import '@vant/touch-emulator';

// 获取嵌入APP信息
router.UA = (() => {
    let u = navigator.userAgent;
    let u2 = navigator.userAgent.toLowerCase();
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) ? u2.match(/MicroMessenger/i).toString() === "micromessenger" : false,
        qq: u2.match(/QQ\//i) ? u2.match(/QQ\//i).toString() === "qq/" : false,
        APP: u2.match(/newLoanMarket/i) ? u2.match(/newLoanMarket/i).toString() === "newloanmarket" : false,
        ali: u.indexOf('AliApp') > -1,
        system_name: u2.indexOf('windows') > -1 ? '1' : (u2.indexOf('android') > -1 ? '3' : (u2.indexOf('macintosh') > -1 ? '4' : (u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? '2' : ''))),
        system_version: '',
        equ_model: '',
        package: u.match(/(com.[a-z.]*)(?=\/)/g) ? u.match(/(com.[a-z.]*)(?=\/)/g).toString() : 'com.default.app',
    };
});

router.back = function (query = {}) {
    if (query.redirectUrl) {
        return window.location.href = query.redirectUrl;
    } else if (window.history.length <= 2) {
        return router.replace({ path: '/' });
    } else {
        router.go(-1);
    }
};

let remInit = function (app) {
    (function () {
        let time = null
        function setMobile() {
            if (router.UA().mobile) {
                document.querySelector('html').setAttribute('data-device-nodesktop', '0')
            } else {
                document.querySelector('html').setAttribute('data-device-nodesktop', '1')
            }
        }
        window.addEventListener("resize", function () {
            clearTimeout(time);
            time = setTimeout(setMobile, 100);
        }, false);

        setMobile();
    })();
};

let history = window.sessionStorage
let historyCount = history.getItem('count') * 1 || 0
function routerTransition(to, from) {
    const toIndex = history.getItem(to.name)
    const fromIndex = history.getItem(from.name)
    let direction = 'forward'
    if (toIndex) {
        if (toIndex >= fromIndex || !fromIndex) {
            store.commit('UPDATE_DIRECTION', { direction })
        } else {
            direction = 'reverse'
            store.commit('UPDATE_DIRECTION', { direction })
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.name, historyCount)
        direction = 'forward'
        store.commit('UPDATE_DIRECTION', { direction })
    }
}
// router.beforeEach((to, from, next) => {
//     let path = to.path;
//     let gameId = to.query.gameId
//     routerTransition(to, from)

//     if (store.getters.swiperTimerList.dateTimeListTime) {
//         clearTimeout(store.getters.swiperTimerList.dateTimeListTime)
//     }
//     if (store.getters.swiperTimerList.orderListTime) {
//         clearTimeout(store.getters.swiperTimerList.orderListTime)
//     }
//     if (store.getters.swiperTimerList.betListTime) {
//         clearTimeout(store.getters.swiperTimerList.betListTime)
//     }
//     if (store.getters.swiperTimerList.betRaceListTime) {
//         clearTimeout(store.getters.swiperTimerList.betRaceListTime)
//     }
//     if (store.getters.swiperTimerList.betSumListTime) {
//         clearTimeout(store.getters.swiperTimerList.betSumListTime)
//     }

//     let isLogged = localStorage.getItem('isLogged')

//     if (path == '/index') {
//         store.commit('UPDATE_IS_ALL', true)
//     } else if (path == '/moregames' && to.query.is_all == 1) {
//         store.commit('UPDATE_IS_ALL', true)
//     }
//     if (path == 'sports') {
//         store.commit("UPDATE_HIDECUSTOM", true);
//     } else {
//         store.commit("UPDATE_HIDECUSTOM", false);
//     }

//     if(gameId && isLogged != 1){
//         sessionStorage.setItem('gameId', gameId)
//         return next(`/register`)
//     }else{
//         if (to.meta.auth && isLogged != 1) {
//             return next(`/login`)
//         } else {
//             if (path.indexOf('login') > -1 && isLogged == 1) {
//                 store.commit('setLoggedStatus', isLogged)
//                 next('/')
//             }
//         }
//     }
//     next()
// })

// router.afterEach(() => {
//     setTimeout(() => {
//         store.commit('UPDATE_LOADING', false)
//     }, 600);
// });

const app = createApp(App)

app.config.globalProperties.$http = axios;
remInit(app)

app.directive('title', (el, binding) => {
    if (binding.value !== undefined) {
        document.title = `${binding.value}`;
    }
});
app.use(Vant);
app.use(Lazyload);
app.use(MotionPlugin);
app.use(store).use(router).mount('#app')
