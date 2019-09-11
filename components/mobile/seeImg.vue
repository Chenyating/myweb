<template>
<div class="see-img-box">
    <div class="see-img-head" @click="goBack">
        <Icon type="ios-arrow-back" size="20" />
        <span v-if="shuoshuo">{{shuoshuo.createTime}}</span>
    </div>
    <Icon v-if="id>0" class="btn-left" @click="pre" type="ios-arrow-dropleft" size="50" />
    <div class="img-box">
        <img id="seeImg" class="see-img" @click="beBig" :src="img" />
    </div>
    <Icon v-if="id<imgNum-1" class="btn-right" @click="next" type="ios-arrow-dropright" size="50" />
    <div v-if="shuoshuo" class="see-img-foot">
        <img class="head-img" :src="shuoshuo.headImg" />
        <div>{{shuoshuo.user}}： {{shuoshuo.content}}</div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        imgInfo: {}
    },
    data() {
        return {
            img: '',
            isBig: false,
            shuoshuo: null,
            id: null,
            imgNum: 1
        }
    },
    methods: {
        pre() {
            if (this.id > 0) {
                this.id--;
                this.img = this.shuoshuo.url[this.id]
            } else {
                return;
            }
        },
        next() {
            if (this.id < this.shuoshuo.url.length - 1) {
                this.id++;
                this.img = this.shuoshuo.url[this.id]
            } else {
                return;
            }
        },
        goBack() {
            this.$emit("closeImg", false)
        },
        beBig() {
            if (!this.isBig) {
                this.isBig = true;
                $("#seeImg").css("width", "150%");
            } else {
                this.isBig = false;
                $("#seeImg").css("width", "100%");
            }
        }
    },
    mounted() {
        this.img = this.imgInfo.img;
        this.shuoshuo = this.imgInfo.item;
        this.imgNum = this.imgInfo.item.url.length;
        this.id = this.imgInfo.index;
        $(".img-box").css("height", `${document.body.clientHeight}px`);
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.see-img-box {
    height: 100%;
    width: 100%;
    min-width: 350px;
    max-width: 1024px;
    margin: 0 auto;
    .see-img-head {
        width: 100%;
        min-width: 350px;
        max-width: 1024px;
        position: absolute;
        z-index: 2;
        background: #555555;
        padding: 0 @distansBig;
        display: flex;
        align-items: center;
        .title();
        color: @gray;
    }
    .see-img-foot {
        .head-img {
            .icon(@width: 50px);
            margin-right: @distansBig;
        }
        display: flex;
        width: 100%;
        min-width: 350px;
        max-width: 1024px;
        background: #555555;
        color: @gray;
        padding: @distansBig;
        bottom: 0;
        position: absolute;
        z-index: 2;
    }
}

.btn-left {
    position: absolute;
    z-index: 3;
    left: 0;
    top: 50%;
}

.btn-right {
    right: 0;
    position: absolute;
    z-index: 3;
    top: 50%;
}

.img-box {
    width: 100%;
    background: @black;
    position: fixed;
    overflow-y: scroll;
    overflow-x: scroll;
    text-align: center;
    .see-img {
        margin: 20% 0;
        width: 100%;
        vertical-align: middle;
        height: auto;
        z-index: 1;
    }
}
</style>