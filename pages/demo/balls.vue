<template>
<div>
    <canvas id="stage" :width="canvasWidth" :height="canvasHeight"></canvas>
</div>
</template>
<script>
import {
    mother,getMouseXY
} from './ball';
export default {
    data() {
        return {
            ctx: null,
            canvasWidth: null,
            canvasHeight: null,
            balls: []
        }
    },
    methods: {
        begin(num) {
           for (let i = 0; i <num; i++) {
                var qiu=new mother(this.canvasWidth,this.canvasHeight,this.ctx);
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
        this.canvasWidth = Math.floor(document.body.clientWidth);
        this.canvasHeight = Math.ceil(document.body.clientHeight);
        window.onresize = () => {
            this.canvasWidth = Math.floor(document.body.clientWidth);
            this.canvasHeight = Math.ceil(document.body.clientHeight);
            // console.log(this.canvasWidth, this.canvasHeight)
        }
        var c = document.getElementById("stage");
        this.ctx = c.getContext("2d");
        getMouseXY();
        this.begin(250);
    }
}
</script>
<style lang="less" scoped>
#stage {
    width: 100%;
    height: 100%;
    display: block;
    background: #ffc0cb12;
}
</style>