let socket=io()
let boombtn=document.getElementById('boom')
boombtn.onclick=function(){
    socket.emit('boom')// sending response from client to server
}

socket.on('whizz',()=>{
    let div=document.createElement('div')
    div.innerText='whizz'
    document.body.appendChild(div)
})