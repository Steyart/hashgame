<script>
import toHref from "@/mixins/toHref";
import { mapGetters } from "vuex";
export default {
  mixins: [toHref],
  watch: {
  },
  computed:{
    ...mapGetters(['indexNav', 'showLeft'])
  },
  data() {
    return {
    };
  },
  components:{ },
  created(){
  },
  mounted() {
    
  },
  methods: {
  },
};
</script>

<template>
  <div>
    更多
  </div>
</template>

<style scoped>

</style>
