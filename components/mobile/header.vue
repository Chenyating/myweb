<template>
<!-- 这是头部 -->
<div class="mobile-header">
    <!-- 这是logo -->
    <!-- <div class="logo">
        <img class="logo" src="https://www.baidu.com/img/bd_logo1.png">
    </div> -->
    <!-- 搜索框 -->
    <!-- <div class="search-box">
        <div class="flex-left">
            <img src="~static/mobile/index/baidu.png" class="small-log" />
            <div class="name">陈雅婷</div>
        </div>
        <div class="connect" data-toggle="modal" data-target="#myModal">联系一下</div>
    </div> -->
    <!-- 这是导航栏 -->
    <ul class="nav">
        <nuxt-link tag='li' v-for="(item,index) in indexRoutes" :key="index" :to="{name:item.path}" class="unget-a" exact-active-class="get-a"> {{item.name}}</nuxt-link>
    </ul>
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
                    name: '首页'
                },
                {
                    path: 'mobile-index-projectList',
                    name: '项目'
                },
                {
                    path: 'mobile-index-skill',
                    name: '技能'
                },
                {
                    path: 'mobile-index-experience',
                    name: '经历'
                },
                {
                    path: 'mobile-articleList',
                    name: '文章'
                },
            ]

        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style lang="less" scoped>
.mobile-header {
    width: 100%;
    // logo
    .logo {
        width: 150px;
        margin: 0 auto;
    }
    // 导航栏
    .nav {
        margin: 10px;
        display: flex;
        .unget-a {
            font-size: 15px;
            margin: 0 5px;
            padding: 5px 0;
            color: #666;
        }
        .get-a {
            font-size: 15px;
            margin: 0 5px;
            padding: 5px 0;
            color: #000;
            border-bottom: solid 3px #000000;
        }
    }
    /* 搜索框 */
    .search-box {
        border: solid 1px #000000;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        margin: 0 10px;
        padding: 5px;
        .flex-left {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
        }
        .small-log {
            width: 30px;
            height: 30px;
        }
        .name {
            text-align: left;
        }
        .connect {
            color: #38f;
            font-weight: bold;
            margin: 0 10px;
        }
    }
}
</style>


