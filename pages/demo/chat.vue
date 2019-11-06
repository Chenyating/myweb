<template>
<div class="chat-box">
    <!-- 先输入昵称 -->
    <Modal title="请输入昵称" v-model="ifBegin" :closable="false" @on-ok="settingName()">
        <Input v-model="userName" :value="userName" placeholder="请输入您的昵称" />
    </Modal>
    <!-- 开始群聊 -->
    <div class="after-box">
        <div class="talk-title">
            <div @click="telShowUser">群聊({{users.length}})</div>
            <div v-if="showUser" class="user">
                <div @click="talkto(item.userId)" v-for="(item,index) in users" :key="index">
                    <img class="head-img" :src="headImg" />
                    <span>{{item.userName}}( {{item.userId}} )</span>
                </div>
            </div>
        </div>
        <div class="after">
            <div class="left">
                <!-- 聊天内容 -->
                <div class="talk-box" id="content">
                    <div v-for="(item,index) in messageList" :key="index">
                        <!-- 加入群聊 -->
                        <div class="notice" v-if="item.type=='addUser'">{{item.user}}({{item.userId}})加入群聊</div>
                        <!-- 退出群聊 -->
                        <div class="notice" v-if="item.type=='quit'">{{item.user}}({{item.userId}})退出群聊</div>
                        <!-- 单聊 -->
                        <div v-if="item.type=='talk'">
                            <div class="notice">本条内容仅双方可见</div>
                            <div class="you-secret" v-if="item.userId==userId">
                                <div>
                                    <div class="time">{{item.time}}</div>
                                    <div>偷偷对{{item.toUserId}}说</div>
                                    <div class="you-secret-message">{{item.content}}</div>
                                </div>
                                <img class="head-img" :src="headImg" />
                            </div>
                            <div class="secret" v-else>
                                <img class="head-img" :src="headImg" />
                                <div>
                                    <div class="time">{{item.time}}</div>
                                    <div>{{item.user}}({{item.userId}}})偷偷对你说</div>
                                    <div class="secret-message">{{item.content}}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 收到消息 -->
                        <div class="all-message" :class="{'myMessage':item.userId==userId}" v-if="item.type=='message'">
                            <img v-if="item.userId!=userId" class="head-img" :src="headImg" />
                            <div>
                                <div class="time">{{item.time}}</div>
                                <div class="user-info">{{item.user}}({{item.userId}})</div>
                                <div class="message">{{item.content}}</div>
                            </div>
                            <img v-if="item.userId==userId" class="head-img" :src="headImg" />
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
        <!-- 编辑栏 -->
        <div class="eidt-box">
            <div class="eidt-input">
                <Input :autofocus='true' class="input" size="large" v-model="text" :rows="4" type="textarea" placeholder="请输入内容" />
                <Select v-model="sendTo" class="at-who" style="width:180px" @on-change='talkto' filterable> 
                <Option value="all" :key="-1">@所有人</Option>
                <Option v-for="(item,index) in users" v-if="item.userId!=userId" :value="item.userId" :key="index">@{{item.userName}}( {{item.userId}} )</Option>
                </Select>
                <div class="eidt-btn">
                    <Button class="btn" type="error" @click="quit()">退出</Button>
                    <Button type="success" @click="send()">发送</Button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    layout: 'mobile/comeback',
    data() {
        return {
            messageList: [], //所有消息列表
            users: [], //用户列表
            ifBegin: true, //是否聊天状态
            userName: '游客',
            userId: '',
            text: '大家好 丫~我是婷婷儿', //内容
            ws: null, //wbs
            sendTo: 'all',
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
            headImg: require("~/static/mobile/headImg/default.png"),
            showUser: false,
        }
    },
    methods: {
        telShowUser() {
            this.showUser = !this.showUser;
        },
        // 单聊
        talkto(userId) {
            if (userId == 'all' || userId == this.userId) {
                this.talkType = 'message';
                this.sendTo = 'all';
            } else {
                this.talkType = 'talk';
                this.sendTo = userId;
            }
            this.message.toUserId = userId;
        },
        // 退出聊天室
        quit() {
            this.message.type = 'quit';
            this.message.content = this.text;
            this.ws.onopen();
            this.ws.close();
            this.ifBegin = true;
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
            // this.ws = new WebSocket(`ws://localhost:1234/chat?userId=${this.message.userId}&userName=${this.userName}`);
            this.ws = new WebSocket(`ws://106.14.185.143:1234/chat?userId=${this.message.userId}&userName=${this.userName}`);
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
            if (this.text.replace(/^ +| +$/g, '') == '') {
                this.$Message.warning('消息不得为空');
            } else {
                this.message.type = this.talkType;
                this.message.content = this.text;
                this.ws.onopen();
            }
            this.text = '';
            $('textarea').focus();
        }
    },
    mounted() {
        var div = $(".D-show").parent().css("height", "100%");
        var div = $(".chat-box").parent().css("height", "100%");
    }
}
</script>
<style lang="less" scoped>
.user {
    display: inline-block;
    position: absolute;
    z-index: 20;
    background: @white;
    padding: 5px;
    border: solid 1px @line-color;
    color: @black;
    font-weight: lighter;
    display: none;
}
@media screen and (max-width: 500px) {
    .after {
        display: block;
    }
    .right {
        display: none;
    }
    .talk-title {
        text-align: left;
        color: red;
    }
    .user {
        display: block;
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
.eidt-box {
    .eidt-input {
        position: relative;
        .at-who {
            position: absolute;
            bottom: 0;
            z-index: 2;
        }
        .input {
            position: relative;
            border: solid 0px;
        }
    }
    .eidt-btn {
        padding: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
        .flex();
        justify-content: flex-end;
        .btn {
            margin: 0 10px;
        }
    }
}
.chat-box {
    width: 100%;
    height: 100%;
}
.before {
    width: 100%;
}
.after-box {
    width: 100%;
    height: 100%;
    max-width: 1024px;
    margin: 0 auto;
    .talk-title {
        position: relative;
        background: @green;
        padding: 5px;
        color: @white;
        font-weight: bold;
    }
}
.after {
    width: 100%;
    height: 70%;
    display: flex;
    .left {
        width: 100%;
        border: solid 1px @line-color;
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
                .user-info {
                    padding-right: 10px;
                }
                .time {
                    padding-right: 10px;
                    font-size: 8px;
                    text-align: right;
                }
                .message {
                    background: @green;
                    color: @white;
                    margin: 5px 0;
                    padding: 5px;
                    border-radius: 5px;
                }
            }
            .myMessage {
                .user-info {
                    text-align: left;
                    padding-right: 10px;
                }
                justify-content: flex-end;
                .message {
                    float: right;
                }
                .time {
                    padding-right: 10px;
                    font-size: 8px;
                    text-align: left;
                }
            }
            .you-secret {
                text-align: right;
                .flex();
                flex-wrap: nowrap;
                justify-content: flex-end;
                .you-secret-message {
                    color: @white;
                    margin: 5px 0;
                    text-align: right;
                    padding: 5px;
                    border-radius: 5px;
                    background: @red;
                    display: inline-block;
                }
                .time {
                    text-align: right;
                    padding-right: 10px;
                    font-size: 8px;
                }
            }
            .secret {
                .flex();
                justify-content: flex-start;
                flex-wrap: nowrap;
                .secret-message {
                    margin: 5px 0;
                    border-radius: 5px;
                    padding: 5px;
                    color: @white;
                    display: inline-block;
                    background: @red;
                }
                .time {
                    text-align: left;
                    padding-right: 10px;
                    font-size: 8px;
                }
            }
        }
    } // 右侧列表
    .right {
        border: solid 1px @line-color;
        padding: 10px;
        width: auto;
        min-width: 200px;
        height: 100%;
        overflow: auto;
        .user-list {
            line-height: 30px;
        }
        .isMe {
            line-height: 20px;
            color: @green;
            font-weight: bold;
        }
    }
}
.head-img {
    .icon(20px);
    vertical-align: middle;
}
</style>