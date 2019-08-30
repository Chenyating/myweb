<template>
<div>
    <div class="shuoshuo-box">
        <Input v-model="shuoshuo" type="textarea" :rows="3" placeholder="我要发表说说了~" />
        <!-- 图片 -->
        <div class="flex">
            <div class="choose-img-box" v-for="(item,index) in fileData" :key="index">
                <img class="close-img" @click="deleteImg(index)" :src="subImg" />
                <img v-if="fileData" class="mini-img" :src="item.base64" />
            </div>
            <img class="add-img" v-if="fileData.length<9" :src="addImg" @click="uploadImg" />
        </div>
        <input style="display: none;" ref="imgFile" type="file" @change="handleUpload" />
        <Button type="success" @click="upload" long>提交</Button>

    </div>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";

export default {
     layout: 'mobile/index',
    data() {
        return {
            subImg: require("~/static/mobile/icon/close.png"),
            addImg: require("~/static/mobile/icon/upload.png"),
            shuoshuo: "", //说说内容
            fileData: [],
            filesList: [],
            uploadFilesList: null
        };
    },
    methods: {
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
                        base64: reader.result
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
            for (let i = 0; i < this.filesList.length; i++) {
                SERVER.upload(this.filesList[i])
                    .then((data) => {
                        this.uploadFilesList.push(data.data)
                    })
                    .catch((err) => {})
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";

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
    margin: @distansSmall;
}
</style>
