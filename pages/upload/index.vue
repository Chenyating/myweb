<template>
<div>
    <Button type="primary" @click="uploadImg">上传按钮</Button>
    <!-- 上传input放在外面，防止触发点击事件的时候冒泡到父容器 -->
    <input ref="imgFile" type="file" @change="handleUpload" multiple/>
    <div v-for="(item,index) in fileData" :key="index">
        <img :src="item.base64" />
    </div>
    <Button type="primary" @click="upload">确定</Button>
       <Upload
        multiple
        action="/api/upload/img">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
    
</div>
</template>
<script>
import SERVER from "~/assets/server/api.js";

export default {
    data() {
        return {
            shuoshuo: "",
            fileData: [],
            filesList:null
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
            this.filesList = e.target.files;
            for (let i = 0; i < this.filesList.length; i++) {
                let reader = new FileReader();
                reader.onloadend = e => {
                    // 把图片转码，为base64位
                    var img = {
                        name: this.filesList[i].name,
                        base64: reader.result
                    }
                    this.fileData.push(img)
                };
                reader.readAsDataURL(this.filesList[i]);

            }
            console.log(this.fileData, "???")
        },
        upload(){
            console.log(this.filesList,"??")
            SERVER.upload(this.filesList)
        }
    }
};
</script>