<template>
<div class="skill-box">
    <div v-for="(item,index) in skillList" :key="index">
        <div>{{index}}：{{item.skillName}}</div>
         <Progress :percent="45" status="active" />
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            skillList: [{
                    skillName: "掌握前端基础HTML、CSS",
                },
                {
                    skillName: "掌握前端基础HTML、CSS",
                },
                {
                    skillName: "掌握前端基础HTML、CSS",
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.skill-box {
    padding: @distansBig;
}
</style>
