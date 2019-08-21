<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <!-- 个人资料 -->
    <div class="about-me">
        <div class="me">
            <h1>{{me.name}}</h1>
            <h4>{{me.intro}}</h4>
        </div>
        <div class="intro-box">
            <img class="img" src="~/static/mobile/index/yating.jpg" align="left" hspace="5" vspace="5">
            <div class="text">
                2018年3月开始参加工作，开始从事于前端开发工作。梦想是成为一名优秀的前端开发工程师！ 是一个喜欢接触新的事物，喜欢专研新的东西，思维活跃，富有创意，认真负责，待人亲切，有团队意识的小伙伴。
                <div>
                    <Tag color="magenta">javascript</Tag>
                    <Tag color="orange">es6</Tag>
                    <Tag color="red">html5</Tag>
                    <br/>
                    <Tag color="volcano">css3</Tag>
                    <Tag color="blue">less</Tag>
                    <Tag color="yellow">iview</Tag>
                    <br/>
                    <Tag color="gold">vue.js</Tag>
                    <Tag color="yellow">vue-cli</Tag>
                    <Tag color="lime">nuxt</Tag>
                    <Tag color="green">vue-router</Tag>
                    <Tag color="cyan">vuex</Tag>
                    <br/>
                    <Tag color="geekblue">node.js</Tag>
                    <Tag color="#FFA2D3">node express</Tag>
                    <br/>
                    <Tag color="#FFA2D3">mysql</Tag>
                    <Tag color="purple">sql</Tag>
                </div>
            </div>
        </div>
    </div>
    <!-- 列表介绍 -->
    <div class="intro-box" v-for="(item,index) in infoList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="img-box">
            <!-- 文字环绕在图片周围：图片设置标签的属性align="right"即可，其中 vspace 表示图片与文字的上下距离，hspace表示左右距离。 -->
            <img class="img" align="left" :src="item.imgUrl" width="120" hspace="5" vspace="5">
            <div class="content" v-html="item.content">{{item.content}}</div>
        </div>
        <!--链接列表 -->
        <div v-if="item.linkList" v-for="(link,index) in item.linkList" :key="index">
            <outer-router :link='link.a' :title="link.title"></outer-router>
        </div>
    </div>

</div>
</template>
<script>
import outerRouter from '~/components/public/outerRouter'
export default {
    components: {
        outerRouter
    },
    data() {
        return {
            name: "YATING",
            me: {
                name: "YATING",
                intro: "用心写代码，不辜负程序员之名"
            },
            infoList: [{
                    title: "CSDN:YaTing 的 Soil solution",
                    imgUrl: require("~/static/mobile/index/csdn.jpg"),
                    content: "在<em>CSDN</em>中,写博客已经快<em>2</em>年了,原创<em>54</em>篇,总浏览量<em>1万</em>。每天记录自己在技术方面的成长，由一只小小菜鸟演变成一只<em>菜鸟</em>，只为通往大神的方向……",
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
                    content: "My interest is to write <em>interesting small games</em>, through thinking about the logic of the game, to achieve it, beautify it.Because I'm a<em>ofront-end development engineer!</em>",
                    linkList: [{
                        a: "#",
                        title: "小游戏集合：https://github.com/Chenyating/easyGame"
                    }]
                },
                {
                    title: "站酷（ZCOOL）-YATING的主页",
                    imgUrl: require("~/static/mobile/index/zhanku.jpg"),
                    content: "拥有<em>11</em>年ps使用经验,<em>4年</em>平面设计经验，非科班出身，累计成交<em>60</em>多单交易，好评率<em>99%</em>。累计<em>100</em>多个原创设计作品，把兴趣当成一种爱好，修出美丽的世界……"
                }
            ]
        };
    }
};
</script>
<style lang="less">
@import "~assets/css/mobile/base.less";
.mobile-index-box {
    @imgSize: 108px; // 本页的图片大小；
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
        padding: @distansBig;
        border-bottom: solid @distansSmall @line-color; // 标题
        .title {
            font-size: @title-size;
        } // 图片
        .img-box {
            .content {
                .text();
                em {
                    color: @red;
                }
            }
        } // 链接列表
        .link {
            .text-ignore;
            display: inline-block;
            padding: @distansSmall 0;
            border-bottom: @line-sizeSmall @line-color solid;
            padding-right: @distansBig;
            width: 100%;
            font-size: @text-size;
            &:after {
                content: url("@{more-img}");
                font-weight: bold;
                padding: @distansSmall;
                line-height: @text-lineHeight;
                vertical-align: middle;
            }
        }
        .tip-text {
            .gray-text();
            padding-top: @distansSmall;
        }
    }
}
</style>


