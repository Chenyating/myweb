<template>
<div>
    <Button type="success" @click="changgeX(20)">上</Button>
    <Button type="success" @click="changgeX(-20)">上</Button>
    <Button type="success" @click="changgeY(20)">上</Button>
    <Button type="success" @click="changgeY(-20)">上</Button>
    <div class="title">RETRO-SNAKER-贪吃蛇</div>
    <div class="stage">
        <canvas id="tanchi" width=400 height=800>
      </canvas>
        <div class="operation">
            <p>SCOPE</p>
            <div class="inf">分值：{{scope}}</div>
            <p>GAME</p>
            <div class="inf" id="title" @click="begin()">
                游戏开始
            </div>
            <p>AUTHOR</p>
            <div class="inf">YATING</div>
        </div>
    </div>
    <div class="explain">
        Fingers slide up and down in the screen, click on the screen to pause.If you bump into yourself, the game is over.
        <div class="chinese">手指在屏幕中上下左右滑动，点击屏幕暂停。如果撞到自己或墙，游戏结束</div>
    </div>
</div>
</template>
<script>
export default {
    layout: 'mobile/comeback',
    data() {
        return {
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
        }
    },
    methods: {
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
            this.snaker.push([this.radomx(this.canvasWidth) * 20, this.radomy(this.canvasHeight) * 20]);
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
                if (this.foodX == this.snaker[i][0] && this.foodY == this.snaker[i][1]) {
                    return this.food();
                }
            }
            this.painFood();
        },
        //绘制红色食物
        painFood() {
            var c = document.getElementById("tanchi");
            this.context = c.getContext("2d");
            this.context.fillStyle = "#8A3324";
            this.context.fillRect(this.foodX, this.foodY, 20, 20);
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
                if (this.snaker[0][0] == this.snaker[i][0] && this.snaker[0][1] == this.snaker[i][1]) {
                    clearInterval(this.timer);
                    alert("游戏结束，你撞到你自己啦！")
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
                this.painSnakerHead()
                this.gameState = 1;
                $("#title").html("");
                $("#title").html("游戏结束");
                clearInterval(this.timer);
            }
        },
        //蛇在x轴的变化
        changgeX(x) {
            try {
                this.context.clearRect(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], 20, 20);
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
                if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
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
                this.timer = setInterval(() => {
                    this.changgeX(x);
                }, 1000)
            } catch (error) {}

        },
        //蛇在y轴的变化
        changgeY(y) {
            try {
                this.context.clearRect(this.snaker[this.snaker.length - 1][0], this.snaker[this.snaker.length - 1][1], 20, 20);
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
                if (this.foodX == this.snaker[0][0] && this.foodY == this.snaker[0][1]) {
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
                this.timer = setInterval(() => {
                    this.changgeY(y);
                }, 1000)
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
        },
    },
    mounted() {},
}
</script>
<style lang="less" scoped>
.title {
    font-size: 1.5rem;
    text-align: center;
    margin: 0.5rem;
    font-weight: bold;
}

.stage {
    display: flex;
    flex-wrap: nowrap;
    padding: 0.5rem;
}

#tanchi {
    background: white;
    border: solid 0.1rem #000000;
    width: 65%;
    height: 100%;
}

.operation {
    width: 100%;
    text-align: center;
    margin-left: 0.5rem;
    border: solid 0.1rem black;
}

.inf {
    font-size: 1rem;
    padding: 0.5rem 0;
    background: black;
    color: white;
    font-weight: bold;
    width: 100%;
}

.explain {
    padding: 0.1rem 0.6rem;
    text-align: center;
}

.chinese {
    font-size: 0.5rem;
}

p {
    padding: 1rem;
}
</style>