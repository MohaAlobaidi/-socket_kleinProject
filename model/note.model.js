const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  title:String,
  desc:String
})
const noteModel = mongoose.model('note',noteSchema)
module.exports = noteModel