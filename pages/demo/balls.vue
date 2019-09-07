<template>
<div>
    <canvas @mousemove="getXY" id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>
<script>
import ball from './ball';
export default {
    data() {
        return {
            canvasWidth: 400,
            canvasHeight: 800,
            ctx: "",
            balls:[],
            // 鼠标位置
            mouseX:null,
            mouseY:null,
        }
    },
    methods: {
        // 初始化背景
        inintCanvas() {
            var c = document.getElementById("stage");
            this.ctx = c.getContext("2d");
            this.canvasWidth = Math.floor(document.body.clientWidth)
            this.canvasHeight = Math.ceil(document.body.clientHeight)
        },
        getXY(e){
            this.mouseX=e.clientX;
            this.mouseY=e.clientY;
            console.log(this.mouseX,this.mouseY)
        },
        begin(num){
            for (let i = 0; i <num; i++) {
                var qiu=new ball(this.canvasWidth,this.canvasHeight,this.ctx);
                qiu.init();
                qiu.draw();    
                this.balls.push(qiu)   
            }
            setInterval(()=>{
                this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
                for (const item of this.balls) {
                    item.move()
                }
            },1000/60)
        }
    },
    mounted() {
        this.inintCanvas();
        this.begin(100)
    }
}
</script>
<style lang="less" scoped>
#canvas {
    width: 100%;
    height: 100%;
    display: block;
}
</style>