<template>
<Modal v-model="loginBox" :closable="false" :mask-closable="false">
    <p slot="header" style="color:#19be6b;text-align:center">
        <Icon type="md-boat" />
        <span>LOGIN MY WORLD</span>
    </p>
    <Form ref="userInfo" :model="userInfo" :rules="userInfoRule">
        <FormItem prop="account">
            <Select v-model="userInfo.account">
                <Option v-for="item in accountList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="userInfo.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
    </Form>
    <div slot="footer">
        <Button type="success" ghost size="large" @click="cancel()">取消</Button>
        <Button type="success" ghost size="large" @click="login('userInfo')">登录</Button>
    </div>
</Modal>
</template>
<script>
import SERVER from "~/assets/server/api.js";
import {
    mapActions
} from 'vuex'
export default {
    layout: "mobile/index",
    props: {
        loginBox: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            accountList: [{
                    value: '737323',
                    label: '(❁´ω`❁) 婷儿'
                },
                {
                    value: '517768',
                    label: '(◍´꒳`◍) WHERE哥哥'
                }
            ],
            token: "",
            userInfo: {
                account: '737323',
                password: ''
            },
            userInfoRule: {
                account: [{
                    required: true,
                    message: '请输入账号ヾ(ｏ･ω･)ﾉ',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    max: 15,
                    message: '我没有介么长的账号啦(￣▽￣)ｄ ',
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
        ...mapActions([
            'isLogin'
        ]),
        // 登录
        login(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    SERVER.login(this.userInfo).then(data => {
                        var userInfo = {
                            token: data.data.token,
                            account: this.userInfo.account
                        }
                        if (data.data.code == 1) {
                            this.token = data.data.token;
                            sessionStorage.setItem('userInfo', JSON.stringify(userInfo)); //把token存起来
                            this.isLogin();
                            // 把值传给父组件去。
                            this.$emit('hasLogin', false)
                        }
                        this.$Message.info(data.data.info);
                    }).catch(err => {
                        this.$Message.error(data.data.info);
                    })
                } else {
                    this.$Message.error('输入不符合规范，怪我咯ヽ(ー_ー)ノ!');
                }
            })
            this.loginBox = true;
        },
        cancel() {
            // 把值传给父组件去。
            this.$emit('hasLogin', false)
        }
    }
};
</script>