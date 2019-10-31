<template>
<div>
    <!-- 先输入昵称 -->
    <div class="before" v-if="!ifEnter">
        <Input @on-search="settingName(userName)" v-model="userName" :value="userName" search enter-button="确定" placeholder="请输入您的昵称" />
    </div>
    <!-- 开始群聊 -->
    <div class="after" v-else>
        <div class="left">
            <!-- 聊天内容 -->
            <div class="content" id="content">
                <div v-for="(item,index) in messageList" :key="index">
                    <!-- 加入群聊 -->
                    <div class="notice" v-if="item.type=='addUser'">
                        <h2>{{item.user}}加入群聊</h2>
                    </div>
                    <!-- 退出群聊 -->
                    <div class="notice" v-if="item.type=='quit'">
                        <div>{{item.user}}退出群聊</div>
                    </div>
                    <!-- 收到消息 -->
                    <div :class="{'myMessage':item.user==userName}" v-if="item.type=='message'">
                        <div>{{item.user}}:{{item.time}}</div>
                        <h3 class="message">{{item.content}}</h3>
                    </div>
                </div>
            </div>
            <!-- 编辑栏 -->
            <div>
                <Input v-model="text" show-word-limit type="textarea" placeholder="Enter something..." style="width: 200px" />
                <Button type="info" @click="send()">发送</Button>
                <Button type="error" @click="quit()">退出</Button>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="right">
            <h1>《用户列表》</h1>
            <div v-for="(item,index) in users" :key="index">{{item.user}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            messageList: [], //所有消息列表
            users: [], //用户列表
            ifEnter: false, //是否聊天状态
            userName: '游客',
            text: '大家好丫~我是婷婷儿', //内容
            ws: null, //wbs
            message: { //发送的消息格式
                type: '', //发送类型
                user: '',
                content: '', //发送内容
                time: '' //发送时间
            }
        }
    },
    methods: {
        // 退出聊天室
        quit() {
            this.message.type = 'quit';
            this.message.content = this.text;
            this.ws.onopen();
            this.ws.close();
            this.ifEnter = false;

        },
        // 设置昵称
        settingName(userName) {
            this.ifEnter = true;
            this.users.push(userName)
            this.message = {
                type: 'addUser',
                user: userName,
                content: '',
                time: new Date().toLocaleString()
            }
            this.initWbs();
        },
        // wbs初始化；
        initWbs() {
            this.ws = new WebSocket('ws://172.28.194.52:8080');
            // 设置属性
            // 连接时
            this.ws.onopen = () => {
                var sendMessage = JSON.stringify(this.message);
                this.ws.send(sendMessage)
            };
            // 收到信息时
            this.ws.onmessage = (e) => {
                var recieve = JSON.parse(e.data);
                switch (recieve.type) {
                    // 加入消息
                    case 'addUser':
                        this.users.push(recieve)
                        break;
                        // 退出消息
                    case 'quit':
                        this.users = this.users.filter((element, index) => {
                            if (recieve.user != element.user) {
                                return element;
                            }
                        })
                        break;
                        // 普通消息
                }
                this.messageList.push(recieve);
                // ue中数据和dom渲染由于是异步的，所以，要让dom结构随数据改变这样的操作都应该放进this.$nextTick()的回调函数中。
                this.$nextTick(() => {
                    var ele = document.getElementById('content');
                    ele.scrollTop = ele.scrollHeight - ele.clientHeight;
                })
            };
            this.ws.uid=(new Date).getTime,
            this.ws.onerror = () => {
                console.log("报错")
            }
            // 退出时
            this.ws.onclose = () => {
                alert("你已经退出聊天室了");
                this.users = [];
                this.messageList = [];
                console.log("退出")
            };
        },
        send() {
            this.message.type = 'message';
            this.message.content = this.text;

            this.ws.onopen();
        }
    },
    mounted() {

    }
}
</script>
<style lang="less" scoped>
.before {}

.after {
    display: flex;
    .left {
        .content {
            width: 500px;
            height: 300px;
            border: solid 1px red;
            overflow: scroll;
            overflow-x: hidden;
            padding: 0 20px;
            .notice {
                text-align: center;
            }
            .myMessage {
                text-align: right;
            }
            .message {
                border: solid 2px black;
                display: inline-block;
            }
        }
    }
    .right {
        width: 200px;
        height: inherit;
        border: solid 1px blue;
    }
}
</style>