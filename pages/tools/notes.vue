<template>
<div>
    <go-back routerName="/projectList" title="注释生成器"></go-back>
    <Tabs value="name1" class="notes-box">
        <!-- 文字 -->
        <TabPane label="文字生成注释" name="name1">
            <Input v-model="textContent" type="textarea" placeholder="请输入文字" />
            <Form class="flex" :label-width="80">
                <FormItem label="文字位置X">
                    <Input number class="input" type="text" v-model="textX" placeholder="仅限数字" />
                </FormItem>
                <FormItem label="文字位置Y">
                    <Input number class="input" type="text" v-model="textH" placeholder="仅限数字" />
                </FormItem>
                <FormItem label="画布宽度">
                    <Input number class="input" type="text" v-model="cWidth" placeholder="仅限数字" />
                </FormItem>
                <FormItem label="画布高度">
                    <Input number class="input" type="text" v-model="cHeight" placeholder="仅限数字" />
                </FormItem>
            </Form>
            <Button type="success" ghost @click="textStart()">文字注释生成</Button>
            <div class="text em-red">点击按钮后，请按F12在控制台中复制，或预览效果。</div>
            <canvas id="canvasNote" :width="cWidth" :height="cHeight"></canvas>
            <div class="title">案列展示：</div>
            <div class="text em-red">目前已运用在我的博客中。</div>
            <img class="example-img" :src="me" />
        </TabPane>
        <!-- 图片 -->
        <TabPane label="图片转为注释" name="name2">
            <Form class="flex" :label-width="80">
                <FormItem label="画布宽度">
                    <Input number class="input" type="text" v-model="cWidth" placeholder="仅限数字" />
                </FormItem>
                <FormItem label="画布高度">
                    <Input number class="input" type="text" v-model="cHeight" placeholder="仅限数字" />
                </FormItem>
                <FormItem label="图片高度">
                    <Input number class="input" type="text" v-model="imgX" placeholder="仅限数字" />
                </FormItem>
                <FormItem label="图片宽度">
                    <Input number class="input" type="text" v-model="imgY" placeholder="仅限数字" />
                </FormItem>
            </Form>
            <img class="add-img" :src="addImg" @click="uploadImg" />
            <span class="em-red">请上传透明的图片哦(*^▽^*)</span>
            <input number style="display: none;" ref="imgFile" type="file" accept="image/*" @change="handleUpload" />
            <Button type="success" @click="imgStart">图片注释生成</Button>
            <div class="text em-red">点击按钮后，请按F12在控制台中复制，或预览效果。</div>
            <img id="show" :src="img"></img>
            <canvas id="canvasNoteImg" :width="cWidth" :height="cHeight"></canvas>
            <div class="title">案列展示：</div>
            <div class="text em-red">目前已运用在小天才官网中。</div>
            <img class="example-img" :src="exampleImg" />
        </TabPane>
    </Tabs>

</div>
</template>
<script>
import goBack from "~/components/mobile/back.vue";
export default {
    components: {
        goBack
    },
    data() {
        return {
            exampleImg: require("~/static/game/img/notes.png"),
            me: require("~/static/game/img/tinger.png"),
            cWidth: 200,
            cHeight: 100,
            textContent: "雅婷",
            textX: 90,
            textH: 50,
            ctx: null,
            shu: [],
            shuzu: [],
            str: null,
            ruleInline: {
                user: [{
                    required: true,
                    message: '请输入数字'
                }]
            },
            // 图片转注释
            addImg: require("~/static/mobile/icon/upload.png"),
            img: require("~/static/game/img/xtc.png"),
            imgX: 150,
            imgY: 50
        }

    },
    methods: {
        imgStart() {
            if (this.imgX == '' || this.imgY == '' || this.cWidth == '' || this.cHeight == '') {
                this.$Message.error('输入不能为空!');
                return;
            }
            var c1 = document.getElementById("canvasNoteImg");
            this.ctx = c1.getContext("2d");
            this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            var img = document.getElementById("show");
            this.ctx.drawImage(img, 0, 0, this.imgX, this.imgY);
            this.getImageData();
            this.fill();
        },
        // 文字开始生成
        textStart() {
            if (this.textX == '' || this.textH == '' || this.cWidth == '' || this.cHeight == '' || this.textContent == '') {
                this.$Message.error('输入不能为空!');
                return;
            }
            var c1 = document.getElementById("canvasNote");
            this.ctx = c1.getContext("2d");
            this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            // 设置字体
            this.ctx.font = "80px bold 黑体";
            // 设置颜色
            this.ctx.fillStyle = "red";
            // 设置水平对齐方式
            this.ctx.textAlign = "center";
            // 设置垂直对齐方式
            this.ctx.textBaseline = "middle";
            // 绘制文字（参数：要写的字，x坐标，y坐标）
            this.ctx.fillText(this.textContent, this.textX, this.textH);

            this.getImageData();
            this.fill();
        },
        // 获得像素点
        getImageData() {
            // 获得图片像素点
            var imgData = this.ctx.getImageData(0, 0, this.cWidth, this.cHeight);
            var q = 0,
                w = 0;
            this.shu[0] = null;
            for (var i = 3; i < imgData.data.length; i += 4) {
                if (imgData.data[i] == 0) {
                    this.shu[q] = [0]
                } else {
                    this.shu[q] = [1]
                }
                q = q + 1;
            }
        },
        // 开始绘制
        fill() {
            console.log(`%c 欢迎使用注释生成器丫٩(๑❛ᴗ❛๑)۶`, 'color: #ed4014');
            // 给点设置东西
            var a = 0;
            for (let i = 0; i < this.cHeight; i++) {
                this.shuzu[i] = [];
                for (let j = 0; j < this.cWidth; j++) {
                    if (this.shu[a] == 1) {
                        this.shuzu[i][j] = "@"
                    } else {
                        this.shuzu[i][j] = " "
                    }
                    a = a + 1;
                }
            }
            // console.log(this.shuzu)
            // 打印
            this.str = '';
            var q = 0;
            var b = 0;
            for (let i = 0; i < this.cHeight; i += 5) {
                for (let j = 0; j < this.cWidth; j += 5) {
                    this.str += this.shuzu[i][j]
                }
                this.str += ".\n";
            }
            console.log(`%c ${this.str} `, 'color: #19be6b');
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
            let reader = new FileReader();
            reader.onloadend = e => {
                // 把图片转码，为base64位
                this.img = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);

        },
    },
    mounted() {
        this.textStart();
        this.imgStart();
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.example-img {
    width: 100%;
}

.add-img {
    .icon(@width: 40px)
}

.notes-box {
    padding: 0 @distansBig;
}

.flex {
    margin-top: @distansBig;
}

.input {
    width: 50px;
}

#show {
    width: 100%;
}

#canvasNote,
#canvasNoteImg {
    margin: @distansBig 0;
    display: block;
    .border-shadow();
}
</style>