<script>
import toHref from "@/mixins/toHref";
import postInfo from "@/mixins/postInfo";
import Bet from "./component/pageBet.vue";
import TransferBet from "./component/transferBet.vue";
// import { mapGetters } from "vuex";
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
    };
  },
  components: { Bet, TransferBet },
  mixins: [toHref, postInfo],
  computed: {
    // ...mapGetters(['userInfo'])
  },
  created() {
    console.log(this.$route.query);

    const userInfo = {
      token: "xxx",
      gameName: this.$route.query.gameName || "哈希大小",
      gameType: Number(this.$route.query.gameType) || 1,
      balance: 12345,
    };
    this.$store.dispatch("saveUserInfo", userInfo);
  },
  mounted() {},
  methods: {
    changeActive(index) {
      this.active = index;
    },
  },
};
</script>
<template>
  <div
    class="px-10 pb-20 min-h-screen"
    :class="
      active == 0
        ? 'bg-[#E8E8EA] text-blackish-green'
        : 'bg-[#0B0B0C] text-white '
    "
  >
    <div
      class="flex justify-between text-base pl-32 pr-40 pt-16 pb-12 border-b"
      :class="active == 0 ? 'border-[#2A2D33]' : 'border-[#70697C]'"
    >
      <div
        v-for="(item, index) in tabList"
        :key="index"
        @click="changeActive(index)"
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
</template>
<style scoped>
</style>
