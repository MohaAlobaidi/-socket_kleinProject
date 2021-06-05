var socket =io()
socket.on('connect',()=>{
  socket.emit('load')
})

// let title 
// $('button').click(function(){
//   title =$('#title').val()

//   socket.emit('hamada',title)
// })

// socket.on('replay',(data)=>{
//   console.log(`welkom ${data}`);
// } )


function sendData(){
  let title = $('#title').val()
  let desc = $('#desc').val()
  socket.emit('hamada',{title,desc})
}




socket.on('replay',data=>{
  desplayData(data)
})


function desplayData(data){
  let cartona = ''
  for (let i = 0; i < data.length; i++) {
    //console.log(data);
   cartona +=`
      <div class="col-4 my-2">
      <div class="item bg-dark p-3 ">
      <h1 class="text-center text-white">${data[i].title}</h1>
      <p class="text-white">${data[i].desc}</p>
      <button onclick='delete_id("${data[i]._id}")' class='btn btn-danger ' > Delete </button>
      <button onclick='updateNote("${data[i]._id}")' class='btn btn-info ' > update </button>

      </div>
   </div>
   `
    
  }
  document.querySelector('.row').innerHTML = cartona
  //$('#row').html(cartona)
}


function delete_id(_id){
  socket.emit('id',_id)
}

let noteID
function updateNote(_id){
  noteID = _id
  console.log('up',_id);
  socket.emit("updateNote",_id)
}

socket.on('note',note=>{
  console.log(note);
  let title =note.title
  let desc = note.desc
  $('#updateTitle').val(title)
  $('#updateDesc').val(desc)
  $('#exampleModal').modal('show')

})
function nowUpdate(){

  socket.emit('completeUpdate',{title:$('#updateTitle').val(),desc: $('#updateDesc').val(),_id:noteID})
  $('#exampleModal').modal('hide')

}




function search(){
  let inputValue = $('#search').val()
 // console.log(search);
  socket.emit('inputValue',inputValue)
  
}