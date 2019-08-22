<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <div class="flex">
        <img class="head-img" src="~static/mobile/index/yating.jpg" />
        <div class="shuoshuo">
            <div class="title">用户名</div>
            <div class="text">本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动</div>
            <img class="content-img" src="~static/mobile/index/yating.jpg"/>
            <div class="gray-text">2019-11-13 11:20</div>
        </div>
    </div>
    <div class="flex">
        <img class="head-img" src="~static/mobile/index/yating.jpg" />
        <div class="shuoshuo">
            <div class="title">用户名</div>
            <div class="text">本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动</div>
            <div class="gray-text">2019-11-13 11:20</div>
        </div>
    </div>
    <div class="flex">
        <img class="head-img" src="~static/mobile/index/yating.jpg" />
        <div class="shuoshuo">
            <div class="title">用户名</div>
            <div class="text">本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动</div>
            <img class="content-img" src="~static/mobile/index/yating.jpg"/>
            <div class="gray-text">2019-11-13 11:20</div>
        </div>
    </div>
    <div class="flex">
        <img class="head-img" src="~static/mobile/index/yating.jpg" />
        <div class="shuoshuo">
            <div class="title">用户名</div>
            <div class="text">本人性格开朗、稳重、有活力，待人热情、真诚；工作认真负责，积极主动</div>
            <img class="content-img" src="~static/mobile/index/yating.jpg"/>
            <div class="gray-text">2019-11-13 11:20</div>
        </div>
    </div>
</div>
</template>
<script>
import outerRouter from '~/components/public/outerRouter'
export default {
    components: {
        outerRouter
    },
    data() {
        return {
            name: "YATING",
            me: {
                name: "YATING",
                intro: "用心写代码，不辜负程序员之名"
            }
        };
    }
};
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.flex{
    flex-wrap: nowrap;
    margin: @distansBig;
    padding: @distansBig 0;
    border-bottom: @line-sizeSmall @line-color solid;
}
.title{
    line-height: 16px;
}
.text{
    line-height: 24px;
}
.mobile-index-box {
    .head-img {
        .icon(@width: 20%);
        padding: 0 @distansBig;
    }
    .shuoshuo{
        width: 80%;
    }
    .content-img{
        width: 50%;
        height: auto;
        margin: @distansSmall 0;
    }
}
</style>


