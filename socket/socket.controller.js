
const noteModel = require('../model/note.model')


function socketController(io){

        io.on('connection',(socket)=>{
          socket.on('hamada',data=>{
            socket.broadcast.emit('replay',data)
          })
        
          socket.on('hamada',async(data) =>{
            const{title,desc} = data
            await noteModel.insertMany({title,desc})
            let allNote = await noteModel.find({})
            socket.emit('replay',allNote)
          })
        
          socket.on('load',async()=>{
            let allNote = await noteModel.find({})
            socket.emit('replay',allNote)
          })


      socket.on('id',async(_id) =>{
        console.log(_id);
        await noteModel.findByIdAndDelete({_id})
        let allNote = await noteModel.find({})
        socket.emit('replay',allNote)
      })

      socket.on('updateNote',async (_id)=>{
       let note= await noteModel.findOne({_id})
       socket.emit('note',note)
      })

socket.on('completeUpdate',async(data)=>{
  console.log(data);
  const{_id,title,desc} =data

  await noteModel.findByIdAndUpdate({_id} ,{title,desc})
  let allNote = await noteModel.find({})
   socket.emit('replay',allNote)
 
})


socket.on('inputValue',async(data)=>{
 let allNote = await noteModel.find({title:{$regex:data}})
socket.emit('replay',allNote)
})

  
  })



}

module.exports =socketController