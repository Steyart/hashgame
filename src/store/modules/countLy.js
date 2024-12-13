import axios from '@/config/axios.config'
import router from "../../router";
import store from "../../store"
import {COUNT_LY_S} from '../mutation-types'

export default {
  state: {
    bind: {},
    base: {}
  },
  actions: {
    countLy: ({state}, data = {}) => {
      let COUNT_DATA = {
        // 基本数据
        // user_id: '',
        // user_level: '',
        user_agent: window.navigator.userAgent || '',
        // front: '',
        // channel_id: '',
        // city_id: '',
        // ip2long: '',
        project_id: 2,
        // app_id: '',
        record_time: Number(Date.parse(new Date()) / 1000),
        version: '',
        udid: window.uuid || '',
        system_name: router.UA().system_name,
        system_version: router.UA().system_version,
        equ_model: router.UA().equ_model,

        // 点击行为数据
        event_id: '',
        event_title: '',
        event_page: '',
        event_value: '',
        event_type: '',

        // 页面跳转
        page_now: '',
        page_act: '',
        page_act_value: '',
        page_source_url: '',
        page_now_url: '',
        page_next_url: '',

        // 网络数据流
        form_update_path: '',
        form_update_param: '',
        form_update_resp: '',
        form_update_extra: '',

        // 数据变更流
        data_update_name: '',
        data_update_old_value: '',
        data_update_new_value: '',

        // event/page/form/data_update
        record_type: 'event',
        record_extra_data: '',
        record_version: 1,
      };

      // 非点击/列表数据/表单提交等无event_id类型
      Object.assign(data, store.state.countLy.base);
      if ((data.event_id !== undefined && data.event_id !== '') || data.record_type === 'event') {
        COUNT_DATA.event_page = router.app.$route.meta.countTitle || document.title;
        Object.assign(COUNT_DATA, COUNT_LY_S[data.event_id], data);
      } else {
        Object.assign(COUNT_DATA, data);
      }
      console.log(COUNT_DATA);
      // return axios.post(`/log/behavior-log`, {log: JSON.stringify([COUNT_DATA])});
    },
  },
  mutations: {},
  getters: {
    doubleCounts(state) {
      return 0
    }
  }
}
