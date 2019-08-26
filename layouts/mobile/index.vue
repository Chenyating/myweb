<template>
<div class="D-show">
    <div id="box"></div>
    <Header></Header>
    <nuxt/>
    <Footer :num="times"></Footer>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
import Header from '~/components/mobile/header';
import Footer from '~/components/mobile/footer'
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            times: null,
            imgUrl: require("~/static/mobile/index/me.png")
        }
    },
    methods: {
        playFloatBox() {
            var getbox = $("#box");
            for (let index = 0; index < 10; index++) {
                getbox.append(` <img class="icon" src="${this.imgUrl}"/>`);
            }
            $("#box img").animate({
                opacity: '1',
                height: '40px',
                width: '40px',
                rotate:'180deg',
            });
        }
    },
    mounted() {
        var params = {
            name: "mobileIndex"
        }
        SERVER.addTimes(params).then((data) => {
            // console.log(data)
        }).catch((err) => {
            console.log(err)
        })
        SERVER.getTimes(params).then((data) => {
            this.times = data.data[0].times;
            console.log(this.times)
        }).catch((err) => {
            console.log(err)
        })
        this.playFloatBox();
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
#box {
    position: absolute;
    z-index: 9999999;
}

.icon {
    .icon(@width: 40px);
}
</style>

