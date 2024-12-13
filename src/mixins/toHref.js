/* 跳转路由 */
import { getImg } from "@/service/util.helper";
import { showToast } from 'vant';
import { mapGetters } from "vuex";
var toHref = {
  data() {
    return {
      progress: 0,
      newProgress: 0,
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {

  },
  methods: {
    getRequireImg(src) {
      return getImg(src)
    },
    toUserAgreement(code) {
      this.$router.push({
        path: "/agreement",
        query: {
          code
        }
      });
    },
    toLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    loginSuccess(){
      this.$store.commit('setLoggedStatus', true)
      this.toIndex()
    },
    toRegister() {
      this.$router.push({
        path: "/register",
      });
    },
    back() {
      this.$router.go(-1);
    },
    toIndex() {
      this.$store.dispatch("changeShowLeft", false);
      localStorage.setItem("router-name", "index")
      this.$router.push({
        path: '/',
      })
    },
    toGamePartner(){
      this.$router.push({
        path: '/gamePartner',
      });
    },
    toGamesLists(type, item = null){
      this.$router.push({
        path: "/gamePartner/lists",
        query: {
          factory_channel_code: item.factory_channel_code,
          factory_code: item.factory_code,
          name: item.title
        }
      }); 
    },
    toMoreGames(type, item = null) {
      console.log(item)
      type = type.replace('type', '')
      if(type == 'collaborator'){
        console.log(item)
        this.toGamePartner()
      }else{
        this.$router.push({
          path: "/moregames",
          query: {
            id: type,
            is_all: item.is_category == 'true' ? 2 : 1
          }
        });
      }
    },
    toTransaction(){
      this.$router.push({
        path: "/my/transaction",
      });
    },
    toBet(){
      this.$router.push({
        path: "/my/bet",
      });
    },
    toMessage(){
      this.$router.push({
        path: "/message",
      });
    },
    toMessageDetail(){
      this.$router.push({
        path: "/messageDetail",
      });
    },
    toMy(){
      localStorage.setItem("router-name", "my")
      this.$store.dispatch("changeShowLeft", false);
      this.$router.push({
        path: "/my",
      });
    },
    toAchievement(type){//业绩
      this.$router.push({
        path: "/achievement",
        query: {
          type
        }
      });
    },
    toWallet(index = undefined){
      this.$store.dispatch("changeShowLeft", false);
      this.$router.push({
        path: "/wallet",
        query: {
          ...this.$route.query,
          type: index
        }
      });
    },
    toSetTelegram(){
      this.$router.push({
        path: "/my/setTelegram",
      });
    },
    toSetNickname(){
      this.$router.push({
        path: "/my/setNickname",
      });
    },
    toSetEmail(){
      this.$router.push({
        path: "/my/setEmail",
      });
    },
    toOnlineCustomer(){
      this.$store.dispatch("changeShowLeft", false);
      this.$router.push({
        path: "/onlineCustomer",
      });
    },
    toVpnRecommended(){
      this.$store.dispatch("changeShowLeft", false);
      this.$router.push({
        path: "/my/vpnRecommended",
      });
    },
    toForget(type = undefined){
      this.$router.push({
        path: "/forget",
      });
    },
    toSetLoginPassword(type = undefined){
      this.$router.push({
        path: "/my/setLoginPassword",
        query: {
          type: type
        }
      });
    },
    toSetExtractPassword(type = undefined){
      this.$router.push({
        path: "/my/setExtractPassword",
        query: {
          type: type
        }
      });
    },
    toSetPhone(){
      this.$router.push({
        path: "/my/setPhone",
      });
    },
    toMySet(){
      this.$router.push({
        path: "/my/set",
      });
    },
    toReport(){
      this.$router.push({
        path: "/my/report",
      });
    },
    toSafe(){
      this.$router.push({
        path: "/my/safe",
      });
    },
    changeNav(item){
      this.$store.commit('UPDATE_IS_ALL', item.is_all)
      if(item.is_all == 'true'){
        this.toIndex()
      }else{
        if(this.active){
          this.active = item.factory_channel_category_code * 1
        }
        if(item.id){
          this.$router.push({
            path: '/moregames',
            query:{
              id: item.factory_channel_category_code,
              is_all: item.is_category == 'true' ? 2 : 1
            }
          })
        }
      }
    },
    toPath(path, query = {}){
      if(!path) return false
      this.$router.push({
        path,
        query
      });
    },
    toGame(data) {
      if(this.user){
        this.$router.push({
          path: "/gamePage",
          query: {
            code: data.code,
            channel_code: data.channel_code,
            channel_game_code: data.channel_game_code,
          }
        });
      }else{
        showToast({
          type: 'fail',
          message: this.$t('message.Not_logged_in'),
          className: 'fail-toast-box'
        })
      }
    },
    toGameDetail(data){
      if(this.$route.path == '/gameDetail'){
        this.$router.replace({
          path: "/gameDetail",
          query: {
            code: data.factory_code,
            channel_code: data.factory_channel_code,
            channel_game_code: data.factory_channel_game_code,
          }
        });
      }else{
        this.$router.push({
          path: "/gameDetail",
          query: {
            code: data.factory_code,
            channel_code: data.factory_channel_code,
            channel_game_code: data.factory_channel_game_code,
          }
        });
      }
    },
    // 计算金额
    toFixedNoRounding(num, precision) {
      var multiplier = Math.pow(10, precision);
      var adjustedNum = num * multiplier;
      var integerPart = Math.floor(adjustedNum);
      return (integerPart / multiplier).toFixed(precision);
    },
    // 模拟进度条动画
    startProgress(newProgress, type) {
      let a = 0
      const interval = setInterval(() => {
        if (this.$data[type] >= newProgress) {
          clearInterval(interval);
        } else{
          var arr  = new Array(10).fill(0)
          for(var i=0;i<newProgress * 100;i++){
              var num = parseInt(Math.random()*10)
              arr[num] ++
          }
          arr.forEach((v)=>{
            a += v / 100
            if(a >= 100){
              this.$data[type] = 100
            }else{
              this.$data[type] = a
            }
          })
        }
      }, 50); // 每50毫秒更新一次

    },
    getThousandth(num, precision = 0) {
      if (num >= 1000 && num < 1000000) {
        return this.toFixedNoRounding(num / 1000, precision) + "K";
      } else if (num >= 1000000) {
        return this.toFixedNoRounding(num / 1000000, precision) + "M";
      }
      return num.toString();
    },
  }
}
export default toHref
