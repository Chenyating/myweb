<template>
<div>
    <div class="tetris-box">
        <Modal v-model="modal" :title="title" :closable="false" :mask-closable="false">
            <ul class="content">
                <li><span class="em-red">向上：</span>点击屏幕上方，<span class="em-red">向左：</span>点击屏幕左侧，</li>
                <li><span class="em-red">向右：</span>点击屏幕右侧，<span class="em-red">向下：</span>点击屏幕下方，</li>
                <li><span class="em-red">暂停：</span>请点击右上角，<span class="em-red">重来：</span>请点击右上角。</li>
            </ul>
            <div slot="footer">
                <Button type="error" size="large" @click="goIndex">返回首页</Button>
                <Button type="error" size="large" @click="begin">开始游戏</Button>
            </div>
        </Modal>
        <div class="info">
            <div class="scope-box">
                <img :src="Gscope" class="opt" @click="begin" />
                <span class="scope">{{scope}}</span>
            </div>
            <div>
                <img v-if="ifStop" :src="Gplay" class="opt" @click="goon" />
                <img v-else :src="Gstop" class="opt D-rotate-Long" @click="stop" />
                <img :src="Gmenu" class="opt" @click="menu" />
            </div>
        </div>
        <div class="stage">
            <div class="btn-box">
                <!-- 左 -->
                <div class="bian" @click="leftRight(-20)"></div>
                <div class="zhongjian">
                    <div class="shang" @click="upDown(20)"></div>
                    <!-- 下 -->
                    <div class="shang" @click="upDown(-20)"></div>
                </div>
                <!-- 右 -->
                <div class="bian" @click="leftRight(20)"></div>
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
            title: "鸭妈妈找小鸭鸭的规则~(￣▽￣)~*：",
            modal: true,
            ifStop: true,
            Gscope: require("~/static/game/tetris/scope.png"),
            Gplay: require("~/static/game/tetris/play.png"),
            Gstop: require("~/static/game/tetris/stop.png"),
            Gmenu: require("~/static/game/tetris/reload.png"),
            headImg: require("~/static/game/snaker/head.png"),
            foodImg: require("~/static/game/snaker/food.png"),
            afterImg: require("~/static/game/snaker/after.png"),
            scope: 0,
            radomX: null,
            radomY: null,
            foodX: null,
            foodY: null,
            context: null,
            gameState: 0,
            snaker: [],
            v: 300,
            canvasWidth: 400,
            canvasHeight: 800,
            timer: null,
            unit: 20,
            directer: "",
            result: 0, //最终结果

        };
    },
    methods: {
        goIndex() {
            this.$router.push("/projectList")
        },
        // 继续
        goon() {
            this.ifStop = false;
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                switch (this.directer) {
                    case 'left':
                        this.changgeX(20);
                        break;
                    case 'right':
                        this.changgeX(-20);
                        break;
                    case 'up':
                        this.changgeY(-20);
                        break;
                    case 'down':
                        this.changgeY(20);
                        break;
                    default:
                        this.changgeY(20);
                        break;
                }
            }, this.v - this.scope)
        },
        // 暂停
        stop() {
            this.ifStop = true;
            clearInterval(this.timer);
        },
        menu() {
            //游戏结束状态
            clearInterval(this.timer);
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.modal = true;
            this.gameState = 0;
            this.scope = 0;
            // //清空整个画布
            this.modal = true;
        },
        leftRight(x) {
            if ((x > 0 && this.directer == 'right') || (x < 0 && this.directer == 'left')) {
                return;
            } else {
                if (x > 0) {
                    this.directer = 'left'
                }
                if (x < 0) {
                    this.directer = 'right'
                }
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.changgeX(x);
                }, this.v - this.scope);
            }
        },
        upDown(y) {
            if ((y > 0 && this.directer == 'up') || (y < 0 && this.directer == 'down')) {
                return;
                if ((y > 0 && this.directer == 'up') || (y < 0 && this.directer == 'down')) {
                    return;
                } else {
                    if (y > 0) {
                        this.directer = 'down'
                    }
                    if (y < 0) {
                        this.directer = 'up'
                    }
                    clearInterval(this.timer);
                    this.timer = setInterval(() => {
                        this.changgeY(y);
                    }, this.v - this.scope);
                }
            } else {
                if (y > 0) {
                    this.directer = 'down'
                }
                if (y < 0) {
                    this.directer = 'up'
                }
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.changgeY(y);
                }, this.v - this.scope);
            }
        },
        //随机生成x坐标
        radomx(width) {
            this.radomX = parseInt((Math.random() * width) / this.unit);
            return this.radomX;
        },
        //随机生成y坐标
        radomy(height) {
            this.radomY = parseInt((Math.random() * height) / this.unit);
            return this.radomY;
        },
        //随机生成蛇头的坐标
        snakerHead() {
            //清空蛇身
            this.snaker.splice(0, this.snaker.length);
            this.snaker.push([
                this.radomx(this.canvasWidth) * this.unit,
                this.radomy(this.canvasHeight) * this.unit
            ]);
            //蛇头也不能和食物重复；
            if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1] && this.foodY <= 60) {
                return this.snakerHead();
            }
            this.painSnakerHead();
        },
        //随机生成食物的坐标，且不能和蛇身，蛇头重合
        food() {
            this.foodX = this.radomx(this.canvasWidth) * this.unit;
            this.foodY = this.radomy(this.canvasHeight) * this.unit;
            //判断食物不能和蛇重复了。
            for (var i = 0; i < this.snaker.length; i++) {
                //只要出现重复，则重新调用food（）；
                if (
                    this.foodX == this.snaker[i][0] &&
                    this.foodY == this.snaker[i][1] && this.foodY <= 60
                ) {
                    return this.food();
                }
            }
            console.log(this.foodX, this.foodY, "??")
            this.painFood();
        },
        //绘制红色食物
        painFood() {
            var img = new Image()
            img.src = this.foodImg;
            img.onload = () => {
                this.context.drawImage(img, this.foodX, this.foodY, this.unit, this.unit);
            }
        },
        //是否出界
        ifOut() {
            if (
                0 > this.snaker[0][0] ||
                this.snaker[0][0] > this.canvasWidth-this.unit ||
                this.canvasHeight-this.unit < this.snaker[0][1] ||
                this.snaker[0][1] < 0
            ) {
                this.title = `你找到了${this.result}只小鸭鸭，不能出鸭圈o(´^｀)o`;
                this.gameOver();
            } 
            for (var i = this.snaker.length - 1; i > 0; i--) {
                if (
                    this.snaker[0][0] == this.snaker[i][0] &&
                    this.snaker[0][1] == this.snaker[i][1]
                ) {
                    this.title = `你找到了${this.result}只小鸭鸭，不能撞小鸭子o(´^｀)o`;
                    this.gameOver();
                }
            }
        },
        //游戏结束
        gameOver() {
            clearInterval(this.timer);
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.snaker.splice(0, this.snaker.length);
            this.result = this.scope;
            this.modal = true;
            //清空蛇身；
            //游戏分值清空，游戏状态改为0；
            this.gameState = 0;
            this.scope = 0;
            //清空整个画布
        },
        //游戏开始
        begin() {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            clearInterval(this.timer);
            this.directer = "";
            if (this.gameState != 0) {
                //游戏结束状态
                this.modal = true;
                this.gameState = 0;
                this.scope = 0;
                //清空整个画布
            } else {
                //游戏开始状态
                this.food();
                this.snakerHead();
                this.gameState = 1;
                this.modal = false;
                this.result = 0;
                this.ifStop = false;
            }
        },
        //蛇在x轴的变化
        changgeX(x) {
            try {
                this.context.clearRect(
                    this.snaker[this.snaker.length - 1][0],
                    this.snaker[this.snaker.length - 1][1],
                    this.unit,
                    this.unit
                );
                for (var i = this.snaker.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        this.snaker[0][0] = this.snaker[0][0] + x;
                        this.painSnakerHead();
                    } else {
                        this.snaker[i][0] = this.snaker[i - 1][0];
                        this.snaker[i][1] = this.snaker[i - 1][1];
                        this.context.clearRect(this.snaker[i][0], this.snaker[i][1], this.unit, this.unit);
                        this.painSnakerBody(this.snaker[i][0], this.snaker[i][1]);
                    }
                }
                //食物出现的位置和蛇头重合，则在末尾加上食物的位置，就是y轴最后+-this.unit；
                if (
                    this.foodX == this.snaker[0][0] &&
                    this.foodY == this.snaker[0][1]
                ) {
                    this.snaker.push([this.foodX - x, this.foodY]);
                    this.painSnakerBody(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], );
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
                    this.unit,
                    this.unit
                );
                for (var i = this.snaker.length - 1; i >= 0; i--) {
                    if (i == 0) {
                        this.snaker[0][1] = this.snaker[0][1] - y;
                        this.painSnakerHead();
                    } else {
                        this.snaker[i][0] = this.snaker[i - 1][0];
                        this.snaker[i][1] = this.snaker[i - 1][1];
                        this.context.clearRect(this.snaker[i][0], this.snaker[i][1], this.unit, this.unit);
                        this.painSnakerBody(this.snaker[i][0], this.snaker[i][1]);
                    }
                }
                //食物出现的位置和蛇头重合，则在末尾加上食物的位置，就是y轴最后+-this.unit；
                if (
                    this.foodX == this.snaker[0][0] &&
                    this.foodY == this.snaker[0][1]
                ) {
                    this.snaker.push([this.foodX, this.foodY + y]);
                    this.painSnakerBody(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], );
                    this.food();
                    this.scope = this.scope + 1;
                }
                this.ifOut();
            } catch (error) {}
        },
        //画蛇身
        painSnakerBody(x, y) {
            var img = new Image()
            img.src = this.afterImg;
            img.onload = () => {
                this.context.drawImage(img, x, y, this.unit, this.unit);
            }
        },
        //画蛇头
        painSnakerHead(x, y) {
            if (!x && !y) {
                x = this.snaker[0][0];
                y = this.snaker[0][1];
            }
            var img = new Image()
            img.src = this.headImg;
            img.onload = () => {
                this.context.drawImage(img, x, y, this.unit, this.unit);
            }
        }
    },
    mounted() {
        var c = document.getElementById("stage");
        this.context = c.getContext("2d");
        this.canvasWidth = Math.floor(document.body.clientWidth / this.unit) * this.unit;
        this.canvasHeight = Math.ceil(document.body.clientHeight / this.unit) * this.unit;
        console.log(this.canvasWidth,this.canvasHeight,"|||")
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
    max-width: 500px; // background: black;
    background-image: url("~static/game/tetris/bg.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
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
    // border: solid 1px black;
    display: flex;
    flex-direction: column;
}

.zhong {
    width: 100%;
    height: 80%; // background: red;
    // border: solid 1px black;
    display: flex;
}

.bian {
    width: 20%;
    height: 100%; // background: red;
    // border: solid 1px black;
    display: flex;
}

.shang {
    width: 100%;
    height: 50%; // background: red;
    // border: solid 1px black;
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.034); // border-color: #eee;
    display: flex;
}

// 区域按钮结束
#stage {
    display: block;
    margin: 0 auto; // background: black;
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
</style>