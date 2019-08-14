<template>
<div>
    <div v-for="(item,index) in skillList" :key="index">
        <div>{{index}}：{{item.skillName}}</div>
        <div>{{item.Percentage}}</div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            skillList: [{
                    skillName: "掌握前端基础HTML、CSS",
                    Percentage: "80%"
                },
                {
                    skillName: "掌握前端基础HTML、CSS",
                    Percentage: "80%"
                },
                {
                    skillName: "掌握前端基础HTML、CSS",
                    Percentage: "80%"
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>

</style>
