// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if(event.class==0){
    return cloud.database().collection("engineeringcourse").where({id:event.id}).get()
  }else if(event.class==1){
    return cloud.database().collection("science").where({id:event.id}).get()
  }else if(event.class==2){
    return cloud.database().collection("commerce").where({id:event.id}).get()
  }else if(event.class==3){
    return cloud.database().collection("Literature_and_Sports").where({id:event.id}).get()
  }else if(event.class==4){
    return cloud.database().collection("comprehensive").where({id:event.id}).get()
  }
}