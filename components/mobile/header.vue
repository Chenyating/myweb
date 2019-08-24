<template>
<!-- 这是头部 -->
<div class="mobile-header">
    <!-- 这是导航栏 -->
    <div class="bg">
        <div class="inf-me">
            <img class="head-img" src="~static/mobile/index/yating.jpg" />
            <div>用心写代码，不负程序员之名</div>
        </div>
        <ul class="nav">
            <nuxt-link tag='div' v-for="(item,index) in indexRoutes" :key="index" :to="{name:item.path}" class="unget-a" exact-active-class="get-a">
                <img class="nav-img" :src="item.imgUrl" />
                <div>{{item.name}}</div>
            </nuxt-link>
        </ul>

    </div>
    <!--  -->
</div>
</template>
<script>
export default {
    data() {
        return {
            navId: '0',
            indexRoutes: [{
                    path: 'mobile-index',
                    name: '我的世界',
                    imgUrl: require("~/static/mobile/index/index.png")
                },
                {
                    path: 'mobile-index-projectList',
                    name: '项目工程',
                    imgUrl: require("~/static/mobile/index/project.png")
                },
                {
                    path: 'mobile-articleList',
                    name: '我的博客',
                    imgUrl: require("~/static/mobile/index/article.png")
                },
                {
                    path: 'mobile-index-message',
                    name: '留言板',
                    imgUrl: require("~/static/mobile/index/message.png")
                },
            ]

        }
    },
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.mobile-header {
    width: 100%;
    margin-bottom: 9*@distansBig;
    .bg {
        background-image: url("~static/mobile/index/bg.jpg");
        width: 100%;
        height: 200px;
        background-size: 100%;
        position: relative;
        .inf-me {
            position: absolute;
            text-align: right;
            bottom: -80px;
            right: @distansBig;
        }
        .head-img {
            .icon(@width: 80px);
        }
    }
    .nav {
        position: absolute;
        bottom: -50px;
        .nav-img {
            .icon(@width: 20px);
        }
        .flex();
        text-align: center;
        height: 50px; // 导航选中情况
        .unget-a {
            margin: @distansBig;
        }
        .get-a {
            text-shadow: 0 1px 6px white;
            font-weight: bold;
        }
    }
}
</style>


