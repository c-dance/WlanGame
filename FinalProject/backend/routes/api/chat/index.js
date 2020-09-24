var express = require('express');
const Mongoose = require('mongoose');
var router = express.Router();
const chat = require('../../../models/chat'); //모델 불러옴


/* 특정 방의 전체 메시지 불러 오기*/
router.get('/:roomId', (req, res, next) => {
    chat.find({roomId:req.params.roomId},{messages:1})
        .then(r=>{
            const messages = r[0].messages
            console.log(messages)
            res.send(messages)
        })
        .catch(e =>{
            console.log(error)
            res.send({errorMsg : e})
        })
    });

  
  /* 특정 방의 채팅 컬렉션 생성하기 -> 방 만들 때 함께 생성(rooms/index.js)
  router.post('/',(req, res, next) => {
    const c = new chat({roomId : req.body.roomId, messages:[]}) //새로운 모델 생성
        c.save() // 다큐먼트로 넣기 
        .then(r=>{
            res.send(r+"room create")
            console.log(r + "저장 성공")
        })
        .catch(e=>{
            console.log(e)
        })
});
*/


  /* 메시지 넣기 */
router.put('/newmsg', (req, res, next)=> {
    const roomId = req.body.roomId
    const nickname = req.body.nickname
    const msg= req.body.msg
    chat.updateOne({roomId : roomId},{$addToSet:{messages:{nickname:nickname, msg:msg}}},{new:true})
        .then(r=>{
            res.send(r)
            console.log("success")
        })
        .catch(e =>{
            res.send({msg:e})
            console.error(e)
        })
  });
  
  /* 메시지 다큐멘트 삭제하기 -> 방 삭제할 때 함께 삭제(rooms/index.js)
  router.delete('/:roomId', function(req, res, next) {
    Chat.remove({roomId :req.params.id})
        .then(r=>{
            res.send(r+"delete success")
            console.log(r+"delete success")
        })
        .catch(e=>{
            console.log(e+"delecte fail!")
        })
  });
  */
  
  module.exports = router;