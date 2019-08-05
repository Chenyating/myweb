<template>
<!-- mobile首页 -->
<div class="mobile-index-box">
    <div class="main-info">
        <h1>{{name}}</h1>
        <h5>WEB前端开发工程师</h5>
    </div>
    <div class="inf-box">
        <div class="main-introduction">
            <img src="~/static/mobile/index/yating.jpg" class="photo" />
            <div class="my-int">{{introduction}}</div>
        </div>
        <div class="int-div">
            <div>毕业院校：天津工业大学 (2014年9月——2018年7月)</div>
            <div>专业：软件工程（本科）</div>
            <div>是一个喜欢接触新的事物，喜欢专研新的东西，思维活跃，富有创意，认真负责，待人亲切，有团队意识的小伙伴</div>
        </div>

    </div>
    <!-- csdn -->
    <div class="inf-box">
        <div class="title" @click="goLink(1)"><em>CSDN:</em>YaTing 的 Soil solution</div>
        <div class="main-introduction" @click="goLink(1)">
            <img src="~/static/mobile/index/csdn.jpg" class="photo" />
            <div class="inf-inf">
                在<em>CSDN</em>中,写博客已经快<em>2</em>年了,原创<em>54</em>篇,总浏览量<em>1万</em>。每天记录自己在技术方面的成长，由一只小小菜鸟演变成一只<em>菜鸟</em>，只为通往大神的方向……
            </div>
        </div>
        <div>
            <div class="link"><a href="https://blog.csdn.net/lemisi/article/details/88051630">详解球球保卫大作战：html+js+canvas实现原理<span></span></a>
            </div>
            <div class="link"><a href="https://blog.csdn.net/lemisi/article/details/83242543">详解前端扫雷代码：HTML+JS+DIV实现原理<span></span></a>
            </div>
            <div class="link"><a href="https://blog.csdn.net/lemisi/article/details/82824676">详解前端俄罗斯方块代码：HTML+JS+CANVAS实现原理<span></span></a>
            </div>
            <div class="link"><a href="https://blog.csdn.net/lemisi/article/details/82219322">贪吃蛇前端代码<span></span></a>
            </div>
        </div>
        <div class="time">
            2017年7月25日：https://blog.csdn.net/lemisi
        </div>
    </div>
    <!-- github -->
    <div class="inf-box">
        <div class="title" @click="goLink(2)"><em>github</em> Chenyating</div>
        <div class="main-introduction" @click="goLink(2)">
            <img src="~/static/mobile/index/github.jpg" class="photo" />
            <div class="inf-inf">My interest is to write <em>interesting small games</em>, through thinking about the logic of the game, to achieve it, beautify it.Because I'm a
                <em>ofront-end development engineer!</em></div>
        </div>
        <div>
            <div class="link"><a href="https://github.com/Chenyating/easyGame">小游戏集合：https://github.com/Chenyating/easyGame<span></span></a>
            </div>
        </div>
        <div class="time">
            https://github.com/Chenyating
        </div>
    </div>
    <!-- 站酷 -->
    <div class="inf-box">
        <div class="title" @click="goLink(3)"><em>站酷(ZCOOL)</em>-chen雅婷的主页</div>
        <div class="main-introduction" @click="goLink(3)">
            <img src="~/static/mobile/index/zhanku.jpg" class="photo" />
            <div class="inf-inf">
                拥有<em>11</em>年ps使用经验,<em>4年</em>平面设计经验，非科班出身，累计成交<em>60</em>多单交易，好评率<em>99%</em>。累计<em>100</em>多个原创设计作品，把兴趣当成一种爱好，修出美丽的世界……
            </div>
        </div>
        <div class="time">
            2008年9月：https://chenyating.zcool.com.cn/
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            name: "YATING",
        }
    }
}
</script>
<style lang="less" scoped>
.mobile-index-box {
    font-size: 14px;
    line-height: 25px; // 主要信息
    .main-info {
        background: #1862ab;
        width: 100%;
        color: #ffffff;
        padding: 5px;
    } // 信息框
    .inf-box {
        border-bottom: solid 5px #f1f3f4; // 标题
        padding: 10px;
        .title {
            font-size: 22px;
            font-weight: bold;
            margin: 15px 0;
        } // 图片
        .photo {
            width: 108px;
            height: 108px;
            margin-right: 0.3rem;
            margin-bottom: 5px;
        } // 标红文字
        em {
            color: #d00;
        } // 灰色文字
        .time {
            margin-top: .3rem;
            color: #999999;
        }
    }
}

.my-int {
    width: 7rem;
}

.inf-inf {
    //   width: 6.5rem;
}

.main-introduction {
    display: flex;
    flex-wrap: nowrap;
}
</style>


