<template>
    <div class="flex-row-between border"> 
        <img @click="goBack" class="icon-opr" src="~/static/mobile/icon/back.png"/>
        <div class="title">{{title}}</div>
        <img @click="takeMessage" class="icon-opr" src="~/static/mobile/icon/message.png" title="给我留言~"/>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:"WELCOME"
        },
        routerName:{
            type:String,
            default:"/"
        },
    },
    methods:{
        goBack(){
            this.$router.push(this.routerName)
        },
        takeMessage(){
            this.$router.push("/message")
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