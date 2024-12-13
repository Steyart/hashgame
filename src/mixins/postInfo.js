/* 请求 */
import ClipboardJS from "clipboard"
import { showToast, showSuccessToast } from "vant";
var clipboard = new ClipboardJS('.copyBtn');
import { mapGetters } from "vuex";

var postInfo = {
  data() {
    return {
      codeDisable: false,

      indexLists: [],
      indexFactoryLists: [],
      itemObj: {},
      pagination: {},
      listLoading: false,

      betList: [],
      betRaceList: [],
      betSumList: [],
      orderList: [],
      
      skeleton: true,
      skeletonTimeShow: null,
      skeletonTimeHide: null,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['language', "indexNav", "factoryList", "bannerList", "user", "is_all", "swiperTimerList", "isLogged", "vipInfo"]),
    myAvatar(){
      let img = ""
      if(this.user.avatar){
        img = this.user.avatar.replace(/\/default\/avatar\//g, "");
        img = img.replace(/\.png/g, "");
      }else{
        img = 'img0'
      }
      return this.myImg[`head_${img}`]
    },
  },
  mounted() {

  },
  methods: {
    /* 骨架请求防抖 */
    getSkeleton(type){
      if(type){
        this.skeleton = true
      }else{
        if(this.skeletonTimeHide) clearTimeout(this.skeletonTimeHide)
        this.skeletonTimeHide = setTimeout(()=>{
          this.skeletonTimeHide = null
          this.skeleton = false
        },300)
      }
    },
    /* 修改显示时间 */
    setDate(time) {
      let d = new Date(time).toLocaleDateString();
      let t = new Date(time).toLocaleTimeString();
      return `${d} ${t}`;
    },
    /* 获取语言列表 */
    getLanguageList(){
      this.$http
        .post(`/v1/game/language/list`, {})
        .then(({ data }) => {
          if (data.code === 0) {
            this.$store.dispatch("setLanguageList", data.result.data);
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    
    /* 修改用户信息 */
    setUserInfo(postData){
      if(postData.avatar) postData.avatar = `/default/avatar/img${postData.avatar}.png`
      this.$http
        .post(`/v1/game/user/update`, postData)
        .then(({ data }) => {
          if (data.code === 0) {
            let res = {...this.user,  ...postData }
            this.$store.dispatch("loginSuccess", res);

            if(postData.avatar){
              this.isEditAvatar = false;
            }
            if(!postData.sex){
              this.successDialog = true
            }
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 获取用户信息
     * @param {*} type 
     */
    getUserInfo(type) {
      this.$http
        .post(`/v1/game/user/one`, {})
        .then(({ data }) => {
          if (data.code === 0) {
            let res = {...this.user,  ...data.result.data }
            new Promise((resolve, reject) => {
              this.$store.dispatch("loginSuccess", res);
              resolve();
            }).then(()=>{
              localStorage.setItem("user", JSON.stringify(res));
              if(type == 'login' || type == 'register'){
                this.msg = "登录成功";
                this.successStatus = true;
                setTimeout(() => {
                  this.loginSuccess()
                }, 600);
              }
            })
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 获取用户统计
     * @param {*} type 
     */
    getUserStatistics(type) {
      this.$http
        .post(`/v1/game/userStatistics/one`, {})
        .then(({ data }) => {
          if (data.code === 0) {
            let res = {
              ...data.result.data,
              ...this.user,
              statistics_id: data.result.data && data.result.data.id,
              statistics_created_at: data.result.data && data.result.data.created_at,
              statistics_updatedAt: data.result.data && data.result.data.updatedAt,
              vip_recharge_amount: (data.result && data.result.data.vip_recharge_amount) || 0, 
              vip_valid_amount: (data.result && data.result.data.vip_valid_amount) || 0, 
            }
            new Promise((resolve, reject) => {
              this.$store.dispatch("loginSuccess", res);
              resolve();
            }).then(()=>{
              localStorage.setItem("user", JSON.stringify(res));
            })
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 获取VIP信息 
     */
    getVipLists(){
      this.$http
      .post(`/v1/game/vip/list`, {})
      .then(({ data }) => {
        if (data.code === 0) {
          let list = data.result.data

          this.$store.dispatch('setVipList', list)
        } else {
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    /**
     * 复制
     * @param {*} text 
     */
    onCopy(text){
      if (navigator.clipboard) {
        // 使用 navigator.clipboard 的现代方式
        navigator.clipboard.writeText(text).then(function(e) {
          showToast({
            type: 'success',
            message: '复制成功',
            className: 'success-toast-box'
          })
        }).catch(function(error) {
          console.error('复制失败', error);
        });
      } else {
        clipboard.on('success', function (e) {
          showToast({
            type: 'success',
            message: '复制成功',
            className: 'success-toast-box'
          })
          e.clearSelection();
        });
        clipboard.on('error', function (e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
      }
    },
    /**
     * 退出登录
     */
    loginOut(){
      location.href = '/'
      this.$store.dispatch("loginOut");
    },
    /**
     * 游戏登录
     * @param {*} data 
     */
    gameLogin(data){
     this.$http
        .post(`/v1/game/user/gameLogin`, {
          ...data
        })
        .then(({ data }) => {
          if (data.code === 0) {
            this.game_url = data.result.data.game_url
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        }); 
    },
    /**
     * 获取顶部banner
     * @param {type: 'home'} type home 首页
     */
    getBannerList(type) {
      this.getSkeleton(true)
      this.$http
        .post(`/v1/game/banner/list`, {
          type
        })
        .then(({ data }) => {
          this.getSkeleton(false)
          if (data.code === 0) {
            let list = data.result.data
            this.$store.dispatch("updateBannerList", list);
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          this.skeleton = false
          console.log(err)
        });
    },
    /**
     * 获取供应商列表
     */
    getFactoryList(postData = {}) {
      this.getSkeleton(true)

      this.$http
        .post(`/v1/game/factoryChannel/list`, postData)
        .then(({ data }) => {
          this.getSkeleton(false)
          if (data.code === 0) {
            let list = data.result.data || []
            this.listLoading = false
            this.$store.dispatch("updateFactoryList", list);
          } else {
            this.listLoading = false
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          this.skeleton = false
          this.listLoading = false
          console.log(err)
        });
    },
    /**
     * 获取顶部导航
     */
    getHomeNav() {
      this.$http
        .post(`/v1/game/factoryChannelCategory/list`, {})
        .then(({ data }) => {
          if (data.code === 0) {
            let list = data.result.data
            this.$store.dispatch("updateIndexNav", list);
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        });
    },
    /**
     * 获取首页分类下的游戏列表
     * @param {} item 游戏分类信息
     * @param {} page 页数
     * @param {} type 是否首页
     */
    getIndexInformation(item, page, type, limit = 15){
      let factory = []
      if(type == 'factory'){
        factory = [{
          factory_channel_code: item.factory_channel_code,
          factory_code: item.factory_code,
        }]
      }
      let postData = {
        factory: factory.length > 0 ? factory : undefined,
        factory_channel_category_code: type == 'factory' ? undefined :item.factory_channel_category_code,
        page,
        limit: limit,
      }
      this.getSkeleton(true)
      this.$http
        .post(`/v1/game/factoryChannelGame/list`, postData)
        .then(({ data }) => {
          this.getSkeleton(false)
          if (data.code === 0) {
            if(type == 'index'){
              let indexLists = []
              let obj = {
                icon: item.select_image,
                title: item.title,
                id: item.factory_channel_category_code,
                swiper: data.result.data,
                skeleton: false,
                is_category: item.is_category
              }
              if(data.result.data && data.result.data.length > 0){
                obj.skeleton = true
              }
              indexLists.push(obj)
              this.indexLists = [...this.indexLists, ...indexLists]

              this.indexLists.sort(function(a, b) {
                return a.id - b.id;
              });
            }else{
              let arr = this.factoryList
              this.$store.dispatch("updateFactoryList", arr);
            }
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          this.skeleton = false
          console.log(err)
        });
    },
    /**
     * 获取分类页下的游戏列表
     * @param {*} item 游戏分类信息
     * @param {*} page 页数
     */
    getItem(item, page){
      let postData = {
        factory: item.factory || undefined,
        factory_channel_category_code: item.factory_channel_category_code ? item.factory_channel_category_code : undefined,
        page,
        limit: 9
      }
      this.loading = true
      this.listLoading = true;
      /* if(item.factory_code){
        postData.factory_channel_category_id = undefined
      } */
      this.$http
        .post(`/v1/game/factoryChannelGame/list`, postData)
        .then(({ data }) => {
          if (data.code === 0) {
            if(page == 1){
              this.currentPage = 1
              this.itemObj = {
                icon: item.image,
                title: item.title,
                id: item.factory_channel_category_code,
              }
              this.itemObj.list =  data.result.data ? [...data.result.data] : []
            }else{
              this.itemObj.list =  data.result.data ? [...this.itemObj.list, ...data.result.data] : [...this.itemObj.list]
            }

            if(data.result.data){
              if(data.result.data.length > 0){
                this.finished = false
                this.loading = false
              }else{
                this.finished = true
              }
            }else{
              this.finished = true
            }
            this.pagination = data.result.pagination
            this.listLoading = false;
          } else {
            this.msg = data.message;
            this.toastStatus = true;
            this.listLoading = false;
          }
        })
        .catch((err) => {
          console.log(err)
          this.listLoading = false;
        });
    },
    /**
     * 邮箱验证码
     * @param {*} data 
     * @returns 
     */
    sendCode(data){
      if (this.sms.count > 0 || this.codeDisable) return false;
      this.codeDisable = true
      this.$http
        .post(`/v1/game/user/sendCode`, data)
        .then(({ data }) => {
          if (data.code === 0) {
            let countdown = null
            if(countdown) clearInterval(countdown);
            this.sms.count = this.sms.countTime;
            countdown = setInterval(() => {
              this.sms.count--;
              this.sms.text = this.sms.count + "s";
              if (this.sms.count <= 0) {
                this.sms.text = this.sms.textBefore;
                clearInterval(countdown);
              }
            }, 1000);
            this.msg = data.message;
            this.successStatus = true;
          } else {
            this.msg = data.message;
            this.toastStatus = true;
          }
        })
        .catch((err) => {
          console.log(err)
        });
      
    },
    /* 领取 */
    receiveAmount(item, array, type){
      item.canGet = false
    },
    /* 排名-我的投注 */
    getOrderList(postData={}, page = 1, limit = 10){
      if(postData.isFirst){
        this.listLoading = true
        this.getSkeleton(true)
      }
      let config = {...postData, page, limit, isLoop: undefined, isFirst: undefined}
      this.$http
      .post(`/v1/game/order/list`, config)
      .then(({ data }) => {
        this.getSkeleton(false)
        if (data.code === 0) {
          this.listLoading = false
          this.orderList = data.result.data
          if(postData.isLoop){
            let orderListTime = setTimeout(()=>{
              this.getOrderList(postData, page, limit)
            }, 5000)
            this.$store.commit('setSwiperTimeList', {name: 'order', time: orderListTime})
          }
        } else {
          this.listLoading = false
        }
      })
      .catch((err) => {
        this.skeleton = false
        this.listLoading = false
      });
    },
    /* 所有投注 */
    getBet(postData={}, page = 1, limit = 10){
      if(postData.isFirst){
        this.listLoading = true
      }
      let config = {...postData, page, limit, isLoop: undefined, isFirst: undefined}
      this.$http
      .post(`/v1/game/statistics/bet`, config)
      .then(({ data }) => {
        if (data.code === 0) {
          this.listLoading = false
          this.betList = data.result.data
          if(postData.isLoop){
            let betListTime = setTimeout(()=>{
              this.getBet(postData, page, limit)
            }, 5000)
            this.$store.commit('setSwiperTimeList', {name: 'bet', time: betListTime})
          }
        } else {
          this.listLoading = false
        }
      })
      .catch((err) => {
        this.listLoading = false
      });
    },
    /* 竞赛排行 */
    getBetRace(postData={}, page = 1, limit = 10){
      if(postData.isFirst){
        this.listLoading = true
      }
      this.$http
      .post(`/v1/game/statistics/betRace`, {})
      .then(({ data }) => {
        if (data.code === 0) {
          this.listLoading = false
          this.betRaceList = data.result.data
          if(postData.isLoop){
            let betRaceListTime = setTimeout(()=>{
              this.getBetRace(false)
            }, 5000)
            this.$store.commit('setSwiperTimeList', {name: 'betRace', time: betRaceListTime})
          }
        } else {
          this.listLoading = false
        }
      })
      .catch((err) => {
        this.listLoading = false
      });
    },
    /* 风云榜 */
    getBetSum(postData={}, page = 1, limit = 10){
      if(postData.isFirst){
        this.listLoading = true
      }
      this.$http
      .post(`/v1/game/statistics/betSum`, {})
      .then(({ data }) => {
        if (data.code === 0) {
          this.listLoading = false
          this.betSumList = data.result.data
          if(postData.isLoop){
            let betSumListTime = setTimeout(()=>{
              this.getBetSum(false)
            }, 5000)
            this.$store.commit('setSwiperTimeList', {name: 'betSum', time: betSumListTime})
          }
        } else {
          this.listLoading = false
        }
      })
      .catch((err) => {
        this.listLoading = false
      });
    },
    /* 交易记录-我的投注 */
    getTransition(postData={}, page = 1, limit = 10){
      if(postData.isFirst){
        this.listLoading = true
      }
      let config = {...postData, page, limit, isFirst: undefined}
      this.$http
      .post(`/v1/game/order/list`, config)
      .then(({ data }) => {
        if (data.code === 0) {
          this.listLoading = false
          this.transitionList = data.result.data
        } else {
          this.listLoading = false
        }
      })
      .catch((err) => {
        this.listLoading = false
      });
    },
  }
}
export default postInfo
