<script>
import toHref from "@/mixins/toHref";
import Bet from "./component/pageBet.vue";
import TransferBet from "./component/transferBet.vue";
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
  components: { Bet, TransferBet,},
  mixins: [toHref],
  computed: {
    
  },
  mounted() {},
  methods: {},
};
</script>
<template>
  <div class="mx-10">
    <div
      class="flex justify-between text-base pl-32 pr-40 pb-12 mt-16 border-b border-[#2F3F33]"
    >
      <div v-for="(item, index) in tabList" :key="index" @click="active = index">
        <div :class="{ 'text-beige': active == index }" class="flex items-center">
          <img
            class="h-16 mr-8"
            :src="getRequireImg(`home/${active==index ? item.activeIcon:item.inactiveIcon}.png`)"
            alt=""
          />
          {{ item.name }}
        </div>
      </div>
    </div>
    <template v-if="active==0">
      <TransferBet />
    </template>
    <template v-if="active==1">
      <Bet />
    </template>
  </div>
</template>
<style scoped>
</style>
