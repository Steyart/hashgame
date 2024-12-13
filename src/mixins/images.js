/* 跳转路由 */
import { getImg } from "@/service/util.helper";
var images = {
  data() {
    return {
        publicImg: {
            HashGO_loading: getImg('HashGO.gif'),
        },
        vipImg: {
            bronze_has: getImg('vip/bronze_has.png'),
            bronze_no: getImg('vip/bronze_no.png'),
            silver_has: getImg('vip/silver_has.png'),
            silver_no: getImg('vip/silver_no.png'),
            gold_has: getImg('vip/gold_has.png'),
            gold_no: getImg('vip/gold_no.png'),
            platinumBlue_has: getImg('vip/platinum-blue_has.png'),
            platinumBlue_no: getImg('vip/platinum-blue_no.png'),
            masonry_has: getImg('vip/masonry_has.png'),
            masonry_no: getImg('vip/masonry_no.png'),

            fanli: getImg('vip/fanli.png'),
            kefu: getImg('vip/kefu.png'),
            lijin: getImg('vip/lijin.png'),
            jinji: getImg('vip/jinji.png'),

            vip1: getImg('vip/1.png'),
            vip2: getImg('vip/2.png'),
            vip3: getImg('vip/3.png'),
            vip4: getImg('vip/4.png'),
            vip5: getImg('vip/5.png'),
            vip6: getImg('vip/6.png'),
            vip7: getImg('vip/7.png'),
            vip8: getImg('vip/8.png'),
            vip9: getImg('vip/9.png'),
            vip10: getImg('vip/10.png'),
            vip11: getImg('vip/11.png'),
            vip12: getImg('vip/12.png'),
            vip13: getImg('vip/13.png'),
            vip14: getImg('vip/14.png'),
            vip15: getImg('vip/15.png'),
        },
        activityImg: {
            "beisujingsai-1": getImg('activity/beisujingsai-1.png'),
            "qiandao-1": getImg('activity/qiandao-1.png'),
            "xinshou-1": getImg('activity/xinshou-1.png'),
            "chongzhisongli-1": getImg('activity/chongzhisongli-1.png'),

            "beisujingsai": getImg('activity/beisujingsai.png'),
            "qiandao": getImg('activity/qiandao.png'),
            "xinshou": getImg('activity/xinshou.png'),
            "chongzhisongli": getImg('activity/chongzhisongli.png'),
            "zhenren": getImg('activity/zhenren.png'),
            "haxi": getImg('activity/haxi.png'),
            "qipai": getImg('activity/qipai.png'),
            "tiyu": getImg('activity/tiyu.png'),
            
            "amount_100": getImg('activity/100.png'),
            "amount_50": getImg('activity/50.png'),
            "amount_30": getImg('activity/30.png'),
            "amount_10": getImg('activity/10.png'),
        },
        myImg:{
            vip1: getImg('vip/vip1.png'),
            vip2: getImg('vip/vip2.png'),
            vip3: getImg('vip/vip3.png'),
            vip4: getImg('vip/vip4.png'),

            icon_1: getImg('my/icon_1.png'),
            icon_2: getImg('my/icon_2.png'),
            icon_3: getImg('my/icon_3.png'),
            icon_4: getImg('my/icon_4.png'),
            icon_5: getImg('my/icon_5.png'),
            icon_6: getImg('my/icon_6.png'),
            icon_7: getImg('my/icon_7.png'),
            icon_8: getImg('my/icon_8.png'),

            head_img0: getImg('my/Profile-picture.png'),
            head_img1: getImg(`my/img1.png`),
            head_img2: getImg(`my/img2.png`),
            head_img3: getImg(`my/img3.png`),
            head_img4: getImg(`my/img4.png`),
            head_img5: getImg(`my/img5.png`),
            head_img6: getImg(`my/img6.png`),
            head_img7: getImg(`my/img7.png`),
            head_img8: getImg(`my/img8.png`),
            head_img9: getImg(`my/img9.png`),
        },
        unionImg:{
            img_A: getImg('union/A.png'),
            img_B: getImg('union/B.png'),
            img_C: getImg('union/C.png'),
            img_D: getImg('union/D.png'),
            img_E: getImg('union/E.png'),
            img_F: getImg('union/F.png'),
            img_G: getImg('union/G.png'),
        },
        gameImg:{
            wm: getImg('collaborator/wm.png'),
            pg: getImg('collaborator/pg.png'),
            db: getImg('collaborator/db.png'),
            jdb: getImg('collaborator/jdb.png'),
        },
    }
  },
  created() {
    console.log(_APP_COLOR_)
  },
  computed: {
  },
  mounted() {

  },
  methods: {
  }
}
export default images
