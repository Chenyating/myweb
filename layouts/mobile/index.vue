<template>
  <div class="D-show">
    <div id="box"></div>
    <Header></Header>
    <nuxt />
    <Footer :num="times"></Footer>
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
      imgUrl: require("~/static/mobile/index/me.png"),
      haha:null
    };
  },
  methods: {
    getRandom(x, y) {
      return Math.floor(Math.random() * (y - x)) + x;
    },
    playFloatBox() {
      var getbox = $("#box");
      for (let index = 0; index < 10; index++) {
        var item = $(` <img class="icon" src="${this.imgUrl}"/>`);
        item.css({
          "position": "fixed",
          "top": `${this.getRandom(0, 100)}%`,
          "right": `${this.getRandom(0, 100)}%`,
          "transfrom": "rotate(180deg)",
          "animation": "rotateLong 2s infinite;nim",
          "width":`${this.getRandom(50, 80)}px`,
          "height":"auto",
          "opacity": "0.7",
        });
        item.animate({
            opacity: "1",
            width:"0",
            top:`${this.getRandom(0, 100)}%`
          },10000);
        getbox.append(item);
      }
    }
  },
  mounted() {
    var params = {
      name: "mobileIndex"
    };
    SERVER.addTimes(params)
      .then(data => {
        // console.log(data)
      })
      .catch(err => {
        console.log(err);
      });
    SERVER.getTimes(params)
      .then(data => {
        this.times = data.data[0].times;
        console.log(this.times);
      })
      .catch(err => {
        console.log(err);
      });
    //   this.haha=setInterval(()=>{
    //       this.playFloatBox();
    //   },5000)
  },
  destroyed(){
      clearInterval(this.haha)
      console.log("xia")
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

