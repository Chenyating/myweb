<template>
<div class="D-show">
  <div id="box"></div>
  <!-- <Header></Header>
  <nuxt />
  <Footer :num="times"></Footer> -->
</div>
</template>
<script>
import SERVER from "~/assets/server/api.js";
import Header from "~/components/mobile/header";
import Footer from "~/components/mobile/footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      times: null,
      imgUrl: require("~/static/mobile/index/leaf.png"),
      pendant: null, //挂件
    };
  },
  methods: {
    // 获取随机数
    getRandom(x, y) {
      return Math.floor(Math.random() * (y - x)) + x;
    },
    // 悬浮挂件
    makePendant() {
      var getbox = $("#box");
      // 一次出现5个挂件
      for (let index = 0; index < 5; index++) {
        var item = $(` <img src="${this.imgUrl}"/>`);
        item.css({
          "position": "fixed",
          "top": `${this.getRandom(0, 100)}%`,
          "right": `${this.getRandom(0, 100)}%`,
          "transfrom": `rotate(${this.getRandom(0, 180)}deg)`,
          "width": `${this.getRandom(30, 40)}px`,
          "height": "auto",
          "opacity": "0",
        });
        item.animate({
          transfrom: `rotate(${this.getRandom(0, 180)}deg)`,
          opacity: "1",
          width: "0",
          top: `${this.getRandom(0, 100)}%`,
          right: `${this.getRandom(0, 100)}%`
        }, 6000);
        getbox.append(item);
      }
    },
    // 添加浏览次数
    addTimes(params) {
      SERVER.addTimes(params)
        .then(data => {
          // console.log(data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTimes(params) {
      SERVER.getTimes(params)
        .then(data => {
          this.times = data.data[0].times;
          console.log(this.times);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    var params = {
      name: "mobileIndex"
    };
    this.addTimes(params);
    this.getTimes(params);
    // 循环挂件，每隔10秒来一次
    this.pendant = setInterval(() => {
      this.makePendant();
    }, 1000)

  },
  destroyed() {
    clearInterval(this.pendant)
  }
};
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
#box {
  position: fixed;
  z-index: 9999999;
}

.icon {
  .icon(@width: 40px);
}

.D-show {
  position: relative;
}
</style>

