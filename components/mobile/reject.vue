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
                "o(╥﹏╥)o后台出问题了额~",
                "∑(っ°Д°;)っ卧槽后台你搞什么鬼！",
                "Σσ(・Д・；)请求失败！我我我什么都没做!!!",
                "๑乛◡乛๑后台卡在了奇怪的地方",
                "(╥╯﹏╰╥)ง请求失败，改bug去~",
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