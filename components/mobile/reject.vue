<template>
<div class="tip-box">
    <img class="tip-icon" :src="rejectImgList[imgIndex]" />
    <div class="text">{{rejectWord[worldIndex]}}</div>
</div>
</template>
<script>
export default {
    data() {
        return {
            rejectImgList: [
                require("~/static/mobile/random/reject1.png"),
                require("~/static/mobile/random/reject2.png"),
                require("~/static/mobile/random/reject3.png"),
                require("~/static/mobile/random/reject4.png"),
                require("~/static/mobile/random/reject5.png"),
            ],
            rejectWord: [
                "o(╥﹏╥)o东西好多，等一会会~",
                "∑(っ°Д°;)っ东西去哪儿了！",
                "Σσ(・Д・；)东西捏？我我我什么都没做!!!",
                "๑乛◡乛๑数据卡在了奇怪的地方",
                "(╥╯﹏╰╥)ง还没给到我东西给你展示~",
            ],
            imgIndex:null,
            worldIndex:null
        }
    },
    methods:{
        getRadomImg(){
           this.imgIndex=Math.floor(Math.random()*this.rejectImgList.length);
           this.worldIndex=Math.floor(Math.random()*this.rejectWord.length);
        }
    },
    mounted(){
        this.getRadomImg();
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.text{
    color: @gray;
}
</style>