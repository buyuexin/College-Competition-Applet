// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.a==0){
    return cloud.database().collection("engineeringcourse").get()
  }else if(event.a==1){
    return cloud.database().collection("science").get()
  }else if(event.a==2){
    return cloud.database().collection("commerce").get()
  }else if(event.a==3){
    return cloud.database().collection("Literature_and_Sports").get()
  }else if(event.a==4){
    return cloud.database().collection("comprehensive").get()
  }else if(event.school==1){
    return cloud.database().collection("school_comp").get()
  }
}