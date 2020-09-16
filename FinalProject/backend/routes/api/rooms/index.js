var express = require('express');
var router = express.Router();
const room = require('../../../models/room'); //모델 불러옴

router.post('/', (req, res, next) => {
  const {name, desc, lock, pwd, limit, mem} = req.body
  const r = new room({name, desc, lock, pwd, limit, mem})
  r.save()
    .then(r=>{
      console.log(r + "저장 성공")
      room.find({name:name},{_id:1})
        .then(r=> {
          res.send({id : r})
        })
        .catch(e=>{
          console.error(e)
        })
    })
    .catch(e => {
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



module.exports = router;