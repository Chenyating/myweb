<template>
<div>
    <div class="hua"></div>
    <Modal v-model="modal" :title="title" :closable="false" :mask-closable="false">
        <p class="text em-red">请选择炸弹个数:</p>
        <RadioGroup v-model="tempBombNum">
            <Radio v-for="index in radioList" :key="index" :label="index">
                <span>{{index}}个</span>
            </Radio>
        </RadioGroup>
        <p class="text em-red">请选择礼物行数:</p>
        <RadioGroup v-model="tempHeight">
            <Radio v-for="index in radioList" :key="index" :label="index+2">
                <span>{{index}}行</span>
            </Radio>
        </RadioGroup>
        <div slot="footer">
            <Button type="error" size="large" long @click="begin">开始游戏</Button>
        </div>
    </Modal>

    <div class="playStage">
        <div class="coverY" v-for="(n,index) in height-2" :key="index" v-if="all.length">
            <!-- x值 -->
            <div class="coverX" v-for="(m,index) in width-2" v-if="all[n-1]" :key="index" @click="click(n,m)" :class="{safe: all[n][m][1]>=0,whiteText: all[n][m][1]==0,bered: all[n][m][0]==2}">
                {{all[n][m][1]>0?all[n][m][1]:''}}
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    layout: 'mobile/comeback',
    data() {
        return {
            title: "请选择你要玩的难度~(￣▽￣)~*",
            modal: true,
            bgImg: require("~/static/game/mine/bg.png"),
            width: 10,
            height: 12,
            tempHeight: 12,
            all: [],
            bomb: 0,
            num: 0,
            bombNum: 10,
            tempBombNum: 10,
            radioList: [
                10,
                20,
                30,
                40,
                50,
            ]
        };
    },
    methods: {
        // 点击空白
        click(x, y) {
            if (this.all[x][y][0] == 1) {
                this.showBomb();
                // 踩到雷了
                this.title = "你拆到炸弹了(╥╯^╰╥)，再来一局吧。"
                this.modal = true;
                return;
            } else {
                this.ifOk();
                this.andThen(x, y);
            }
        },
        andThen(x, y) {
            this.ifOk();
            if (this.all[x][y][0] == 1 || this.all[x][y][1] > -1) {
                return;
            }
            this.num = 0;
            try {
                if (this.all[x - 1][y - 1][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x - 1][y][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x - 1][y + 1][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x][y - 1][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x][y][0] == 1) {
                    return;
                }
                if (this.all[x][y + 1][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x + 1][y - 1][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x + 1][y][0] == 1) {
                    this.num += 1;
                }
                if (this.all[x + 1][y + 1][0] == 1) {
                    this.num += 1;
                }
                this.$set(this.all, x, this.all[x]);
                this.$set(this.all[x], y, this.all[x][y]);
                this.$set(this.all[x][y], 1, this.num);
                if (this.num == 0) {
                    this.andThen(x - 1, y - 1);
                    this.andThen(x - 1, y);
                    this.andThen(x - 1, y + 1);
                    this.andThen(x, y - 1);
                    this.andThen(x, y + 1);
                    this.andThen(x + 1, y - 1);
                    this.andThen(x + 1, y);
                    this.andThen(x + 1, y + 1);
                } else {
                    this.ifOk();
                    return;
                }
            } catch (error) {}
            this.ifOk();
        },
        // 开始随机游戏
        randomBegin(bombNumber) {
            this.modal = false;
            this.bombNum = bombNumber;
            this.bomb = 0;
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    this.$set(this.all, i, this.all[i]);
                    this.$set(this.all[i], j, this.all[i][j]);
                    this.$set(this.all[i][j], 0, 0);
                    this.$set(this.all[i][j], 1, -1);
                }
            }
            this.random();
        },
        // 随便上色
        random() {
            var a, b;
            a = parseInt(Math.random() * (this.height - 2) + 1);
            b = parseInt(Math.random() * (this.width - 2) + 1);
            if (this.bomb < this.bombNum) {
                // 如果这个数炸弹，那么重新随机
                if (this.all[a][b][0] == 1) {
                    this.random();
                }
                // 否则给他设置为炸弹
                else {
                    this.bomb = this.bomb + 1;
                    this.$set(this.all, a, this.all[a]);
                    this.$set(this.all[a], b, this.all[a][b]);
                    this.$set(this.all[a][b], 0, 1);
                    this.random();
                }
            } else {
                return;
            }
        },
        ifOk() {
            var lastNum = 0;
            for (var i = 1; i < this.height - 1; i++) {
                for (var j = 1; j < this.width - 1; j++) {
                    if (this.all[i][j][1] == -1) {
                        lastNum += 1;
                    }
                }
            }
            if (lastNum == this.bombNum) {
                this.showBomb();
                this.title = "恭喜你~拆对了所有礼物ヾ(✿ﾟ▽ﾟ)ノ"
                this.modal = true;
            }
        },
        showBomb() {
            for (var i = 1; i < this.height - 1; i++) {
                for (var j = 1; j < this.width - 1; j++) {
                    if (this.all[i][j][1] == -1 && this.all[i][j][0] == 1) {
                        this.$set(this.all, i, this.all[i]);
                        this.$set(this.all[i], j, this.all[i][j]);
                        this.$set(this.all[i][j], 0, 2);
                    }
                }
            }
        },
        begin() {
            this.height = this.tempHeight;
            this.bombNum = this.tempBombNum;
            for (let i = 0; i < this.height; i++) {
                this.all[i] = [];
                for (let j = 0; j < this.width; j++) {
                    this.all[i][j] = [0, -1];
                }
            }
            setTimeout(() => {
                this.randomBegin(this.bombNum);
            }, 1000)
        }
    }
};
</script>
<style lang="less" scoped>
@img-bad: '~static/game/mine/bad.png';
@img-boom: '~static/game/mine/boom.png';
@img-hezi: '~static/game/mine/hezi.png';
@img-safe: '~static/game/mine/safe.png';
@import "~assets/css/mobile/base.less";
.hua {
    // x方向重复背景
    background-image: url("~static/mobile/icon/bottom.png"), url("~static/mobile/icon/cao.png");
    background-position: bottom;
    background-size: 50px, 20px;
    background-repeat: repeat-x;
    bottom: 0;
    height: 50px;
    width: 100%;
    max-width: 1024px;
    position: fixed;
    z-index: 1501;
}

// 正常背景
.playStage {
    margin-bottom: 50px;
}

.bg-rule {
    background-size: 100%;
    background-repeat: no-repeat;
}

.coverY {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.coverX {
    .icon(@width: 40px);
    display: inline-block;
    color: gray;
    text-align: center;
    background-image: url(@img-hezi);
    .bg-rule();
}

// 安全
.safe {
    background-image: url(@img-safe);
    .bg-rule();
    color: @white;
    display: flex; // align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 30px;
    animation: beBig 2s;
    font-weight: bold;
    text-shadow: 5px 2px 6px #000;
}

.whiteText {
    color: white;
}

.bered {
    animation: be-boom 2s;
    background-image: url(@img-boom);
    .bg-rule();
}

@keyframes be-boom {
    from {
        background-image: url(@img-bad);
        transform: scale(.1);
        .bg-rule();
    }
    to {
        background-image: url(@img-boom);
        .bg-rule();
    }
}
</style>