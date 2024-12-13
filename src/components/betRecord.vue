<script>
    import toHref from "@/mixins/toHref";
    import { mapGetters } from "vuex";
    export default {
    mixins: [toHref],
    watch: {},
    computed: {
        ...mapGetters(["indexNav", "showLeft"]),
    },
    props:{
        lists1: {
            default: ()=>{
                return []
            },
        },
        lists2: {
            default: ()=>{
                return []
            },
        }
    },
    data() {
        return {
            
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {},
    };
</script>
<template>
    <div class="flex overflow-x-auto">
        <table class="rounded-lg overflow-hidden text-xs text-white bg-[#141316]" >
          <tbody >
            <tr v-for="(tab, i) in lists1" :key="i">
              <td >
                <div class="td-box1">
                    <div :class="{ 'bg-[#FF5C01]': tab.value1 == 'E', 'bg-[#5164FF]': tab.value1 == '0', }" class="left-number" >
                    {{ tab.value1 }}
                    </div>
                </div>
              </td>
              <td >
                <div class="td-box1">
                    <div :class="{ 'bg-[#5164FF]': tab.value2 == '0' }" class="left-number">
                    {{ tab.value2 }}
                    </div>
                </div>
              </td>
              <td >
                <div class="td-box1">
                    <div :class="{ 'bg-[#5164FF]': tab.value3 == '0' }" class="left-number">
                    {{ tab.value3 }}
                    </div>
                </div>
              </td>
              <td >
                <div class="td-box1">
                    <div :class="{ 'bg-[#5164FF]': tab.value4 == '0' }" class="left-number">
                    {{ tab.value4 }}
                    </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="rounded-lg overflow-hidden text-xs text-white bg-[#141316]" >
          <tbody>
            <tr v-for="(val, i) in lists2" :key="i">
              <td >
                <div :class="{ 'border-2 border-[#FF5C01]': val.value1 == 'has' }" class="td-box2"></div>
              </td>
              <td >
                <div :class="{ 'border-2 border-[#5164FF]': val.value2 == 'has' }" class="td-box2"></div>
              </td>
              <td >
                <div :class="{ 'border-2 border-[#FF5C01]': val.value3 == 'has' }" class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
              <td >
                <div class="td-box2"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>
<style scoped>
td{
    @apply border border-[#141316]
}
.td-box1{
    @apply w-34 h-34 flex items-center justify-center
}
.left-number{
  @apply w-21 h-21 mx-4 rounded-full flex items-center justify-center
}
.td-box2{
  @apply w-14 h-14 m-1 rounded-full
}
</style>