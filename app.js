const express = require('express')

const app = express()
const port = 3000 ||process.env.PORT
const path = require('path')
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:false}))


app.set('view engine', 'ejs');










app.get('/', (req, res) => {
  res.render('home')
})
mongoose.connect('mongodb://localhost:27017/socket', {useNewUrlParser: true, useUnifiedTopology: true});

let server = app.listen(port, () => console.log(`Example app listening on port port!`))
const io = require('socket.io')(server)



const socketcontroller = require('./socket/socket.controller')

socketcontroller(io)




