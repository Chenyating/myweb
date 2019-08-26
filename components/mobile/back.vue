<template>
    <div class="flex-row-between border"> 
        <img @click="goBack" class="icon-opr" src="~/static/mobile/icon/back.png"/>
        <div class="title">{{title}}</div>
        <img class="icon-opr" src="~/static/mobile/icon/menu.png"/>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:"这是标题"
        },
        routerName:{
            type:String,
            default:"mobile-index"
        },
    },
    methods:{
        goBack(){
            this.$router.push({name:this.routerName})
        }
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.border{
    border-bottom: solid @line-color @line-sizeSmall;
    padding: 0 @distansBig;
    background: white;
    position: relative;
}
.icon-back {
  line-height: @distansBig;
  float: left;
  &:before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: @distansSmall;
    .icon(@width: 15px);
    background: url(@img-back) no-repeat;
    background-size: 100%;
  }
}
.icon-opr{
    .icon(@width: 25px);
}

</style>