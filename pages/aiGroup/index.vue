<template>
<div class="D-big">
    <go-back routerName="/" title="AI团建明细"></go-back>
    <Tabs :value='name'>
        <TabPane label="团建活动" name="spend">
            <Table border :columns="columns1" :data="data1"></Table>
        </TabPane>
        <TabPane label="团建费用" name="money">
            <Table border :columns="columns2" :data="data2"></Table>
        </TabPane>
        <TabPane label="团建规章" name="rules">
        </TabPane>
    </Tabs>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";
import goBack from "~/components/mobile/back.vue";
// import rules from './rules.md'
export default {
    transition: "article",
    components: {
        goBack
    },
    data() {
        return {
            name:"spend",
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
                },
                {
                    title: "每次缴费",
                    minWidth: 40,
                    key: "everyMoney"
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
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";

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
