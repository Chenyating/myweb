<template>
<div>
    <div class="tetris-box">
        <Modal v-model="modal" :title="title" :closable="false" :mask-closable="false">
            <ul class="content">
                <li><span class="em-red">旋转：</span>点击屏幕中间，<span class="em-red">向左：</span>点击屏幕左侧，</li>
                <li><span class="em-red">向右：</span>点击屏幕右侧，<span class="em-red">提速：</span>点击屏幕下方，</li>
                <li><span class="em-red">暂停：</span>请点击右上角，<span class="em-red">重来：</span>请点击右上角。</li>
            </ul>
            <div slot="footer">
                <!-- <Button type="error" size="large" @click="goIndex">返回首页</Button>
                <Button type="error" size="large" @click="begin">开始游戏</Button> -->
            </div>
        </Modal>
        <div class="info">
            <div class="scope-box">
                <img :src="Gscope" class="opt" @click="begin" />
                <span class="scope">{{scope}}</span>
            </div>
            <div>
                <!-- <img v-if="ifStop" :src="Gplay" class="opt" @click="goon" />
            <img v-else :src="Gstop" class="opt D-rotate-Long" @click="stop" />
            <img :src="Gmenu" class="opt" @click="menu" /> -->
            </div>
        </div>
        <div class="stage">
            <div class="btn-box">
                <!-- 左 -->
                <!-- <div class="bian" @click="left"></div> -->
                <!-- <div class="zhongjian"> -->
                    <!-- <div class="zhong" @click="change"></div> -->
                    <!-- 下 -->
                    <!-- <div class="shang" @click="down"></div> -->
                <!-- </div> -->
                <!-- 右 -->
                <!-- <div class="bian" @click="right"></div> -->
            </div>
            <canvas id="stage" :width="canvasWidth" :height="canvasHeight">
            </canvas>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: "规则说明~(￣▽￣)~*：",
            modal: false,
            Gscope: require("~/static/game/tetris/scope.png"),
            Gplay: require("~/static/game/tetris/play.png"),
            Gstop: require("~/static/game/tetris/stop.png"),
            Gmenu: require("~/static/game/tetris/reload.png"),
            scope: 0,
            radomX: null,
            radomY: null,
            foodX: null,
            foodY: null,
            context: null,
            gameState: 0,
            snaker: [],
            v: 1000,
            canvasWidth: 400,
            canvasHeight: 800,
            timer: null
        };
    },
    methods: {
        leftRight(x) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.changgeX(x);
            }, this.v);
        },
        upDown(y) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.changgeY(y);
            }, this.v);
        },
        //随机生成x坐标
        radomx(width) {
            this.radomX = parseInt((Math.random() * width) / 20);
            return this.radomX;
        },
        //随机生成y坐标
        radomy(height) {
            this.radomY = parseInt((Math.random() * height) / 20);
            return this.radomY;
        },
        //随机生成蛇头的坐标
        snakerHead() {
            //清空蛇身
            this.snaker.splice(0, this.snaker.length);
            this.snaker.push([
                this.radomx(this.canvasWidth) * 20,
                this.radomy(this.canvasHeight) * 20
            ]);
            //蛇头也不能和食物重复；
            if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
                return this.snakerHead();
            }
        },
        //随机生成食物的坐标，且不能和蛇身，蛇头重合
        food() {
            this.foodX = this.radomx(this.canvasWidth) * 20;
            this.foodY = this.radomy(this.canvasHeight) * 20;
            //判断食物不能和蛇重复了。
            for (var i = 0; i < this.snaker.length; i++) {
                //只要出现重复，则重新调用food（）；
                if (
                    this.foodX == this.snaker[i][0] &&
                    this.foodY == this.snaker[i][1]
                ) {
                    return this.food();
                }
            }
            this.painFood();
        },
        //绘制红色食物
        painFood() {
            var img = new Image()
            img.src = require("~/static/game/snaker/food.png");
            // img.onload = function () {
            this.context.drawImage(img, this.foodX, this.foodY, 20, 20);
        },
        //是否出界
        ifOut() {
            if (
                0 > this.snaker[0][0] ||
                this.snaker[0][0] > this.canvasWidth - 20 ||
                this.canvasHeight - 20 < this.snaker[0][1] ||
                this.snaker[0][1] < 0
            ) {
                alert("游戏结束,你撞到墙了");
                clearInterval(this.timer);
                this.gameOver();
            }
            for (var i = this.snaker.length - 1; i > 0; i--) {
                if (
                    this.snaker[0][0] == this.snaker[i][0] &&
                    this.snaker[0][1] == this.snaker[i][1]
                ) {
                    clearInterval(this.timer);
                    alert("游戏结束，你撞到你自己啦！");
                    this.gameOver();
                }
            }
        },
        //游戏结束
        gameOver() {
            //清空蛇身；
            this.snaker.splice(0, this.snaker.length);
            //游戏分值清空，游戏状态改为0；
            this.gameState = 0;
            this.scope = 0;
            //清空整个画布
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            $("#title").html("");
            $("#title").html("游戏开始");
        },
        //游戏开始
        begin() {
            if (this.gameState != 0) {
                //游戏结束状态
                $("#title").html("");
                $("#title").html("游戏开始");
                this.gameState = 0;
                this.scope = 0;
                //清空整个画布
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            } else {
                //游戏开始状态
                this.food();
                this.snakerHead();
                this.painSnakerHead();
                this.gameState = 1;
                $("#title").html("");
                $("#title").html("游戏结束");
                clearInterval(this.timer);
            }
        },
        //蛇在x轴的变化
        changgeX(x) {
            try {
                this.context.clearRect(
                    this.snaker[this.snaker.length - 1][0],
                    this.snaker[this.snaker.length - 1][1],
                    20,
                    20
                );
                for (var i = this.snaker.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        this.snaker[0][0] = this.snaker[0][0] + x;
                        this.painSnakerHead();
                    } else {
                        this.snaker[i][0] = this.snaker[i - 1][0];
                        this.snaker[i][1] = this.snaker[i - 1][1];
                        this.painSnakerBody();
                        this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
                    }
                }
                //食物出现的位置和蛇头重合，则在末尾加上食物的位置，就是y轴最后+-20；
                if (
                    this.foodX == this.snaker[0][0] &&
                    this.foodY == this.snaker[0][1]
                ) {
                    this.snaker.push([this.foodX - x, this.foodY]);
                    this.context.fillRect(
                        this.snaker[this.snaker.length - 1][0],
                        this.snaker[this.snaker.length - 1][1],
                        20,
                        20
                    );
                    this.painSnakerBody();
                    this.food();
                    this.scope = this.scope + 1;
                }
                this.ifOut();
            } catch (error) {}
        },
        //蛇在y轴的变化
        changgeY(y) {
            try {
                this.context.clearRect(
                    this.snaker[this.snaker.length - 1][0],
                    this.snaker[this.snaker.length - 1][1],
                    20,
                    20
                );
                for (var i = this.snaker.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        this.snaker[0][1] = this.snaker[0][1] - y;
                        this.painSnakerHead();
                    } else {
                        this.snaker[i][0] = this.snaker[i - 1][0];
                        this.snaker[i][1] = this.snaker[i - 1][1];
                        this.painSnakerBody();
                        this.context.fillRect(this.snaker[i][0], this.snaker[i][1], 20, 20);
                    }
                }
                //食物出现的位置和蛇头重合，则在末尾加上食物的位置，就是y轴最后+-20；
                if (
                    this.foodX == this.snaker[0][0] &&
                    this.foodY == this.snaker[0][1]
                ) {
                    this.snaker.push([this.foodX, this.foodY + y]);
                    this.context.fillRect(
                        this.snaker[this.snaker.length - 1][0],
                        this.snaker[this.snaker.length - 1][1],
                        20,
                        20
                    );
                    this.painSnakerBody();
                    this.food();
                    this.scope = this.scope + 1;
                }
                this.ifOut();
            } catch (error) {}
        },
        //画蛇身
        painSnakerBody() {
            this.context.fillStyle = "#363636";
        },
        //画蛇头
        painSnakerHead() {
            this.context.fillStyle = "#00755E";
            this.context.fillRect(this.snaker[0][0], this.snaker[0][1], 20, 20);
        }
    },
    mounted() {
        var c = document.getElementById("stage");
        this.context = c.getContext("2d");
        this.canvasWidth = Math.floor(document.body.clientWidth / 20) * 20;
        this.canvasHeight = Math.ceil(document.body.clientHeight / 20) * 20;
        // console.log(this.canvasWidth, this.canvasHeight)
        this.begin();
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";

.tetris-box {
    position: relative;
    background: #000000;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
    // background: black;
    background-image:url("~static/game/tetris/bg.jpg"), url("~static/mobile/icon/cao.png");
    background-position: bottom;
    background-size:100%, 50px;
    background-repeat:no-repeat, repeat-x;
}

.stage {
    width: 100%;
    position: relative;
}

// 区域按钮
.btn-box {
    position: absolute; // background: white;
    width: 100%;
    height: 100%;
    display: flex;
}

.zhongjian {
    width: 60%;
    height: 100%; // background: red;
    border: solid 1px black;
    display: flex;
    flex-direction: column;
}

.zhong {
    width: 100%;
    height: 80%; // background: red;
    border: solid 1px black;
    display: flex;
}

.bian {
    width: 20%;
    height: 100%; // background: red;
    border: solid 1px black;
    display: flex;
}

.shang {
    width: 100%;
    height: 20%; // background: red;
    border: solid 1px black;
    display: flex;
}

// 区域按钮结束
#stage {
    display: block;
    margin: 0 auto;
    // background: black;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.info {
    display: flex;
    position: absolute;
    z-index: 9;
    width: 100%;
    justify-content: space-between;
    padding: 10px;

}

.scope-box {
    display: flex;
    align-items: center;
}

.scope {
    font-size: 15px;
    color: yellow;
    font-weight: bold;
    margin-left: 5px;
}

.opt {
    width: 30px;
    height: 30px;
    background-size: 100%;
}

.hua {
    // x方向重复背景
    background-image: url("~static/mobile/icon/cao.png");
    background-position: bottom;
    background-size: 50px;
    background-repeat: repeat-x;
    bottom: 0;
    height: 50px;
    width: 100%;
    max-width: 1024px;
    position: fixed;
    z-index: 1;
}
