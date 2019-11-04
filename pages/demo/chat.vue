<template>
<div class="chat-box">
    <!-- 先输入昵称 -->
    <div class="before" v-if="!ifEnter">
        <Input @on-search="settingName()" v-model="userName" :value="userName" search enter-button="确定" placeholder="请输入您的昵称" />
    </div>
    <!-- 开始群聊 -->
    <div class="after-box" v-else>
        <div class="talk-title">
            群聊
        </div>
        <div class="after">
            <div class="left">
                <!-- 聊天内容 -->
                <div class="talk-box" id="content">
                    <div v-for="(item,index) in messageList" :key="index">
                        <!-- 加入群聊 -->
                        <div class="notice" v-if="item.type=='addUser'">{{item.user}}加入群聊</div>
                        <!-- 退出群聊 -->
                        <div class="notice" v-if="item.type=='quit'">{{item.user}}退出群聊</div>
                        <!-- 单聊 -->
                        <div v-if="item.type=='talk'">
                            <div class="you-secret" v-if="item.userId==userId">你对{{item.toUser}}说{{item.content}}</div>
                            <div class="secret" v-else>{{item.user}}对你说{{item.content}}</div>
                        </div>
                        <!-- 收到消息 -->
                        <div class="all-message" :class="{'myMessage':item.userId==userId}" v-if="item.type=='message'">
                            <img v-if="item.userId!=userId" class="head-img" :src="headImg" />
                            <div>
                                <div class="time">{{item.user}}:{{item.time}}</div>
                                <span class="message">{{item.content}}</span>
                            </div>
                            <img v-if="item.userId==userId" class="head-img" :src="headImg" />
                        </div>
                    </div>
                </div>
                <!-- 编辑栏 -->
                <div class="eidt-box">
                    <Input v-model="text" show-word-limit type="textarea" placeholder="Enter something..." />
                    <div class="eidt-btn">
                        <Select style="width:200px" @on-change='talkto'>
                     <Option value="all" :key="-1">所有人</Option>
                     <Option v-for="(item,index) in users" v-if="item.userId!=userId" :value="item.userId" :key="index">{{item.userName}}( {{item.userId}} )</Option>
                </Select>
                        <div>
                            <Button type="error" @click="quit()">退出</Button>
                            <Button type="success" @click="send()">发送</Button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 用户信息 -->
            <div class="right">
                <div class="title">当前在线{{users.length}}人</div>
                <div class="user-list" @click="talkto(item.userId)" v-for="(item,index) in users" :key="index" :class="{'isMe':item.userId==userId}">
                    <img class="head-img" :src="headImg" />
                    <span>{{item.userName}}( {{item.userId}} )</span>
                </div>
            </div>
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
            userId: '',
            text: '大家好 丫~我是婷婷儿', //内容
            ws: null, //wbs
            talkType: 'message',
            message: { //发送的消息格式
                type: '', //发送类型
                user: '',
                userId: '',
                toUser: '', //消息接收方名
                toUserId: '', //消息接收方id
                content: '', //发送内容
                time: '' //发送时间
            },
            headImg: require("~/static/mobile/headImg/default.png")
        }
    },
    methods: {
        // 单聊
        talkto(userId) {
            if (userId == 'all') {
                this.talkType = 'message';
            } else {
                this.talkType = 'talk';
            }
            this.message.toUserId = userId;
        },
        // 退出聊天室
        quit() {
            this.message.type = 'quit';
            this.message.content = this.text;
            this.ws.onopen();
            this.ws.close();
            this.ifEnter = false;

        },
        // 设置昵称
        settingName() {
            this.ifEnter = true;
            this.userId = new Date().getTime();
            this.message.type = 'addUser';
            this.message.user = this.userName;
            this.message.userId = this.userId;
            this.message.time = new Date().toLocaleString()
            this.initWbs();
        },
        // wbs初始化；
        initWbs() {
            this.ws = new WebSocket(`ws://172.28.194.52:8080/chat?userId=${this.message.userId}&userName=${this.userName}`);
            // 设置属性
            // 连接时
            this.ws.onopen = (e) => {
                var sendMessage = JSON.stringify(this.message);
                this.ws.send(sendMessage)
            };
            // 收到信息时
            this.ws.onmessage = (e) => {
                var recieve = JSON.parse(e.data);
                switch (recieve.type) {
                    // 首次连接会发送所有用户信息
                    case 'allUser':
                        this.users = recieve.userList;
                        break;
                        // 添加用户
                    case 'addUser':
                        break;
                    case 'talk':
                        break;
                        // 退出消息
                    case 'quit':
                        // 获得退出用户信息，从列表中去掉；
                        this.users = this.users.filter((element, index) => {
                            if (recieve.userId != element.userId) {
                                return element;
                            }
                        })
                        break;
                        // 普通消息
                }
                if (recieve.type != 'allUser') {
                    this.messageList.push(recieve);
                    // ue中数据和dom渲染由于是异步的，所以，要让dom结构随数据改变这样的操作都应该放进this.$nextTick()的回调函数中。
                    this.$nextTick(() => {
                        var ele = document.getElementById('content');
                        ele.scrollTop = ele.scrollHeight - ele.clientHeight;
                    })
                }
            };
            // 退出时
            this.ws.onclose = () => {
                this.users = [];
                console.log(this.users)
                this.messageList = [];
                console.log("你已经退出聊天室了!!");
            };
        },
        send() {
            this.message.type = this.talkType;
            this.message.content = this.text;
            this.ws.onopen();
        }
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 500px) {
    .right{
        display: none;
    }
}

