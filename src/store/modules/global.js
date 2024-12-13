import {getUA} from "../../service/util.helper";

export default {
  state: {
    menu: {
      drawerVisibility: false,
    },
    params: {},
    APP_DOWNLOAD_URL: getUA().ios ? 'https://fir.im/qwpn?release_id=5c4a6768959d694ea20d8b1e' : 'https://fir.im/exvr',
  },
  actions: {},
  mutations: {
    increment(state) {
      state.menu.drawerVisibility = !state.menu.drawerVisibility;
    }
  },
  getters: {
    doubleCount(state) {
      return 0
    }
  }
}
