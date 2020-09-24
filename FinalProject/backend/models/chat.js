const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    roomId : {type : String, default:''},
    messages : {type : Array, default : []} //[{nickname: apple, msg: apple's message}]
})

const chat = mongoose.model('chat', chatSchema) //db에는 chats 컬렉션 생성 -> 다큐먼트 : chat

module.exports = chat