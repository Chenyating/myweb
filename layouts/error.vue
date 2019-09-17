<template>
<div class="box">
    <div class="info">
        <h1 v-if="error.statusCode == 404">
            404 - 你想要的我给不了
        </h1>
        <h1 v-else>500 - 我想给的给不了</h1>
    </div>
    <canvas id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>

<script>
import {
    mother,
    getMouseXY,
    myname
} from "../pages/demo/ball";

export default {
    data() {
        return {
            ctx: null,
            canvasWidth: null,
            canvasHeight: null,
            balls: []
        };
    },
    methods: {
        begin(num) {
            for (let i = 0; i < num; i++) {
                var qiu = new mother(this.canvasWidth, this.canvasHeight, this.ctx);
                qiu.init();
                qiu.draw();
                this.balls.push(qiu);
            }
            setInterval(() => {
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                for (const item of this.balls) {
                    item.move();
                }
            }, 1000 / 60);
        }
    },
    mounted() {
        this.canvasWidth = Math.floor(document.body.clientWidth);
        this.canvasHeight = Math.ceil(document.body.clientHeight);
        window.onresize = () => {
            this.canvasWidth = Math.floor(document.body.clientWidth);
            this.canvasHeight = Math.ceil(document.body.clientHeight);
            // console.log(this.canvasWidth, this.canvasHeight)
        };
        var c = document.getElementById("stage");
        this.ctx = c.getContext("2d");
        this.begin(100);
    },
    props: ["error"]
};
</script>
<style lang="less" scoped>
.box {
    position: relative;
}
.info {
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #19be6b;
}

#stage {
    width: 100%;
    height: 100%;
    display: block;
}
</style>