// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const DB=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  //return event
  return DB.collection("users").where({useropenid:event.Iopenid}).get()//方式users集合内指定openID的条目
}