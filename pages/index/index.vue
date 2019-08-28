<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <reject v-if="list==null"></reject>
    <div v-else>
        <div class="flex" v-for="(item,index) in list" :key="index">
            <img class="head-img" src="~static/mobile/index/yating.jpg" />
            <div class="shuoshuo">
                <div class="title">YATING</div>
                <div class="text">{{item.content}}</div>
                <!-- 视频 -->
                <video v-if="item.type==3" class="content-img" autoplay="autoplay" muted="muted" loop="loop" x5-playsinline="" playsinline="" webkit-playsinline=""><source :src="item.url" type="video/mp4" /></video>
                <img v-if="item.type==2" class="content-img" :src="item.url" />
                <div class="gray-text">2019-11-13 11:20</div>
            </div>
        </div>
        <div @click="getmore">
            <Divider orientation="center" class="text">{{ifmore?'点击更多……':"已经到底啦"}}</Divider>
        </div>
    </div>
</div>
</template>

<script>
import SERVER from '~/assets/server/api.js';
import reject from "~/components/mobile/reject";

export default {
    transition: 'mobilePage',
    components: {
        reject
    },
    data() {
        return {
            list: null,
            page: 0,
            num: 5,
            ifmore: true
        };
    },
    methods: {
        getshuoshuo(page, num) {
            var params = {
                page: page,
                num: num
            }
            SERVER.getshuoshuo(params)
                .then((data) => {
                    // 返回的长度为0则表示，没有更多了。
                    if (data.data.length == 0) {
                        this.ifmore = false;
                    } else {
                        // 如果当前页码为0，那么就重新赋值给留言列表；
                        if (this.page == 0) {
                            this.list = data.data;
                        } else {
                            // 否则就在留言列表后面继续添加
                            this.list = this.list.concat(data.data);
                        }
                    }
                })
                .catch(err => {
                    this.$Message.error("(╥╯﹏╰╥)ง请求失败，改bug去~");
                });
        },
        // 获得更多；
        getmore() {
            if (this.ifmore) {
                this.page = this.page + 1;
                this.getshuoshuo(this.num, this.page);
            } else {
                return;
            }
        }
    },
    mounted() {
        this.getshuoshuo(this.page, this.num);
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.flex {
    flex-wrap: nowrap;
    margin: @distansBig;
    padding: @distansBig 0;
    border-bottom: @line-sizeSmall @line-color solid;
}

.title {
    line-height: 16px;
}

.text {
    line-height: 24px;
}

.mobile-index-box {
    .head-img {
        @smallWidth: 20%;
        .icon(@width: 20%);
        padding: 0 @distansBig;
    }
    .shuoshuo {
        width: 80%;
    }
    .content-img {
        width: 80%;
        height: auto;
        margin: @distansSmall 0;
    }
}
</style>


