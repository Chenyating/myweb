<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <seeImg @closeImg="closeImg" class="see-img" v-if="ifSeeImg" :imgInfo='imgInfo'></seeImg>
    <reject v-if="list==null"></reject>
    <div v-else>
        <div class="flex" v-for="(item,index) in list" :key="index">
            <img class="head-img" @click="goPerson" :src="item.headImg" />
            <div class="shuoshuo">
                <div class="user-name">{{item.user}}</div>
                <div v-if="modifyId!=item.id" class="text">{{item.content}}</div>
                <div class="modify-box" v-if="modifyId==item.id">
                    <Input v-model="item.content" type="textarea" :rows="4" placeholder="Enter something..." />
                    <div class="modify-btn-box" v-if="modifyId==item.id">
                        <Button @click="cancleEdit(index)" type="info" ghost>取消</Button>
                        <Button @click="modifyShuoshuo(item.id,index,item.content)" type="success" ghost>修改</Button>
                    </div>
                </div>
                <!-- 视频 -->
                <!-- <video v-if="item.type==3" class="one-img" autoplay="autoplay" muted="muted" loop="loop" x5-playsinline="" playsinline="" webkit-playsinline=""> -->
                <!-- <source :src="item.url" type="video/mp4" /></video> -->
                <!-- 1张 -->
                <div v-if="item.url">
                    <div v-if="item.url.length<3">
                        <img class="one-img" :id="img.replace('http://www.yating.online/res/img/','img').replace('.jpg','')" @click="seeImg(item,img,index)" v-for="(img,index) in item.url" :key="index" :src="img" />
                    </div>
                    <!-- 2-4张 -->
                    <div v-if="item.url.length>2&&item.url.length<5">
                        <img class="four-img" :id="img.replace('http://www.yating.online/res/img/','img').replace('.jpg','')" @click="seeImg(item,img,index)" v-for="(img,index) in item.url" :key="index" :src="img" />
                    </div>
                    <!-- 5-9张 -->
                    <div v-if="item.url.length>4">
                        <img class="nine-img" :id="img.replace('http://www.yating.online/res/img/','img').replace('.jpg','')" @click="seeImg(item,img,index)" v-for="(img,index) in item.url" :key="index" :src="img" />
                    </div>
                </div>
                <div class="delete-box">
                    <div class="gray-text">{{item.createTime}}</div>
                    <div v-if="$store.state.ifLogin&&modifyId!=item.id">
                        <span class="delete-text" @click="deleteShuoshuo(item.id,index)">删除</span>
                        <span class="modify-text" @click="eidt(item.id,item.content)">编辑</span>
                    </div>
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
import seeImg from "~/components/mobile/seeImg";

export default {
    transition: 'mobilePage',
    components: {
        reject,
        loginBox,
        seeImg
    },
    data() {
        return {
            list: null,
            page: 0,
            num: 5,
            ifmore: true,
            iflogin: false,
            oldContent: "", //原来的内容
            modifyId: null, //要更新的id
            ifSeeImg: false,
            imgInfo: null, //查看图片信息
        };
    },
    methods: {
        closeImg(ifClose) {
            this.ifSeeImg = ifClose;
        },
        // 查看图片
        seeImg(item, img, index) {
            // var name = img.replace('http://www.yating.online/res/img/', 'img').replace('.jpg','');
            // if (this.ifSeeImg) {
            //     $(`#${name}`).css({
            //         "position": "static",
            //         "width": "45%",
            //         "height": "20%",
            //         "top": "0",
            //         "left": '0'
            //     })
            // } else {
            //     $(`#${name}`).css({
            //         "position": "fixed",
            //         "width": "100%",
            //         "height": "auto",
            //         "margin":'0',
            //         "top": "0",
            //         "left": '0',
            //         "z-index":"3"
            //     })
                
            // }
            // this.ifSeeImg=!this.ifSeeImg;
            this.ifSeeImg = true;
            this.imgInfo = {
                item: item,
                img: img,
                index: index
            }
        },
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
        // 取消编辑
        cancleEdit(index) {
            this.modifyId = null;
            this.list[index].content = this.oldContent;
        },
        // 编辑该条信息
        eidt(id, content) {
            this.modifyId = id;
            this.oldContent = content;
        },
        // 提交编辑该条信息
        modifyShuoshuo(id, index, content) {
            this.modifyId = id;
            var params = {
                tableName: "myIndex",
                id: id,
                content: content
            }
            SERVER.modifyById(params)
                .then((data) => {
                    this.$Message.info(data.data.info);
                    this.modifyId = null;
                    if (data.data.code == -1) {
                        this.iflogin = true;
                    }
                })
                .catch(err => {
                    this.$Message.error("(╥╯﹏╰╥)ง修改失败~");
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
                this.getshuoshuo(this.page, this.num);
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
.see-img {
    z-index: 33;
    position: fixed;
    top: 0;
}

.modify-box {
    padding: @distansSmall 0;
    .modify-btn-box {
        text-align: right;
        padding: @distansSmall 0;
    }
}

.delete-box {
    margin-top: @distansBig;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .delete-text {
        padding: 0 @distansSmall;
        color: @red;
    }
    .modify-text {
        padding: 0 @distansSmall;
        color: @blue;
    }
}

.flex {
    flex-wrap: nowrap;
    margin: @distansBig;
    padding: @distansBig 0;
    border-bottom: @line-sizeSmall @line-color solid;
}

.user-name {
    line-height: 16px;
    .text();
    font-weight: bold;
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
        width: 45%;
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
