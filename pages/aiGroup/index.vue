<template>
<div class="D-big">
    <go-back routerName="/" title="AI团建明细"></go-back>
    <Tabs :value='name'>
        <TabPane label="团建活动" name="spend">
            <div class="title">说明:</div>
            <div class="text"><span class="em-blue">人均：</span>人均=团建费用/总人数，<span class="em-red">（当参与活动组内人数超过一半，默认全员参加）</span></div>
            <div class="text"><span class="em-blue">例如：</span>小明6月1日交了200元，7月8日离职。<br/>在6月1日至7月8日期间的团建活动的总花费1200元，组里有12个人。<br/>那么在此期间的团建人均为1200/12=100元。所以退还给小明的费用为200-100=100元</div>
            <hr/>
            <div class="text"><span class="em-blue">其他：</span>当参与人数多于科室人数，多出费用由科长支付；2019/9/19生效</div>
            <div class="text"><span class="em-blue">例如：</span>2019-09-19，巧湘厨团建吃饭，参与人数25人，人均52.88，多出科室8人，多出费用8*52.88=423.04元由科长承担。</div>
            <div class="em-red title">说明：因为最早之前的人员变动，参加活动的人数均不是很确定，所以统一将退费均摊；自2019/8/1起，退费不算到个人上；</div>
            <Table border :columns="columns1" :data="data1"></Table>
        </TabPane>
        <TabPane label="团建费用" name="money">
            <div class="title">经费收取规则:</div>
            <span class="text"><span class="em-blue">(1). 科长：</span>1000元/次;</span>
            <span class="text"><span class="em-blue">(2). 正式员工：</span>500元/次;</span>
            <span class="text"><span class="em-blue">(3). 外包、实习生：</span>200元/次;</span>
            <div class="text"><span class="em-blue">(4). 其他：</span>避免混淆已退费的人员，已从名单上除去</div>
            <Table border :columns="columns2" :data="data2"></Table>
        </TabPane>
        <TabPane label="团建规章" name="rules">
            <h1 class="rules-title">《 {{rules.title}} 》</h1>
            <div class="rules-box" v-for="(item,index) in rules.content" :key="index">
                <div class="title">{{item.title}}：</div>
                <div v-for="(i ,index) in item.content" :key="index">
                    <div class="text">{{i.split(":")[0]}}</div>
                </div>
            </div>
        </TabPane>
    </Tabs>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";
import goBack from "~/components/mobile/back.vue";
import rules from './rules.json'
export default {
    transition: "article",
    components: {
        goBack
    },
    data() {
        return {
            rules: rules,
            name: "rules",
            data1: [],
            data2: [],
            columns1: [{
                    title: "活动",
                    minWidth: 80,
                    key: "title",
                },
                {
                    title: "时间",
                    minWidth: 45,
                    key: "time"
                },
                {
                    title: "支付方式",
                    minWidth: 45,
                    key: "spendType"
                },
                {
                    title: "花费",
                    minWidth: 45,
                    key: "spend"
                },
                {
                    title: "人数",
                    minWidth: 45,
                    key: "peopleNum"
                },
                {
                    title: "人均",
                    minWidth: 45,
                    key: "avgMoney"
                },
                {
                    title: "说明",
                    minWidth: 80,
                    key: "script"
                },
            ],
            columns2: [{
                    title: "姓名",
                    minWidth: 20,
                    key: "name",
                },
                {
                    title: "总缴费",
                    minWidth: 30,
                    key: "allMoney"
                },
                {
                    title: "已花费",
                    minWidth: 30,
                    key: "avrageMoney"
                },
                {
                    title: "剩余",
                    minWidth: 30,
                    key: "rest"
                },
                {
                    title: "岗位",
                    minWidth: 20,
                    key: "typeName"
                },
                {
                    title: "最近一次缴费时间",
                    minWidth: 80,
                    key: "addTime"
                },
                {
                    title: "缴费次数",
                    minWidth: 10,
                    key: "times"
                }
            ],
            content: 'JSON.stringify(rules)', //内容
            markdownOption: {
                bold: true // 粗体
            },
        };
    },
    methods: {
        // 获得文字内容
        getAi(title) {
            console.log(title);
            var params = {
                tableName: title
            };
            SERVER.ai(params)
                .then(data => {
                    if (title == 'spend') {
                        data.data.forEach(element => {
                            var time = element.time.split('T');
                            element.time = time[0];
                        });
                        this.data1 = data.data;
                    } else {
                        data.data.forEach(element => {
                            var time = element.addTime.split('T');
                            element.addTime = time[0];
                        });
                        this.data2 = data.data;
                    }
                })
                .catch(err => {
                    console.log(err, "??")
                    this.$Message.error("๑乛◡乛๑后台卡在了奇怪的地方");
                });
        }
    },
    mounted() {
        this.getAi("spend");
        this.getAi("money");
        this.phoneWidth = Math.floor(document.body.clientWidth);
        this.phoneHeight = Math.ceil(document.body.clientHeight);
        if (this.phoneWidth < this.phoneHeight) {
            this.$Message.info("横屏效果更佳哦~");
        }
        console.log(rules, "???")
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.rules-title {
    text-align: center;
}

.rules-box {
    padding: @distansBig;
}

.D-big {
    display: fixed;
    height: 100%;
    width: 100%;
    min-width: 350px;
    max-width: 1024px;
    margin: 0 auto;
    overflow: hidden;
}
</style>
