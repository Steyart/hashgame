<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import Bet from "./component/pageBet.vue";
import TransferBet from "./component/transferBet.vue";
import { setCookie } from "@/service/util.service";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tabList: [
        {
          name: "转账投注",
          activeIcon: "transfer-active",
          inactiveIcon: "transfer-inactive",
        },
        {
          name: "页面投注",
          activeIcon: "bet-active",
          inactiveIcon: "bet-inactive",
        },
      ],
      active: 0,
      showPage: false,
      newMessage: {}
    };
  },
  components: { Bet, TransferBet },
  mixins: [toHref, postInfo],
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
  
    if (this.$route.query.token) {
      const gameType = Number(this.$route.query.type);
      const gameName = this.getGameName(gameType);
      const userInfo = {
        token: this.$route.query.token,
        gameName: gameName || "哈希大小",
        gameType: gameType || 1,
      };
      setCookie("token", this.$route.query.token);
      this.$store.dispatch("saveUserInfo", userInfo);
    }else{
      this.showPage = true;
    }
    // this.$router.replace({ path: "/" });
  },
  mounted(){
    this.sendMessage()
    window.addEventListener("storage", this.handleStorageEvent);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.handleStorageEvent);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.handleStorageEvent);
  },
  methods: {
    sendMessage (){
      let obj = {
        userId: this.userInfo.token,
        time: new Date().toLocaleTimeString(),
      }
      localStorage.setItem("crossTabMessage", JSON.stringify(obj));
    },
    handleStorageEvent(event){
      if (event.key === "crossTabMessage" && event.newValue) {
        this.newMessage = JSON.parse(event.newValue);
        console.log(JSON.parse(event.newValue))
      }
    },

    changeActive(index) {
      this.active = index;
    },

    getGameName(type) {
      const gameNames = {
        1: "哈希大小",
        2: "哈希单双",
        3: "哈希牛牛",
        4: "哈希庄闲",
        5: "哈希和值大小"
      };
      return gameNames[type];
    },
  },
};
</script>
<template>
  <div>
    <div v-if="newMessage.userId == userInfo.token" class="w-full h-screen flex items-center justify-center text-xl">您已在新的窗口打开</div>
    <div v-else
      class="px-10 pb-20 min-h-screen"
      :class="
        active == 0
          ? 'bg-[#E8E8EA] text-blackish-green'
          : 'bg-[#0B0B0C] text-white '
      "
    >
      <div
        class="flex justify-between text-base pt-16 pb-12 border-b"
        :class="active == 0 ? 'border-[#2A2D33]' : 'border-[#70697C]'"
      >
        <div
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeActive(index)"
          class="w-1/2"
        >
          <div
            :class="{ 'text-beige': active == index }"
            class="flex items-center justify-center font-bold"
          >
            <img
              class="h-16 mr-8"
              :src="
                getRequireImg(
                  `home/${
                    active == index ? item.activeIcon : item.inactiveIcon
                  }.png`
                )
              "
              alt=""
            />
            {{ item.name }}
          </div>
        </div>
      </div>
      <template v-if="active == 0">
        <TransferBet />
      </template>
      <template v-if="active == 1">
        <Bet />
      </template>
    </div>
    <van-overlay :show="showPage" :close-on-click-overlay="false" />
  </div>
</template>
<style scoped>
</style>
