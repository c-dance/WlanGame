var express = require('express');
const { isValidObjectId, Mongoose } = require('mongoose');
var router = express.Router();
const chat = require('../../../models/chat'); //모델 불러옴


/* 특정 방의 전체 메시지 불러 오기*/
router.get('/', (req, res, next) => {
    chat.find({roomId:req.body.roomId},{messages:1})
        .then(r=>{
            res.send({allMsg : r})
        })
        .catch(e =>{
            console.log(error)
            res.send({errorMsg : e})
        })
    });

  
  /* 특정 방의 채팅 컬렉션 생성하기 -> 방 만들 때 한 번만 요청*/
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


  /* 메시지 넣기 */
router.put('/', (req, res, next)=> {
    const{roomId, nickName, msg} = req.body
    Chat.updateOne({roomId : roomId},{$addToSet:{ nickname:nickName, msg:msg}},{new:true})
        .then(r=>{
            res.send(r)
            console.log("success")
        })
        .catch(e =>{
            res.send({msg:e})
            console.error(e)
        })
  });
  
  /* 메시지 다큐멘트 삭제하기 */
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
  
  module.exports = router;