
<template>
<div class="D-big">
    <div class="hua"></div>
    <transition v-if="btnFlag" name="toptop">
        <img class="gotop" @click="backTop" src="~static/mobile/icon/top.png" />
    </transition>
    <go-back routerName="/articles" :title="title"></go-back>
    <div>
        <mavon-editor class="md-box" v-if="ifhas" :toolbars="markdownOption" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" :subfield="false" defaultOpen="preview" codeStyle="atom-one-dark" v-model="content" />
    </div>
</div>
</template>
<script>
import SERVER from "~/assets/server/api.js";
import goBack from "~/components/mobile/back.vue";
export default {
    transition: 'article',
    components: {
        goBack
    },
    data() {
        return {
            // 标题
            title: '',
            content: "#haha", //内容
            markdownOption: {
                bold: true // 粗体
            },
            ifhas: false,
            btnFlag: false, //是否显示旗帜
        };
    },
    methods: {
        // 获得文字内容
        getArticle(title) {
            var params = {
                title: title
            };
            SERVER.postAticle(params)
                .then(data => {
                    if (data.data.code == 1) {
                        this.content = JSON.parse(data.data.content);
                        this.ifhas = true;
                    } else {
                        this.content = data.data.content;
                    }
                })
                .catch(err=>{
                    this.$Message.error("๑乛◡乛๑后台卡在了奇怪的地方");
                });
        },
        // 回到顶部
        backTop() {
            const that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                    clearInterval(timer)
                }
            }, 16)
        },

        // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
        scrollToTop() {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 100) {
                that.btnFlag = true
            } else {
                that.btnFlag = false
            }
        }
    },
    mounted() {
        this.title = this.$route.query.title;
        this.getArticle(this.title);
        window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollToTop)
    },

};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.flex-col-between {
    width: 100%;
    height: 100%;
}

.hua {
    // x方向重复背景
    background-image: url("~static/mobile/icon/hua.png"), url("~static/mobile/icon/cao.png");
    background-position: bottom;
    background-size: 40px, 20px;
    background-repeat: repeat-x;
    bottom: 0;
    height: 50px;
    width: 100%;
    position: fixed;
    z-index: 1501;
}

// 去顶部使用的动画
.gotop {
    position: fixed;
    top: 50%;
    z-index: 1501;
    .icon(@width: 40px);
    animation: topgo 4s infinite;
}

@keyframes topgo {
    from {
        .before();
    }
    to {
        .after();
    }
}

.before {
    .icon(@width: 30px);
    transform: rotate(180deg)
}

.after {
    .icon(@width: 30px);
    transform: rotate(-180deg)
}

.toptop-enter-active,
.toptop-leave-active {
    transition: opacity .5s;
}

.toptop-enter,
.toptop-leave-to
/* .fade-leave-active below version 2.1.8 */

{
    opacity: 0;
}
</style>