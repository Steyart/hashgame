<script>
import toHref from "@/mixins/toHref";
import { mapGetters } from "vuex";
export default {
  mixins: [toHref],
  watch: {},
  computed: {
    ...mapGetters(["indexNav", "showLeft"]),
  },
  data() {
    return {
        animate: false
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<template>
    <div class="relative">
        <div class="flex justify-center w-44 h-44 mx-9 items-center relative">
            <div class="w-44 relative z-10" @click="animate = !animate"><img src="/public/images/home/1.png" alt=""></div>
            <div :class="animate ? 'animate_rotate' : ''" class="bbb animate w-44 left-0 top-0 absolute "><img src="/public/images/home/1.png" alt=""></div>
            <div :class="animate ? 'animate_rotate' : ''" class="ccc animate w-44 left-0 top-0 absolute "><img src="/public/images/home/5.png" alt=""></div>
            <div :class="animate ? 'animate_rotate' : ''" class="ddd animate w-44 left-0 top-0 absolute "><img src="/public/images/home/10.png" alt=""></div>
            <div :class="animate ? 'animate_rotate' : ''" class="eee animate w-44 left-0 top-0 absolute "><img src="/public/images/home/50.png" alt=""></div>
            <div :class="animate ? 'animate_rotate' : ''" class="fff animate w-44 left-0 top-0 absolute "><img src="/public/images/home/100.png" alt=""></div>
            <div :class="animate ? 'animate_rotate' : ''" class="ggg animate w-44 left-0 top-0 absolute "><img src="/public/images/home/zdy.png" alt=""></div>
        </div>
        <div class="mask" :class="animate? 'maskAnimaOn': ''" v-show="animate" @click="animate = false"></div>
    </div>
</template>

<style scoped>
.animate{
  transition: transform .5s;
  transition-delay: .1s;
  z-index: 9;
}
.animate_rotate{
  transform: rotate(calc(var(--idx)*200deg/5 - 191deg)) translateX(1.8rem)
}
.animate img{
  transform: rotate(calc(var(--idx)*202deg/-5 - 168deg))
}
.mask{
  background: rgba(0, 0, 0, .78);
  filter: blur(.92rem);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: opmaskAnimaOn .5s linear;
  @apply w-393 h-393 absolute rounded-full 
}

@keyframes opmaskAnimaOn{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
.bbb{
  --idx:0;
}
.ccc{
  --idx:1;
}
.ddd{
  --idx:2;
}
.eee{
  --idx:3;
}
.fff{
  --idx:4;
}
.ggg{
  --idx:5;
}

</style>