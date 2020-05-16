const http=require('http')
const express=require('express')
const app=express()
const socketio=require('socket.io')

const server=http.createServer(app)
const io=socketio(server)// to work with socket on server named server
// it includes a js file at path /socket.io/socket.io.js


io.on('connection',(socket)=>{
    console.log('Connected with socket id = ',socket.id)
  
    socket.on('msg_send',(data)=>{ // data is msg:inpMsg here
        console.log('Recieved Message ',data.msg)
        io.emit('msg_rcvd',data) // here if we use socket.emit 
        //then the msg would only reach us and not to other people connected to site
        // io is collection of all sockets and sockets is one to one connection
        // use io.emit when u want to others to see  the msg send including yourself
        // use socket.emit when only u want to see message yourself
        //********** when you want only others to see use socket.broadcast.emit */

    })


})

app.use('/',express.static(__dirname+'/public'))

server.listen(3344,()=>{
    console.log('http://localhost:3344')
})