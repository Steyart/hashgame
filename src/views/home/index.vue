<template>
  <!-- <div class="mx-10">
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
  </div> -->

  <div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
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
  methods:{
    sendMessage (){
      localStorage.setItem("crossTabMessage", new Date().toLocaleTimeString());
    },
    handleStorageEvent(event){
      if (event.key === "crossTabMessage" && event.newValue) {
        const newMessage = event.newValue;
        console.log("接收到消息：", newMessage);
      }
    }
  },
};
</script>
