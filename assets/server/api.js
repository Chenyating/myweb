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


function getAticleList(){
   return HTTP.GET('/article/articleList')//获得文章列表
}

export default{
    // funcName
    getAticleList
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