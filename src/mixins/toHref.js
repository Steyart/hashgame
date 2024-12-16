/* 跳转路由 */
import { getImg } from "@/service/util.helper";
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
  },
  mounted() {

  },
  methods: {
    getRequireImg(src) {
      return getImg(src)
    },
  }
}
export default toHref
