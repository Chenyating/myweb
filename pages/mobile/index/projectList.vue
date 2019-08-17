<template>
<div>
    <div class="project-item" v-for="(item,index) in projectList" :key="index">
        <div class="flex-item">
            <img class="icon" :src="item.imgUrl" width="120">
            <div class="name">{{item.name}}</div>
        </div>
        <div class="item-content">{{item.content}}</div>
        <!-- 标签 -->
        <div>
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="yellow">yellow</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
            <Tag color="#FFA2D3">Custom Color</Tag>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            projectList: [{
                imgUrl: require("~/static/mobile/index/fruit.png"),
                name: "第一个项目",
                content: "对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
                link: "www.baidu.com",
                keyword: 'vuxex',
                time:'2019-12-10~2018-12-40'
            }, {
                imgUrl: require("~/static/mobile/index/fruit.png"),
                name: "第一个项目",
                content: "对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
                link: "www.baidu.com",
                keyword: 'vuxex',
                time:'2019-12-10~2018-12-40'
            }, {
                imgUrl: require("~/static/mobile/index/fruit.png"),
                name: "第一个项目",
                content: "对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
                link: "www.baidu.com",
                keyword: 'vuxex',
                time:'2019-12-10~2018-12-40'
            }]
        }
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
    .icon {
        width: 60px;
        height: 60px;
    }
    .project-item {
        width: 100%;
        padding:@distansBig;
        border-bottom:@distansSmall @line-color solid;
        .flex-item {
            .flex();
            justify-content: center;
            align-items: center;
        }
        .name {
            .text();
            font-weight: bold;
        }
        .item-content {
            .text();
        }
        .item-key {
            color: @red;
        }
    }
</style>

