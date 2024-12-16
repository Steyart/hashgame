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

     // 获取token
  getTokenInfo(params) {
    this.$http
    .post(`/gameLike/link`, params)
    .then(({ data }) => {
      if (data.code === 200) {
        const url = new URL(data.data.game_link);
        const token = url.searchParams.get('token');
        if (token) {
          this.setCookie('token', token, 1); // 设置cookie
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },

  // 设置cookie
  setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },

    // 获取区块号
    getBlockNum(){
      this.$http
      .get(`/tron/getBlockByLatestNum`)
      .then(({data}) => {
        if (data.code === 200) {
          console.log(data,"res===");
          
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
    // 获取余额
    getBalance(params){
      this.$http
      .post(`/game/blance`, params)
      .then(({data}) => {
        if (data.code === 200) {
          console.log(data,"res===");
          
        }
      })
      .catch((err) => {
        console.log(err)
      });
    },
  }
}
export default postInfo
