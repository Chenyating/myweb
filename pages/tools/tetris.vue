<template>
<div class="tetris-box">
    <Modal v-model="modal" :title="title" :closable="false" :mask-closable="false">
        <ul class="content">
            <li><span class="em-red">旋转：</span>点击屏幕中间，<span class="em-red">向左：</span>点击屏幕左侧，</li>
            <li><span class="em-red">向右：</span>点击屏幕右侧，<span class="em-red">提速：</span>点击屏幕下方，</li>
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
            <div class="bian" @click="left"></div>
            <div class="zhongjian">
                <div class="zhong" @click="change"></div>
                <!-- 下 -->
                <div class="shang" @click="down"></div>
            </div>
            <!-- 右 -->
            <div class="bian" @click="right"></div>
        </div>
        <canvas id="stage" :width="canvasWidth" :height="canvasHeight">
        </canvas>
        <!-- <div class="hua"></div> -->
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: "规则说明~(￣▽￣)~*：",
            modal: true,
            Gscope: require("~/static/game/tetris/scope.png"),
            Gplay: require("~/static/game/tetris/play.png"),
            Gstop: require("~/static/game/tetris/stop.png"),
            Gmenu: require("~/static/game/tetris/reload.png"),
            scope: 0,
            v: 300,
            downV: 100,
            radomID: null, //图像编号
            shap: [], //存放图形
            all: new Array(), //存放所有已经内容
            context: null, //画布
            rotateID: 0, //旋转的状态,
            allLength: null,
            gameState: 0,
            canvasWidth: 360,
            canvasHeight: 800,
            timer: null,
            ifStop: true,
            result:0,//最终结果
        }
    },
    methods: {
        goIndex() {
            this.$router.push("/projectList")
        },
        // 继续
        goon() {
            this.ifStop = false;
            this.timer = setInterval(() => {
                this.down();
            }, this.v-this.scope)
        },
        // 暂停
        stop() {
            this.ifStop = true;
            clearInterval(this.timer);
        },
        menu(){
              //游戏结束状态
                clearInterval(this.timer);
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                this.modal = true;
                this.gameState = 0;
                this.scope = 0;
                this.all.splice(0, this.all.length); //清空存放单方块的数组
                // //清空整个画布
                this.modal=true;
        },
        begin() {
            if (this.gameState != 0) {
                //游戏结束状态
                this.modal = true;
                this.gameState = 0;
                this.scope = 0;
                this.all.splice(0, this.all.length); //清空存放单方块的数组
                //清空整个画布
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                clearInterval(this.timer);
            }
            //游戏开始状态
            else {
                //初始化堆积方块
                for (let i = 0; i < this.canvasHeight / 20; i++) {
                    this.all[i] = new Array(0);
                    for (let j = 0; j < this.canvasWidth / 20; j++) {
                        this.all[i][j] = 0;
                    }
                }
                this.allLength = this.all[0].length;
                //开始绘制单方块；
                //清空整个画布
                this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                this.radomShap();
                this.gameState = 1;
                //游戏开始，默认自己往下移动；
                this.timer = setInterval(() => {
                    this.down();
                }, this.v-this.scope)
                this.result=0;
                this.modal = false;
                this.ifStop = false;
            }
        },
        //绘制
        pain() {
            var c = document.getElementById("stage");
            this.context = c.getContext("2d");
            // this.context.fillStyle = "#000000";
            // this.context.clearRect(0, 0, 800, 60);
        },
        //绘制图像
        painShap() {
            for (var i = 0; i < this.shap.length; i++) {
                for (var j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        // this.context.fillRect(
                        //     this.shap[i][j][0],
                        //     this.shap[i][j][1],
                        //     20,
                        //     20
                        // );
                        var img = new Image()
                        img.src = require("~/static/game/tetris/start.png");
                        this.context.drawImage(img, this.shap[i][j][0], this.shap[i][j][1], 20, 20);
                    }
                }
            }
        },
        //随机绘制单方块
        radomShap() {
            this.scope += 1;
            this.pain();
            this.radomID = parseInt(Math.random() * 7);
            // this.deleteShap();
            this.shap.splice(0, this.shap.length); //清空存放单方块的数组
            //shap数组开始存储不同单方块
            switch (this.radomID) {
                case 0:
                    //长条
                    let defaultX = this.canvasWidth / 2 - 20;
                    let defaultY = -60;
                    for (var i = 0; i < 5; i++) {
                        defaultX = this.canvasWidth / 2 - 20;
                        if (i == 2) {
                            this.$set(this.shap, i, [
                                [defaultX, defaultY, 1],
                                [(defaultX += 20), defaultY, 1],
                                [(defaultX += 20), defaultY, 1],
                                [(defaultX += 20), defaultY, 1],
                                [(defaultX += 20), defaultY, 0]
                            ]);
                        } else {
                            this.$set(this.shap, i, [
                                [defaultX, defaultY, 0],
                                [(defaultX += 20), defaultY, 0],
                                [(defaultX += 20), defaultY, 0],
                                [(defaultX += 20), defaultY, 0],
                                [(defaultX += 20), defaultY, 0]
                            ]);
                        }
                        defaultY += 20;
                    }
                    // console.log(this.shap)
                    break;
                case 1:
                    //正方形
                    this.$set(this.shap, 0, [
                        [this.canvasWidth / 2 - 20, -40, 1],
                        [this.canvasWidth / 2, -40, 1]
                    ]);
                    this.$set(this.shap, 1, [
                        [this.canvasWidth / 2 - 20, -20, 1],
                        [this.canvasWidth / 2, -20, 1]
                    ]);
                    break;
                case 2:
                    //正7
                    this.$set(this.shap, 0, [
                        [this.canvasWidth / 2 - 20, -60, 1],
                        [this.canvasWidth / 2, -60, 1],
                        [this.canvasWidth / 2 + 20, -60, 0]
                    ]);
                    this.$set(this.shap, 1, [
                        [this.canvasWidth / 2 - 20, -40, 0],
                        [this.canvasWidth / 2, -40, 1],
                        [this.canvasWidth / 2 + 20, -40, 0]
                    ]);
                    this.$set(this.shap, 2, [
                        [this.canvasWidth / 2 - 20, -20, 0],
                        [this.canvasWidth / 2, -20, 1],
                        [this.canvasWidth / 2 + 20, -20, 0]
                    ]);
                    break;
                case 3:
                    //反7
                    this.$set(this.shap, 0, [
                        [this.canvasWidth / 2 - 20, -60, 0],
                        [this.canvasWidth / 2, -60, 1],
                        [this.canvasWidth / 2 + 20, -60, 1]
                    ]);
                    this.$set(this.shap, 1, [
                        [this.canvasWidth / 2 - 20, -40, 0],
                        [this.canvasWidth / 2, -40, 1],
                        [this.canvasWidth / 2 + 20, -40, 0]
                    ]);
                    this.$set(this.shap, 2, [
                        [this.canvasWidth / 2 - 20, -20, 0],
                        [this.canvasWidth / 2, -20, 1],
                        [this.canvasWidth / 2 + 20, -20, 0]
                    ]);
                    break;
                case 4:
                    //正2
                    this.$set(this.shap, 0, [
                        [this.canvasWidth / 2 - 20, -60, 1],
                        [this.canvasWidth / 2, -60, 1],
                        [this.canvasWidth / 2 + 20, -60, 0]
                    ]);
                    this.$set(this.shap, 1, [
                        [this.canvasWidth / 2 - 20, -40, 0],
                        [this.canvasWidth / 2, -40, 1],
                        [this.canvasWidth / 2 + 20, -40, 1]
                    ]);
                    this.$set(this.shap, 2, [
                        [this.canvasWidth / 2 - 20, -20, 0],
                        [this.canvasWidth / 2, -20, 0],
                        [this.canvasWidth / 2 + 20, -20, 0]
                    ]);
                    break;
                case 5:
                    //反2
                    this.$set(this.shap, 0, [
                        [this.canvasWidth / 2 - 20, -60, 0],
                        [this.canvasWidth / 2, -60, 1],
                        [this.canvasWidth / 2 + 20, -60, 1]
                    ]);
                    this.$set(this.shap, 1, [
                        [this.canvasWidth / 2 - 20, -40, 1],
                        [this.canvasWidth / 2, -40, 1],
                        [this.canvasWidth / 2 + 20, -40, 0]
                    ]);
                    this.$set(this.shap, 2, [
                        [this.canvasWidth / 2 - 20, -20, 0],
                        [this.canvasWidth / 2, -20, 0],
                        [this.canvasWidth / 2 + 20, -20, 0]
                    ]);
                    break;
                case 6:
                    //土
                    this.$set(this.shap, 0, [
                        [this.canvasWidth / 2 - 20, -60, 0],
                        [this.canvasWidth / 2, -60, 1],
                        [this.canvasWidth / 2 + 20, -60, 0]
                    ]);
                    this.$set(this.shap, 1, [
                        [this.canvasWidth / 2 - 20, -40, 1],
                        [this.canvasWidth / 2, -40, 1],
                        [this.canvasWidth / 2 + 20, -40, 1]
                    ]);
                    this.$set(this.shap, 2, [
                        [this.canvasWidth / 2 - 20, -20, 0],
                        [this.canvasWidth / 2, -20, 0],
                        [this.canvasWidth / 2 + 20, -20, 0]
                    ]);
                    break;
                default:
                    break;
            }
            this.rotate();
            this.painShap();
        },
        //清除单方块形状
        deleteShap() {
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        this.context.clearRect(
                            this.shap[i][j][0],
                            this.shap[i][j][1],
                            20,
                            20
                        );
                    }
                }
            }
        },
        //旋转90度的方法
        rotate() {
            var changge = parseInt(Math.random() * 4);
            // console.log("变" + changge + "次")
            for (var i = 0; i <= changge; i++) {
                let shap1 = [];
                // 深拷贝
                shap1 = JSON.parse(JSON.stringify(this.shap));
                //行变列。列变行,把结果先存在shap1里；
                for (let i = 0; i < this.shap.length; i++) {
                    for (let j = this.shap[i].length - 1; j >= 0; j--) {
                        shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];
                    }
                }
                //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；
                for (let i = 0; i < shap1.length; i++) {
                    for (let j = 0; j < shap1[i].length; j++) {
                        try {
                            if (
                                ((shap1[i][j][0] < 0 || shap1[i][j][0] > this.canvasWidth - 20 || shap1[i][j][1] > this.canvasHeight - 20) && shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {
                                //两个同时成立退出；
                                return;
                            }
                        } catch (error) {

                        }
                    }
                }
                this.deleteShap();
                //那么就把shap1的值赋给shap
                this.shap = JSON.parse(JSON.stringify(shap1));
                this.painShap();
            }
        },
        change() {
            let shap1 = [];
            // 深拷贝
            shap1 = JSON.parse(JSON.stringify(this.shap));
            //行变列。列变行,把结果先存在shap1里；
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = this.shap[i].length - 1; j >= 0; j--) {
                    shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2];
                }
            }
            //判断一下，改变方向以后，会不会超出墙||碰到堆积好的方块；
            for (let i = 0; i < shap1.length; i++) {
                for (let j = 0; j < shap1[i].length; j++) {
                    try {
                        if (
                            ((shap1[i][j][0] < 0 || shap1[i][j][0] > this.canvasWidth - 20 || shap1[i][j][1] > this.canvasHeight - 20) && shap1[i][j][2] == 1) || (this.all[this.shap[i][j][1] / 20][this.shap[i][j][0] / 20] == 1)) {
                            //两个同时成立退出；
                            return;
                        }
                    } catch (error) {

                    }
                }
            }
            this.deleteShap();
            //那么就把shap1的值赋给shap
            this.shap = JSON.parse(JSON.stringify(shap1));
            this.painShap();
        },
        //向下
        down() {
              if(this.ifStop){
                return;
            }
            //到头了。就自杀了。
            for (let i = 0; i < this.all[0].length; i++) {
                if (this.all[0][i] == 1) {
                    this.result=this.scope;
                    this.title = `上一局你得了${this.result}分，要继续吗`
                    clearInterval(this.timer);
                    this.modal = true;
                    this.gameState = 0;
                    this.scope = 0;
                    this.all.splice(0, this.all.length); //清空存放单方块的数组
                    //清空整个画布
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    return;
                }
            }
            //判断下降过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    var y = this.shap[i][j][1] / 20;
                    var x = this.shap[i][j][0] / 20;
                    try {
                        if (
                            (this.shap[i][j][1] >= this.canvasHeight - 20 || this.all[y + 1][x] == 1) && this.shap[i][j][2] == 1
                        ) {
                            //会的话，那就就开始把shap加入this。all；
                            for (let i = 0; i < this.shap.length; i++) {
                                for (let j = 0; j < this.shap[i].length; j++) {
                                    if (this.shap[i][j][2] == 1) {
                                        var y = this.shap[i][j][1] / 20;
                                        var x = this.shap[i][j][0] / 20;
                                        this.all[y][x] = 1;
                                    }
                                }
                            }
                            //放完以后退出
                            this.radomShap();
                            clearInterval(this.timer);
                            this.timer = setInterval(() => {
                                this.down();
                            }, this.v-this.scope)
                            // console.log(this.all)
                            return;
                        }
                    } catch (error) {
                        // console.log("y有bug")
                    }
                }
            }
            //先判断是否满格了,满格就退出；
            for (let i = 0; i < this.all.length; i++) {
                var num = 0; //一整行填满的方块数量
                for (let j = 0; j < this.all[i].length; j++) {
                    //如果没有
                    if (this.all[i][j] != 1) {
                        continue;
                    } else {
                        num++;
                        if (num == this.allLength) {
                            for (let j = 0; j < this.all[i].length; j++) {
                                this.context.clearRect(
                                    j * 20,
                                    i * 20,
                                    20,
                                    20
                                );
                                this.all[i][j] = 0;
                            }
                            //把满的清空以后。
                            //清空现在屏幕上所有的堆积方块
                            this.deletAll();
                            //填满清空的区域；
                            this.allDown();
                            //重绘
                            this.painAll();
                            this.radomShap();
                            this.scope += 10;
                            continue;
                        }
                    }
                }
            }

            //经过两个判断结束以后，没有符合，继续向下移动
            {
                for (let i = 0; i < this.shap.length; i++) {
                    for (let j = 0; j < this.shap[i].length; j++) {
                        if (this.shap[i][j][2] == 1) {
                            this.context.clearRect(
                                this.shap[i][j][0],
                                this.shap[i][j][1],
                                20,
                                20
                            );
                        }
                        this.shap[i][j][1] += 20;
                    }
                }
                this.painShap();
            }
        },
        // 向左
        left() {
              if(this.ifStop){
                return;
            }
            //判断左移动的过程中是否会与下一层堆积好的方块重叠；是否会超过范围；如果会的话，就开始把shap加入this.all然后退出；
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    var y = this.shap[i][j][1] / 20;
                    var x = this.shap[i][j][0] / 20;
                    try {
                        //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。
                        if (
                            (this.shap[i][j][0] < 20 || this.all[y][x - 1] == 1) && this.shap[i][j][2] == 1
                        ) {
                            //左边有东西||或者靠墙了。不要向左了。
                            return;
                        }
                    } catch (error) {
                        // console.log("有bug")
                    }
                }
            }

            //经过两个判断结束以后，没有符合，继续向左移动
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        this.context.clearRect(
                            this.shap[i][j][0],
                            this.shap[i][j][1],
                            20,
                            20
                        );
                    }
                    this.shap[i][j][0] -= 20;
                }
            }
            this.painShap();
        },
        // 向右
        right() {
            if(this.ifStop){
                return;
            }
            //判断左移动的过程中是否会与右边堆积好的方块重叠；是否会超过范围；如果会的话退出；
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    var y = this.shap[i][j][1] / 20;
                    var x = this.shap[i][j][0] / 20;
                    try {
                        //因为x可能会等于0；所以用try，catch过滤掉好了。不想管。。。。
                        if (
                            (this.shap[i][j][0] > this.canvasWidth - 20 * 2 || this.all[y][x + 1] == 1) && this.shap[i][j][2] == 1
                        ) {
                            return;
                        }
                    } catch (error) {
                        // console.log("x太大")
                    }

                }
            }
            //经过两个判断结束以后，没有符合，继续向右移动
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        this.context.clearRect(
                            this.shap[i][j][0],
                            this.shap[i][j][1],
                            20,
                            20
                        );
                    }
                    this.shap[i][j][0] += 20;
                }
            }
            this.painShap();
        },
        deletAll() {
            for (let i = 0; i < this.all.length; i++) {
                for (let j = 0; j < this.all[i].length; j++) {
                    if (this.all[i][j] == 1) {
                        this.context.clearRect(
                            j * 20,
                            i * 20,
                            20,
                            20
                        );
                    }
                }
            }
        },
        //整体堆积好的方块往下；
        allDown() {
            for (let i = this.all.length - 1; i >= 0; i--) {
                var num = 0; //一整行填满的方块数量
                for (let j = 0; j < this.all[i].length; j++) {
                    //如果没有
                    if (this.all[i][j] == 1) {
                        //只有这一行有存在1的那我就不管了。
                        continue; //跳出本次循环；
                    } else {
                        num++;
                        //假如这一行都是为空的话。那么开始，这行以上的全部集体往下移动；
                        if (num == this.allLength) {
                            this.allLength = this.all[0].length;
                            var a5 = JSON.parse(JSON.stringify(this.all[0]));
                            if (i - 1 >= 0) {
                                for (let k = i - 1; k >= 0; k--) {
                                    this.all[k + 1] = this.all[k];
                                }
                                this.all[0] = a5;
                            }
                        }
                    }
                }
            }
        },
        //重绘堆积好的方块；
        painAll() {
            for (let i = 0; i < this.all.length; i++) {
                for (let j = 0; j < this.all[i].length; j++) {
                    if (this.all[i][j] == 1) {
                        // this.context.fillRect(
                        //     j * 20,
                        //     i * 20,
                        //     20,
                        //     20
                        // );
                        var img = new Image()
                        img.src = require("~/static/game/tetris/start.png");
                        this.context.drawImage(img, j * 20, i * 20, 20, 20);

                    } else {
                        this.context.clearRect(
                            j * 20,
                            i * 20,
                            20,
                            20
                        );
                    }
                }
            }
        }
    },
    mounted() {
        var c = document.getElementById("stage");
        this.context = c.getContext("2d");
        this.canvasWidth = Math.floor(document.body.clientWidth / 20) * 20;
        this.canvasHeight = Math.ceil(document.body.clientHeight / 20) * 20;
        // console.log(this.canvasWidth, this.canvasHeight)
    }
}
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
    background-image:url("~static/game/tetris/bg.jpg");
    background-size:100%;
    background-repeat:no-repeat;
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
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.034);
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
    height: 20%; // background: red;
    // border: solid 1px black;
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.034);
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
</style>
