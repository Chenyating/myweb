<template>
<div>
    <!-- 留言输入框 -->
    <Form class="input-box" ref="messageForm" :model="messageForm" :rules="messageRule" inline :label-width="100">
        <FormItem class='input-fill' prop="name" label="你的姓名：">
            <Input type="text" :maxlength="15" v-model="messageForm.name" placeholder="请输入你的大名~" />
        </FormItem>
        <FormItem class='input-fill' prop="content" label="给我的留言：">
            <Input type="textarea" :maxlength="100" v-model="messageForm.content" placeholder="等你好久，快跟我说话~"></Input>
        </FormItem>
        <Button class="input-btn" type="primary" @click="takeMessage('messageForm')">提交</Button>
    </Form>
    <!-- 留言列表 -->
    <Divider orientation="left" class="title">留言列表</Divider>
    <reject v-if="messageList==null"></reject>
    <div v-else>
        <Card class="message-card" v-for="(item,index) in messageList" :key="index">
            <img class="border-message" src="~static/mobile/icon/borderMessage.png" />
            <div slot="extra" class="flex">
                <div @click="delet(item.id,index)" class="em-red">
                    删除
                </div>
                <div @click="reply(item)" class="em-blue">
                    回复
                </div>
            </div>
            <div class="flex">
                <Avatar shape="square" :src="require('~/static/mobile/headImg/'+item.headImg+'.png')" size="large" />
                <div class="message-info">
                    <div class="text-bold">{{item.name}}</div>
                    <div class="gray-text" v-if="item.createTime">{{item.createTime}}</div>
                </div>
            </div>
            <div class="text">{{item.content}}</div>
            <div class="text" v-if="item.returnContent"><em class="em-blue">楼主回复：</em>{{item.returnContent}}</div>
            <div class="gray-text" v-if="item.returnContent">{{item.returnTime}}</div>
        </Card>
        <div @click="getmore">
            <Divider orientation="center" class="text">{{ifmore?'点击更多……':"已经到底啦"}}</Divider>
        </div>
    </div>

</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";
import reject from "~/components/mobile/reject";
export default {
    transition: "mobilePage",
    components: {
        reject
    },
    data() {
        return {
            replyContent: '',
            // 留言列表
            messageList: null,
            // 表单信息
            messageForm: {
                name: "",
                content: "",
                creatTime: ""
            },
            // 留言填入规则
            messageRule: {
                name: [{
                        required: true,
                        message: "歪！你的名字捏？",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 15,
                        message: "你的名字有介么长的吗？",
                        trigger: "blur"
                    }
                ],
                content: [{
                        required: true,
                        message: "对我说的话捏？",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        min: 5,
                        message: "字数有点儿少啊￣へ￣",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        max: 100,
                        message: "字数有点略多啊￣へ￣",
                        trigger: "blur"
                    }
                ]
            },
            num: 5,
            page: 0, //页码
            ifmore: true //是否有更多
        };
    },
    methods: {
        // 删除留言
        delet(id, index) {
            var params = {
                tableName: "message",
                id: id
            }
            SERVER.deletById(params)
                .then((data) => {
                    this.messageList.splice(index, 1);
                    this.$Message.success(`删除成功`);

                })
                .catch(err => {
                    this.$Message.error("(╥╯﹏╰╥)ง删除失败~");
                });
        },
        // 回复留言
        reply(item) {
            this.$Modal.confirm({
                render: (h) => {
                    return h('div', [
                        h('h2', {
                            props: {
                                type: 'primary',
                                size: 'small',
                            },
                        }, `回复${item.name}的留言:`),
                        h('div', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                margin: '15px 0'
                            }
                        }, item.content),
                        h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '输入回复的内容……'
                            },
                            on: {
                                input: (val) => {
                                    this.replyContent = val;
                                }
                            }
                        })
                    ]);
                },
                onOk: () => {
                    var params = {
                        id: item.id,
                        returnContent: this.replyContent,
                    }
                    SERVER.replyMessage(params)
                        .then(data => {
                            // 重新获取留言内容
                            [this.page, this.ifmore] = [0, true];
                            this.getMessageList(this.num, this.page);
                            this.$Message.success(data.data);
                        })
                        .catch(err => {
                            this.$Message.error("Σσ(・Д・；)请求失败！我我我什么都没做!!!");
                        });
                },
            });
        },
        // 提交留言
        takeMessage(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    var messageForm = {
                        name: this.messageForm.name,
                        content: this.messageForm.content
                    };
                    SERVER.postMessage(messageForm)
                        .then(data => {
                            if (data.data.code == 1) {
                                this.$Message.info(data.data.info);
                                // 重新获取留言内容
                                [this.page, this.ifmore] = [0, true];
                                this.getMessageList(this.num, this.page);
                            } else if (data.data.code == 0) {
                                this.$Message.error(data.data.info);
                            } else {
                                this.$Message.info("出现了其他错误，一会再提交吧~");
                            }
                        })
                        .catch(err => {
                            this.$Message.error("Σσ(・Д・；)请求失败！我我我什么都没做!!!");
                        });
                } else {
                    this.$Message.error("是不是你填的姿势有问题？||!");
                }
            });
        },
        // 获得留言列表
        getMessageList(num, page) {
            var params = {
                num: num,
                page: page
            };
            SERVER.getMessageList(params)
                .then(data => {
                    // 返回的长度为0则表示，没有更多了。
                    if (data.data.length == 0) {
                        this.ifmore = false;
                    } else {
                        // 如果当前页码为0，那么就重新赋值给留言列表；
                        if (this.page == 0) {
                            this.messageList = data.data;
                        } else {
                            // 否则就在留言列表后面继续添加
                            this.messageList = this.messageList.concat(data.data);
                        }
                    }
                })
                .catch(err => {
                    this.$Message.error("请求留言列表失败惹……(；′⌒`)");
                });
        },
        // 获得更多；
        getmore() {
            if (this.ifmore) {
                this.page = this.page + 1;
                this.getMessageList(this.num, this.page);
            } else {
                return;
            }
        }
    },
    mounted() {
        this.getMessageList(this.num, this.page);
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";

// 输入框
.input-box {
    padding: @distansBig;

    .input-fill {
        width: 100%;
    }

    .input-btn {
        float: right;
    }
}

// 留言信息卡
.message-card {
    background: transparent;
    margin: @distansBig;
    .border-shadow();

    .message-info {
        margin-left: @distansBig;
    }
}

.border-message {
    position: absolute;
    right: 0;
    .icon(@width: 50px);
    bottom: 0;
}
</style>
