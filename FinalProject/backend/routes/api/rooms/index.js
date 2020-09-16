var express = require('express');
var router = express.Router();
const room = require('../../../models/room'); //shema 불러옴

router.post('/', (req, res, next) => {
  const {name, desc, lock, pwd, limit, mem} = req.body
  const r = new room({name, desc, lock, pwd, limit, mem})
  r.save()
    .then(r=>{
      res.send({msg : "db저장 완료"})
    })
    .catch(e => {
      res.send({msg : "db 저장 실패"})
    })
});


router.get('/', (req, res, next) =>{
  room.find()
    .then(r => {
      console.log(r)
      res.send({rooms:r})
    })
    .catch(e => {
      res.send({msg : "불러오기 실패"})
      })
});



module.exports = router;