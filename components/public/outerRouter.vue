<template>
<!-- 封装一下，跳转到外链 -->
<div class="flex-row-between" @click="go()">
    <div class="text text-ignore">{{title}}</div>
    <img class="icon" src="~static/mobile/index/more.png"/>
</div>
</template>
<script>
export default {
    name: 'outerRouter',
    props: {
        link: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '12345'
        }
    },
    computed: {

    },
    methods: {
        go() {
            window.location.href = this.link;
        }
    }
}
</script>