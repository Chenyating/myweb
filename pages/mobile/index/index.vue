<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <!-- 个人资料 -->
    <div class="about-me">
        <div class="me">
            <h1>{{me.name}}</h1>
            <h4>{{me.intro}}</h4>
        </div>
        <div class="flex">
            <img class="img" src="~/static/mobile/index/yating.jpg">
            <div></div>
        </div>
    </div>
    <!-- 列表介绍 -->
    <div class="intro-box" v-for="(item,index) in infoList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="img-box">
            <img class="img" :src="item.imgUrl">
            <div class="content">{{item.content}}</div>
        </div>
        <!--链接列表 -->
        <div v-if="item.linkList" v-for="(link,index) in item.linkList" :key="index">
            <a class="link" :href="link.a">
          {{link.title}}
        </a> </div>
    </div>

</div>
</template>
<script>
export default {
    data() {
        return {
            name: "YATING",
            me: {
                name: "YATING",
                intro: "Front end development engineer"
            },
            infoList: [{
                    title: "CSDN:YaTing 的 Soil solution",
                    imgUrl: require("~/static/mobile/index/csdn.jpg"),
                    content: "在CSDN中,写博客已经快2年了,原创54篇,总浏览量1万。每天记录自己在技术方面的成长，由一只小小菜鸟演变成一只菜鸟，只为通往大神的方向……",
                    linkList: [{
                            a: "https://blog.csdn.net/lemisi/article/details/88831289",
                            title: "艺术二维码生成过程canvas+html2canvas.js+qrcode.js"
                        },
                        {
                            a: "https://blog.csdn.net/lemisi/article/details/82824676",
                            title: "详解前端俄罗斯方块代码：HTML+JS+CANVAS实现原理"
                        },
                        {
                            a: "https://blog.csdn.net/lemisi/article/details/88051630",
                            title: "详解球球保卫大作战：html+js+canvas实现原理"
                        },
                        {
                            a: "https://blog.csdn.net/lemisi/article/details/83242543",
                            title: "详解前端扫雷代码：HTML+JS+DIV实现原理"
                        },
                        {
                            a: "https://blog.csdn.net/lemisi/article/details/82219322",
                            title: "贪吃蛇前端代码"
                        }
                    ]
                },
                {
                    title: "github YATING",
                    imgUrl: require("~/static/mobile/index/github.jpg"),
                    content: "My interest is to write interesting small games, through thinking about the logic of the game, to achieve it,Because I'm a ofront-end development engineer!",
                    linkList: [{
                        a: "#",
                        title: "小游戏集合：https://github.com/Chenyating/easyGame"
                    }]
                },
                {
                    title: "站酷（ZCOOL）-YATING的主页",
                    imgUrl: require("~/static/mobile/index/zhanku.jpg"),
                    content: "拥有11年ps使用经验,4年平面设计经验，非科班出身，累计成交60多单交易，好评率99%。累计100多个原创设计作品，把兴趣当成一种爱好，修出美丽的世界……"
                }
            ]
        };
    }
};
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.mobile-index-box {
    @imgSize: 108px; // 图片大小；
    .img {
        width: @imgSize;
        height: @imgSize;
        margin-right: @distansSmall;
    }
    .me {
        background: @blue;
        color: @white;
        padding: @distansBig;
    } // csdn,github,zhanku
    .intro-box {
        padding: 0 @distansBig;
        border-bottom: solid @distansSmall @line-color; // 标题
        .title {
            font-size: @title-size;
        } // 图片
        .img-box {
            .flex;
            .content {
                .text;
            }
        } // 链接列表
        .link {
            .text-ignore;
            display: inline-block;
            padding: @distansSmall 0;
            border-bottom: @line-sizeSmall @line-color solid;
            padding-right: @distansBig;
            width: 100%;
            &:after {
                content: url("@{more-img}");
                font-weight: bold;
                padding: @distansSmall;
                line-height: @text-lineHeight;
                vertical-align: middle;
            }
        }
    }
}
</style>