@import "~assets/css/mobile/base.less";
@img-secret: '~static/mobile/icon/secret.png';
::-webkit-scrollbar {
    width: 1px;
    background-color: @white;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #5a76cd;
}

.chat-box {
    margin: 0 auto;
    max-width: 1024px;
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
}

.before {
    width: 100%;
}

.after-box {
    margin: 0 auto;
    .talk-title {
        .title();
        background: @green;
        color: white;
        text-align: center;
    }
}

.after {
    width: 100%;
    display: flex;
    .left {
        width: 100%;
        border: solid 1px @line-color;
        .eidt-btn {
            padding: 10px;
            .flex();
            justify-content: space-between;
        }
        .talk-box {
            width: 100%;
            height: 100%;
            overflow: scroll;
            overflow-x: hidden;
            padding: 10px;
            .notice {
                &:before {
                    content: " ";
                    display: inline-block;
                    margin-right: @distansSmall;
                    .icon(@width: 15px);
                    background: url(@img-notice) no-repeat;
                    background-size: 100%;
                    vertical-align: middle;
                }
                text-align: center;
                font-size: 20px;
                .gray-text();
            }
            .all-message {
                padding: 10px 0;
                .flex();
                flex-wrap: nowrap;
                .head-img {
                    .icon(20px)
                }
                .time {
                    text-align: right;
                }
                .message {
                    background: @green;
                    color: @white;
                    margin: 5px 0;
                    padding: 5px;
                    border-radius: 5px;
                    display: inline-block;
                }
            }
            .myMessage {
                justify-content: flex-end;
                .message {
                    float: right;
                }
            }
            .you-secret {
                color: @red;
            }
            .secret {
                &:before {
                    content: " ";
                    display: inline-block;
                    margin-right: @distansSmall;
                    .icon(@width: 15px);
                    background: url(@img-secret) no-repeat;
                    background-size: 100%;
                    vertical-align: middle;
                }
                color: @red;
            }
        }
    } // 右侧列表
    .right {
        border: solid 1px @line-color;
        padding: 10px;
        width: auto;
        min-width: 200px;
        height: inherit;
        overflow: auto;
        .user-list {
            line-height: 30px;
        }
        .isMe {
            line-height: 20px;
            color: @green;
            font-weight: bold;
        }
        .head-img {
            .icon(20px);
            vertical-align: middle;
        }
    }
}
</style>