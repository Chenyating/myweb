<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <h1>12345</h1>
    <!-- 列表介绍 -->
    <div class="intro-box" v-for="(item,index) in infoList" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="img-box">
            <img class="img" :src="item.imgUrl">
            <div class="content">{{item.content}}</div>
        </div>
        <div v-for="(link,index) in item.linkList" :key="index">
            <div class="link">
                {{link.title}}
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            name: "YATING",
            infoList: [{
                    title: "-专业IT技术社区",
                    imgUrl: require('~/static/mobile/index/zhanku.jpg'),
                    content: "脚本小子”常常从某些网站上复制脚本代码,然后到处粘贴,却并不明白其中的方法与原理​​当你看到编程语言编进教材的时候,看到一个文科生也在编写Pytho...",
                    linkList: [{
                            a: "#",
                            title: "下载"
                        },
                        {
                            a: "",
                            title: "博客"
                        },
                        {
                            a: "",
                            title: "论坛"
                        }
                    ]
                },
                {
                    title: "-专业IT技术社区",
                    imgUrl: require('~/static/mobile/index/zhanku.jpg'),
                    content: "脚本小子”常常从某些网站上复制脚本代码,然后到处粘贴,却并不明白其中的方法与原理​​当你看到编程语言编进教材的时候,看到一个文科生也在编写Pytho...",
                    linkList: [{
                            a: "#",
                            title: "下载"
                        },
                        {
                            a: "",
                            title: "博客"
                        },
                        {
                            a: "",
                            title: "论坛"
                        }
                    ]
                },
                {
                    title: "-专业IT技术社区",
                    imgUrl: require('~/static/mobile/index/zhanku.jpg'),
                    content: "脚本小子”常常从某些网站上复制脚本代码,然后到处粘贴,却并不明白其中的方法与原理​​当你看到编程语言编进教材的时候,看到一个文科生也在编写Pytho...",
                    linkList: [{
                            a: "#",
                            title: "下载"
                        },
                        {
                            a: "",
                            title: "博客"
                        },
                        {
                            a: "",
                            title: "论坛"
                        }
                    ]
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.mobile-index-box {
    .intro-box {
        padding: @distansSmall;
        .title {
            font-size: @title-size;
        }
        .img-box {
            .flex;
            .img {
                width: 108px;
                height: 108px;
                margin-right: @distansSmall;
            }
            .content {
                .text;
            }
        }
        .link {
            padding: @distansBig;
            border-bottom: @line-sizeSmall @line-color solid;
        }
        .link:after {
            content: url('@{more-img}');
        }
    }
}
</style>


