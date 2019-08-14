<template>
    <div class="flex">
        <div class="project-item" v-for="(item,index) in projectList" :key="index">
            <img class="icon" align="left" :src="item.imgUrl" width="120">
            <div class="name">{{item.name}}</div>
            <div>{{item.content}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            projectList:[
                {
                    imgUrl:require("~/static/mobile/index/fruit.png"),
                    name:"第一个项目",
                    content:"对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
                    link:"www.baidu.com"
                },
                {
                    imgUrl:require("~/static/mobile/index/fruit.png"),
                    name:"第一个项目",
                    content:"对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
                    link:"www.baidu.com"
                },
                {
                    imgUrl:require("~/static/mobile/index/fruit.png"),
                    name:"第一个项目",
                    content:"对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
                    link:"www.baidu.com"
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.flex{
    padding: 0 @distansBig;
    .icon{
        width: 60px;
        height: 60px;
    }
    .project-item{
        width:50%;
        padding:0 @distansBig;
        .name{
           .text();
           font-weight: bold;
        }
    }
}
</style>

