<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <!-- 个人资料
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
    </div> -->
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
            }
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
}
</style>


