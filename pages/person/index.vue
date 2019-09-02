<template>
<div>
    <Modal v-model="loginBox" :closable="false" :mask-closable="false">
        <p slot="header" style="color:#19be6b;text-align:center">
            <Icon type="md-boat" />
            <span>LOGIN MY WORLD</span>
        </p>
        <Form ref="userInfo" :model="userInfo" :rules="userInfoRule">
            <FormItem prop="user">
                <Input type="text" v-model="userInfo.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="userInfo.password" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="success" ghost size="large" long @click="login('userInfo')">登录</Button>
        </div>
    </Modal>
    <!-- 个人中心菜单 -->
    <div>
        <div>去发表心情~</div>
    </div>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";

export default {
    layout: "mobile/index",
    data() {
        return {
            token: "",
            loginBox: true,
            userInfo: {
                user: 'tinger',
                password: ''
            },
            userInfoRule: {
                user: [{
                    required: true,
                    message: '请输入账号ヾ(ｏ･ω･)ﾉ',
                    trigger: 'blur'
                }],
                password: [{
                        required: true,
                        message: '请输入密码φ(>ω<*) ',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 3,
                        message: '我就知道你是猜的输入密码o(￣▽￣)ｄ ',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        max: 7,
                        message: '我就知道你是猜的输入密码o(￣▽￣)ｄ ',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        // 登录
        login(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    SERVER.login(this.userInfo).then(data => {
                        var userInfo = {
                            token: data.data,
                            userName: this.userInfo.user
                        }
                        if (data.data.code == 1) {
                            this.token = data.data.token;
                            sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); //把token存起来
                            this.loginBox=false;
                        }
                        this.$Message.info(data.data.info);
                    }).catch(err => {
                        this.$Message.error(data.data.info);
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
            this.loginBox = true;
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
</style>
