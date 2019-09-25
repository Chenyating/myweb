<template>
<div class="shuoshuo-box">
    <Input v-model="shuoshuo" type="textarea" :rows="3" placeholder="我要发表说说了~" />
    <!-- 图片 -->
    <div class="flex">
        <div class="choose-img-box" v-for="(item,index) in fileData" :key="index">
            <Icon v-if="item.ifupload" class="upload-ok" color="#19be6b" size="24" type="ios-checkmark-circle" />
            <img class="close-img" @click="deleteImg(index)" :src="subImg" />
            <img v-if="fileData" class="mini-img" :src="item.base64" />
        </div>
        <img class="add-img" v-if="fileData.length<9" :src="addImg" @click="uploadImg" />
    </div>
    <input style="display: none;" ref="imgFile" type="file" accept="image/*" @change="handleUpload" />
    <Button type="success" @click="upload" long>提交</Button>
    <loginBox :loginBox="iflogin" @hasLogin="haslogin"></loginBox>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";
import loginBox from "~/components/mobile/login";

export default {
    layout: "mobile/index",
    components: {
        loginBox
    },
    data() {
        return {
            subImg: require("~/static/mobile/icon/close.png"),
            addImg: require("~/static/mobile/icon/upload.png"),
            shuoshuo: "", //说说内容
            fileData: [], //显示缩略图
            filesList: [], //上传文件列表
            returnImgs: [], //上传返回的文件
            imgUploading: false, //是否上传
            iflogin: false
        };
    },
    methods: {
        haslogin(val) {
            // 子组件传值给我了。
            this.iflogin = val;
        },
        /**
         * 触发上传图片事件
         */
        uploadImg() {
            this.$refs.imgFile.click();
        },
        /**
         * 上传图片前的限制
         */
        // 上传的文件可以预览
        handleUpload(e) {
            // 获取上传的文件
            var filesList = e.target.files;
            for (let i = 0; i < filesList.length; i++) {
                this.filesList.push(filesList[i]);
                let reader = new FileReader();
                reader.onloadend = e => {
                    // 把图片转码，为base64位
                    var img = {
                        name: filesList[i].name,
                        base64: reader.result,
                        ifupload: false
                    };
                    this.fileData.push(img);
                };
                reader.readAsDataURL(filesList[i]);
            }
        },
        // 删除图片
        deleteImg(index) {
            this.fileData.splice(index, 1);
            this.filesList.splice(index, 1);
        },
        // 上传图片
        upload() {
            // 只有有内容就可以发。
            if (this.shuoshuo || this.filesList.length > 0) {
                this.imgUploading = true;
                // 只有内容就发表内容
                if (this.shuoshuo && this.filesList.length == 0) {
                    this.publicShuoshuo();
                    // 有图片那就先发图片
                } else {
                    for (let i = 0; i < this.filesList.length; i++) {
                        SERVER.upload(this.filesList[i])
                            .then(data => {
                                // 成功
                                if (data.data.code == 1) {
                                    this.fileData[i].ifupload = true;
                                    this.returnImgs.push(data.data.imgUrl);
                                    // 当最后一张图片上传成功以后，就发表说说
                                    if (i == this.filesList.length - 1) {
                                        this.publicShuoshuo();
                                    }
                                }
                                // 失败
                                if (data.data.code == -1) {
                                    this.iflogin = true;
                                    this.$Message.info(data.data.info);
                                }
                            })
                            .catch(err => {
                                this.$Message.error(
                                    `Σσ(・Д・；)第${i + 1}个图片上传失败！我我我什么都没做!!!`
                                );
                            });
                    }
                }
            } else {
                this.$Message.error(`没有内容不能发表`);
            }
        },
        // 发表心情
        publicShuoshuo() {
            var params = {
                content: this.shuoshuo,
                imgsUrl: JSON.stringify(this.returnImgs),
                type: 1
            };
            SERVER.publicShuoshuo(params).then(data => {
                if (data.data.code == -1) {
                    this.iflogin = true;
                }
                this.$Message.info(data.data.info);
                // 发表以后都置空；
                [this.fileData, this.filesList, this.returnImgs, this.shuoshuo] = [
                    [],
                    [],
                    [], ""
                ]
            }).catch(err => {
                this.$Message.error(`发表失败`);
            })
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.upload-ok {
    position: absolute;
    top: 30%;
    left: 35%;
}

.shuoshuo-box {
    padding: @distansBig;
}

.flex {
    padding: @distansBig 0;
}

.choose-img-box {
    position: relative;
    margin-right: @distansBig;
    margin-top: @distansBig;
    .close-img {
        .icon(@width: 20px);
        position: absolute;
        right: -@distansBig;
        top: -@distansBig;
    }
    .mini-img {
        .icon(@width: 80px);
        border: solid @line-sizeSmall @line-color;
    }
}

.add-img {
    .icon(@width: 80px);
    margin: @distansBig 0;
    margin-right: @distansBig;
}
</style>
