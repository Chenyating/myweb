<template>
<div class="see-img-box">
    <div class="see-img-head">
        <img @click="goBack" class="icon-opr" src="~/static/mobile/icon/back.png" />
    </div>
    <div class="img-box">
        <img id="seeImg" class="see-img" @click="beBig" :src="img" />
    </div>
    <div class="see-img-foot">
        哈哈哈电视剧反倒是了解付款打扫房间肯定是你缴费等你GV就是你，
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            img: '',
            isBig: false,
        }
    },
    methods: {
        goBack() {
            this.$router.push('/')
        },
        beBig() {
            if (!this.isBig) {
                this.isBig = true;
                $("#seeImg").css("width", "150%");
            } else {
                this.isBig = false;
                $("#seeImg").css("width", "60%");
            }
        }
    },
    mounted() {
        var height=document.body.clientHeight;
        $(".img-box").css("height", `${height}px`);
        console.log(this.$route,"???")
        this.img = this.$route.params.img;
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.see-img-head {
    width: 100%;
    position: fixed;
    color: @gray;
    z-index: 2;
    background: #555555;
}

.see-img-foot {
    width: 100%;
    background: #555555; 
    color: @gray;
    padding: @distansBig;
    bottom: 0;
    position: fixed;
    z-index: 2;
}

.img-box {
    width: 100%;
    text-align: center;
    background: @black;
    display: table-cell;
    vertical-align: middle;
    overflow: scroll;
    .see-img {
        width: 60%;
        height: auto;
        z-index: 1;
    }
}
</style>