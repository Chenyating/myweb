<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <reject v-if="list==null"></reject>
    <div v-else>
        <div class="flex" v-for="(item,index) in list" :key="index">
            <img class="head-img" @click="goPerson" src="~static/mobile/index/yating.jpg" />
            <div class="shuoshuo">
                <div class="title">YATING</div>
                <div class="text">{{item.content}}</div>
                <!-- 视频 -->
                <!-- <video v-if="item.type==3" class="one-img" autoplay="autoplay" muted="muted" loop="loop" x5-playsinline="" playsinline="" webkit-playsinline=""> -->
                <!-- <source :src="item.url" type="video/mp4" /></video> -->
                <!-- 1张 -->
                <div v-if="item.url">
                    <div v-if="item.url.length==1">
                        <img class="one-img" v-for="(img,index) in item.url" :key="index" :src="img" />
                    </div>
                    <!-- 2-4张 -->
                    <div v-if="item.url.length>1&&item.url.length<5">
                        <img class="four-img" v-for="(img,index) in item.url" :key="index" :src="img" />
                    </div>
                    <!-- 5-9张 -->
                    <div v-if="item.url.length>4">
                        <img class="nine-img" v-for="(img,index) in item.url" :key="index" :src="img" />
                    </div>
                </div>
                <div class="delete-box">
                    <div class="gray-text">{{item.createTime}}</div>
                    <div v-if="$store.state.ifLogin" class="delete-text" @click="deleteShuoshuo(item.id,index)">删除</div>
                </div>
            </div>
        </div>
        <div @click="getmore" class="more-text">
            {{ifmore?'点击更多……':"已经到底啦"}}
        </div>
    </div>
    <loginBox :loginBox="iflogin" @hasLogin="haslogin"></loginBox>
</div>
</template>

<script>
import SERVER from '~/assets/server/api.js';
import reject from "~/components/mobile/reject";
import loginBox from "~/components/mobile/login";

export default {
    transition: 'mobilePage',
    components: {
        reject,
        loginBox
    },
    data() {
        return {
            list: null,
            page: 0,
            num: 5,
            ifmore: true,
            iflogin: false,
        };
    },
    methods: {
        haslogin(val) {
            // 子组件传值给我了。
            this.iflogin = val;
        },
        // 删除该条信息
        deleteShuoshuo(id, index) {
            this.$Modal.confirm({
                title: `是否确定删除这条内容`,
                content: this.list[index].content,
                onOk: () => {
                    var params = {
                        tableName: "myIndex",
                        id: id
                    }
                    SERVER.deletById(params)
                        .then((data) => {
                            if (data.data.code == 1) {
                                this.list.splice(index, 1);
                            }
                            if (data.data.code == -1) {
                                this.iflogin = true;
                            }
                            this.$Message.info(data.data.info);
                        })
                        .catch(err => {
                            this.$Message.error("(╥╯﹏╰╥)ง删除失败~");
                        });
                }
            });

        },
        // 处理data，把图片转为数组
        doData(data) {
            for (let i = 0; i < data.length; i++) {
                data[i].url = JSON.parse(data[i].url);
            }
            return data;
        },
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
                            this.list = this.doData(data.data);
                        } else {
                            // 否则就在留言列表后面继续添加
                            var newData = this.doData(data.data);
                            this.list = this.list.concat(newData);
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
        },
        // 去登陆
        goPerson() {
            if (this.$store.state.ifLogin) {
                // 跳转去查看文章详情
                this.$router.push(`/person`);
            } else {
                this.iflogin = true;
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
.delete-box {
    display: flex;
    justify-content: space-between;
    .delete-text {
        color: @red;
    }
}

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

.more-text {
    .text();
    text-align: center;
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
    .one-img {
        width: 80%;
        height: auto;
        margin: @distansSmall;
        border: #e8eaec4d @line-sizeSmall solid;
    }
    .four-img {
        .icon(@width: 45%);
        margin: @distansSmall;
        border: #e8eaec4d @line-sizeSmall solid;
    }
    .nine-img {
        .icon(@width: 25%);
        margin: @distansSmall;
        border: #e8eaec4d @line-sizeSmall solid;
    }
}
</style>
