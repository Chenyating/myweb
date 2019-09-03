<template>
<div class="D-show">
    <div :class="ifshow?'showPendant':'noshowPendant'" @click="showPendant"></div>
    <div id="PendantBox">
    </div>
    <Header></Header>
    <nuxt />
    <Footer :num="times"></Footer>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";
import Header from "~/components/mobile/header";
import Footer from "~/components/mobile/footer";
import {
    mapActions
} from 'vuex';
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
            pendantNum: 1, //数量
            pendantSpeed: 10000, //速度
            ifshow: false,
        };
    },
    methods: {
        ...mapActions([
            'isLogin'
        ]),
        // 获取随机数
        getRandom(x, y) {
            return Math.floor(Math.random() * (y - x)) + x;
        },
        // 悬浮挂件
        makePendant() {
            var getPendantBox = $("#PendantBox");
            // 一次出现pendantNum个挂件
            for (let index = 0; index < this.pendantNum; index++) {
                var item = $(` <img src="${this.imgUrl}"/>`);
                // 设置基础样式
                item.css({
                    "position": "fixed",
                    "top": `${this.getRandom(20, 100)}%`,
                    "right": `${this.getRandom(0, 100)}%`,
                    "transfrom": `rotate(${this.getRandom(0, 180)}deg)`,
                    "width": `${this.getRandom(30, 40)}px`,
                    "height": "auto",
                    "opacity": "0",
                });
                // 第一次移动的动画
                item.animate({
                    transfrom: `rotate(${this.getRandom(0, 180)}deg)`,
                    opacity: "1",
                    width: "20px",
                    top: `${this.getRandom(0, 100)}%`,
                    right: `${this.getRandom(0, 100)}%`
                }, this.pendantSpeed);
                // 第二次移动的动画
                item.animate({
                    transfrom: `rotate(${this.getRandom(0, 180)}deg)`,
                    opacity: "0",
                    width: "10",
                    top: `${this.getRandom(0, 100)}%`,
                    right: `${this.getRandom(0, 100)}%`
                }, this.pendantSpeed);
                getPendantBox.append(item);
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
        },
        showPendant() {
            this.ifshow = !this.ifshow;
            if (this.ifshow) {
                // 循环挂件，每隔5秒来一次
                this.pendant = setInterval(() => {
                    this.makePendant();
                    // 当漂浮物宽度为0的时候，那就清除它自己
                    $("#PendantBox img").each(function(index, element) {
                        if (element.style.width == "10px") {
                            element.remove();
                        }
                    });
                }, this.pendantSpeed / 2)
            } else {
                $("#PendantBox img").remove();
                clearInterval(this.pendant)
            }
        }
    },
    mounted() {
        this.isLogin();
        var params = {
            name: "mobileIndex"
        };
        this.addTimes(params);
        this.getTimes(params);
        this.showPendant();
    },
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
#PendantBox {
    position: relative;
    z-index: -1;
}

.showPendant {
    z-index: 3;
    position: fixed;
    background-image: url("~static/mobile/index/leaf.png");
    background-size: 100%;
    .D-rotate-Long();
    .icon(@width: 40px);
}

.noshowPendant {
    z-index: 3;
    position: fixed;
    background-image: url("~static/mobile/index/leaf.png");
    background-size: 100%;
    .icon(@width: 40px);
}

.icon {
    .icon(@width: 40px);
}

// 最外框绝对定位，内部滚动
.D-show {
    display: fixed;
    height: 100%;
    overflow: scroll;
}
</style>
