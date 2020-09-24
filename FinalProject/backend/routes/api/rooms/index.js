var express = require('express');
//const { isValidObjectId, Mongoose } = require('mongoose');
const Mongoose = require('mongoose');
var router = express.Router();
const room = require('../../../models/room'); //모델 불러옴
const chat = require('../../../models/chat'); // room생성시 함께 생성

router.post('/', (req, res, next) => {
  const {name, desc, lock, pwd, limit, mem} = req.body
  const r = new room({name, desc, lock, pwd, limit, mem})
  const roomId = ""
  r.save()
    .then(r=>{
      console.log(r + "저장 성공")
      room.find({name:name},{_id:1})
        .then(r=> {
          const roomId = r[0]._id._id
          console.log(roomId)
          const c = new chat({roomId : roomId, messages:[]})
          c.save()
            .then(r=>{console.log(r+"chatRoom made")})
            .catch(e=>console.log(e))
          res.send({id : r})
        })
        .catch(e=>{
          console.error(e)
        })
    })
    .catch(e => {
      res.send({msg : e})
      console.error(e)
    })
  
});

router.get('/', (req, res, next) =>{
  room.find()
    .then(r => {
      res.send({rooms:r})
      console.log(r)
      console.log("불러오기 성공")
    })
    .catch(e => {
      res.send({msg : e})
      console.error(e)
    })
});


/* router.put('/login', (req, res, next) => {
  const name = req.body.name
  const nickname = req.body.nickname
  room.updateOne({name:name},{$addToSet:{mem:nickname}},{new:true})
      .then(r=>{
          res.send(r)
          console.log("success")
      })
      .catch(e =>{
          res.send({msg:e})
          console.error(e)
      })
}); */

router.put('/login', (req, res, next) => {
  const id = req.body.id
  const nickname = req.body.nickname
  room.updateOne({_id:id},{$addToSet:{mem:nickname}},{new:true})
      .then(r=>{
          res.send(r)
          console.log("success")
      })
      .catch(e =>{
          res.send({msg:e})
          console.error(e)
      })
});



router.get('/login/:id', (req, res, next) =>{
console.log("받음")
room.findOne({_id :req.params.id})
  .then(r => {
    res.send({room:r})
    console.log(r)
  })
  .catch(e => {
    res.send({msg : e})
    console.error(e)
  })
});

router.put('/deleteOne',(req,res,next)=>{
  const id = req.body.id
  const nickname = req.body.nickname
  room.updateOne({_id:id},{$pull:{mem:nickname}},{new:true})
        .then(r=>{
          res.send(r)
          console.log("success")
      })
      .catch(e =>{
          res.send({msg:e})
          console.error(e)
      })
})

router.put('/deleteRoom',(req,res,next)=>{
  const id = req.body.id
  console.log(id)
  room.deleteOne({_id:id})
        .then(r=>{
          chat.deleteOne({roomId:id})
            .then(r=>console.log("ok:"+r.ok+" / n:"+r.n))
            .catch(e=>console.log(e))
          console.log(r.ok)
          console.log(r.n)
          res.send(r)
      })
      .catch(e =>{
          res.send({msg:e})
          console.log(e)
      })
})



module.exports = router;