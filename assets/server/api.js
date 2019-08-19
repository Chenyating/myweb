// 这个文件主要用于放置所有接口

// 这是文件是使用export default{方法1，方法2}，以导出对象的方式；使用的时候要：对象.方法1()
import HTTP from '~/assets/server/http.js'

// 这是文件已export function funcName(){}的方式导出方法，引用的时候要{方法1，方法2}的方式。用的时候直接：方法1();
// import {GET,POST} from '~/assets/server/http.js'

function aa(params){
   return HTTP.GET('/users',params)
    // console.log(GET)
}

export default{
    aa
}