<template>
    <div>
        <div v-for="(item,index) in projectList" :key="index">
            <img class="icon" align="left" :src="item.imgUrl" width="120" hspace="5" vspace="5">
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
                    content:"这是第一个项目项目，这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目",
                    link:"www.baidu.com"
                },
                {
                    imgUrl:require("~/static/mobile/index/fruit.png"),
                    name:"第一个项目",
                    content:"这是第一个项目项目，这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目",
                    link:"www.baidu.com"
                },
                {
                    imgUrl:require("~/static/mobile/index/fruit.png"),
                    name:"第一个项目",
                    content:"这是第一个项目项目，这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目这是第一个项目项目",
                    link:"www.baidu.com"
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.icon{
    width: 40px;
    height: 40px;
}
</style>

