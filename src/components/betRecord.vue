<script>
    import toHref from "@/mixins/toHref";
    import { mapGetters } from "vuex";
    export default {
    mixins: [toHref],
    watch: {},
    computed: {
        ...mapGetters(["indexNav", "showLeft"]),
        win: function(){
            let a = this.lists1.filter(v=>{ return v.win_result == 2})
            return a.length
        },
        lose: function(){
            let a = this.lists1.filter(v=>{ return v.win_result == 1})
            return a.length
        },
        all: function(){
            let a = this.lists1.filter(v=>{ return v.win_result > 0})
            return a.length
        },
        newlists1(){
            let arr = this.lists1
            let a = []
            let b = []
            let c = []
            let d = []
            arr.forEach((v,k)=>{
                if(k < 6){
                    a.push(v)
                }else if(k >= 6 &&k < 12){
                    b.push(v)
                }else if(k >= 12 &&k < 18){
                    c.push(v)
                }else if(k >= 18 &&k < 24){
                    d.push(v)
                }
            })
            let aa = [a,b,c,d]
            return aa
        },
    },
    props:{
        hasHe: {
            default:()=>{
                return false
            }
        },
        allList: {
            default: ()=>{
                return []
            },
        },
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
    <div>
        <div class="flex justify-between items-center text-ll mt-12 mb-9 text-white">
        <div class="ml-7"><span class="mr-7">#</span><span>{{all}}</span></div>
        <div class="flex items-center">
            <div class="w-15 h-15 leading-[.19rem] flex items-center justify-center bg-[#031BDD] rounded-full mr-6" >
            0
            </div>
            <div  class="leading-[.19rem] flex items-center">{{lose}}</div>
        </div>
        <div class="flex items-center">
            <div class="w-15 h-15 leading-[.19rem] flex items-center justify-center bg-[#FF5C01] rounded-full mr-6">
            E
            </div>
            <div class="leading-[.19rem] flex items-center">{{win}}</div>
        </div>
        <div class="flex items-center" v-if="hasHe"><!-- 和 -->
            <div class="w-15 h-15 leading-[.19rem] flex items-center justify-center bg-[#FDC300] rounded-full mr-6">
            I
            </div>
            <div class="leading-[.19rem] flex items-center">2</div>
        </div>
        <div class="flex gap-x-10">
            <div class="text-tomato-yellow  relative">
                <div class="text-white mr-8 absolute left-8 top-0 bottom-0 flex items-center leading-[.34rem]">0</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="18" viewBox="0 0 60 18" fill="none" >
                    <rect width="60" height="18" rx="9" fill="#5164FF" ></rect>
                    <circle cx="25" cy="9" r="3" stroke="#FF5C01" ></circle>
                    <circle cx="35" cy="9" r="3.5" fill="#FF5C01" ></circle>
                    <path d="M47.3535 7.35352L42.3535 12.3535" stroke="#FF5C01" stroke-linecap="round" ></path>
                </svg>
            </div>
            <div class="text-wathet-deep relative">
                <div class="text-white mr-8 absolute left-8 top-0 bottom-0 flex items-center leading-[.34rem]">E</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="18" viewBox="0 0 60 18" fill="none" >
                    <rect width="60" height="18" rx="9" fill="#FF5C01" ></rect>
                    <circle cx="25" cy="9" r="3" stroke="#5164FF" ></circle>
                    <circle cx="35" cy="9" r="3.5" fill="#5164FF" ></circle>
                    <path d="M47.3535 7.35352L42.3535 12.3535" stroke="#5164FF" stroke-linecap="round" ></path>
                </svg>
            </div>
        </div>
        </div>
        <div class="flex overflow-x-auto">
            <table class="rounded-lg overflow-hidden text-xs text-white bg-[#141316]" >
            <tbody class="flex ">
                <tr class="flex flex-col" v-for="(tab, i) in newlists1" :key="i" >
                    <td v-for="(v, k) in tab" :key="k">
                        <div class="td-box1">
                            <div v-if="v.win_result" :class="{ 'bg-[#5164FF]': v.win_result == '1', 'bg-[#FF5C01]': v.win_result == '2', 'bg-[#FDC300]': v.win_result == '3', }" class="left-number" >
                            {{ v.win_result==1?'0' : v.win_result==2?'E' : 'I' }}
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
            <table class="rounded-lg overflow-hidden text-xs text-white bg-[#141316]" >
            <tbody class="flex ">
                <tr class="flex flex-col" v-for="(val, i) in lists2" :key="i">
                    <td v-for="(v, k) in val" :key="k">
                        <div class="td-box2">
                            <div :class="{ 'border-2 border-[#5164FF]': v.win_result == '1', 'border-2 border-[#FF5C01]': v.win_result == '2'}" ></div>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
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
.td-box2 > div{
  @apply w-full h-full rounded-full
}
</style>