// 这个文件主要用于放置所有接口

// 这是文件是使用export default{方法1，方法2}，以导出对象的方式；使用的时候要：对象.方法1()
import HTTP from '~/assets/server/http.js'

// 这是文件已export function funcName(){}的方式导出方法，引用的时候要{方法1，方法2}的方式。用的时候直接：方法1();
// import {GET,POST} from '~/assets/server/http.js'

// ##############################################################################################

// 本js方法的例子：
// function funcName(参数){
//    return HTTP.GET('接口地址',参数)
// }

// ##############################################################################################
// ————首页信息————
function getshuoshuo(params) {
   return HTTP.GET('/index',params)//访问次数
}
// ————次数————
function getVisitors() {
   return HTTP.GET('/article/articleList')//访问次数
}

// ————文章————
function getAticleList() {
   return HTTP.GET('/article/articleList')//获得文章列表
}

function postAticle(params) {
   return HTTP.POST('/article/articleContent', params)//获得文章内容
}

function getAticleRead() {
   return HTTP.get('/article/articleList')//获得文章阅读次数
}

// ————评论————
function getMessageList(params) {//parames:{每页显示个数，页码}
   return HTTP.GET('/message/messageList', params)//获得评论列表
}

function postMessage(params) {
   return HTTP.POST('/message/takeMessage', params)//提交评论
}

// ————统计次数————
function addTimes(params) {
   return HTTP.GET('/times/addTimes', params)//增加次数
}

function getTimes(params) {
   return HTTP.GET('/times/getTimes', params)//获得次数
}
// ————项目————
function getProjectByType(params) {
   return HTTP.POST('/project/getProjectByType', params)//增加次数
}

// ————上传————
function upload(params) {
   return HTTP.UPLOAD('/upload/img', params)//增加次数
}


export default {
   // funcName
   //  获得说说
   getshuoshuo,
   // 访问次数
   getVisitors,

   // 博客接口
   getAticleList,
   postAticle,
   getAticleRead,

   // 留言接口
   getMessageList,
   postMessage,

   //  统计次数
   addTimes,
   getTimes,

   // 项目
   getProjectByType,

   // 上传
   upload
}

// ##############################################################################################
// 在其他页面引用本js的方式是：
// import SERVER from '~/assets/server/api.js'
// SERVER.funcName(参数).then((data) => {
//     成功调用的方法
//   }).catch(() =>
//     失败调用的方法
//   )
// }
// ##############################################################################################