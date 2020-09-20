const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name : { type: String, default: '', unique: true },
    desc: { type: String, default: '' },
    lock :{ type: Boolean, default: false},
    pwd :{type: String, default: ''},
    limit :{type: Number, default: 1},
    mem :{type: Array, default:[]}
})

const room = mongoose.model('room', roomSchema)

module.exports = room