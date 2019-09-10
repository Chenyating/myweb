<template>
    <canvas id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>
<script>
import {
    mother,
    getMouseXY,
    myname
} from "./ball";
export default {
    data() {
        return {
            ctx: null,
            canvasWidth: null,
            canvasHeight: null,
            balls: [],
            shu: [],
            str: "",
            shuzu: [],
            interval: null,
            context: '雅婷'
        };
    },
    methods: {
        getName() {
            // 设置字体
            this.ctx.font = "80px 黑体";
            // 绘制文字（参数：要写的字，x坐标，y坐标）
            this.ctx.fillText(this.context,0, 80);
            // 获得图片像素点
            var imgData = this.ctx.getImageData(
                0,
                0,
                this.canvasWidth,
                this.canvasHeight
            );
            var q = 0,
                w = 0;
            for (var i = 3; i < imgData.data.length; i +=8) {
                if (imgData.data[i] == 0) {
                    this.shu[q] = [0];
                } else {
                    this.shu[q] = [1];
                }
                q = q + 1;
            }
            // 获得数组
            this.balls = [];
            var a = 0;
            for (let i = 0; i < this.canvasHeight; i++) {
                this.shuzu[i] = [];
                for (let j = 0; j < this.canvasWidth; j++) {
                    if (this.shu[a] == 1) {
                        this.shuzu[i][j] = ' '
                        // 画布是i为x，j为列相反
                        var qiu = new myname(j * 8, i * 8, this.ctx);
                        qiu.init();
                        qiu.draw();
                        this.balls.push(qiu);
                    } else {
                        this.shuzu[i][j] = 0
                    }
                    a = a + 1;
                }
            }
            this.interval = setInterval(() => {
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                for (const item of this.balls) {
                    item.move()
                }
            }, 1000 / 60)
        }
    },
    mounted() {
        this.canvasWidth = Math.floor(document.body.clientWidth);
        this.canvasHeight = Math.ceil(document.body.clientHeight);
        window.onresize = () => {
            this.canvasWidth = Math.floor(document.body.clientWidth);
            this.canvasHeight = Math.ceil(document.body.clientHeight);
        };
            if(this.canvasWidth < this.canvasHeight) {
                this.$Message.info("横屏效果更佳哦~");
            }
        var c = document.getElementById("stage");
        this.ctx = c.getContext("2d");
        getMouseXY();
        this.getName();
    }
};
</script>
<style lang="less" scoped>
#stage {
    width: 100%;
    height: 100%;
    display: block;
    background: black;
}
</style>