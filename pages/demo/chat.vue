<template>
<div>
    <Input @on-search="haha()" :value="text" search enter-button placeholder="Enter something..." />
    <div v-for="(item,index) in message" :key="index">{{item}}</div>
</div>
</template>
<script>
export default {
    data() {
        return {
            message: [],
            text: 1
        }
    },
    methods: {
        haha() {
            var vm=this;
            var text=this.text;
            this.text++;
            var ws = new WebSocket('ws://localhost:8080');
            ws.onopen = function() {
                console.log('ws onopen');
                ws.send(text);
            };
            ws.onmessage = function(e) {
                console.log('ws onmessage');
                console.log('from server: ' + e.data);
                vm.message.push(e.data)
            };
        }
    },
    mounted() {}
}
</script>