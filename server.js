const http=require('http')
const express=require('express')
const app=express()
const socketio=require('socket.io')

const server=http.createServer(app)
const io=socketio(server)// to work with socket on server named server
// it includes a js file at path /socket.io/socket.io.js


io.on('connection',(socket)=>{
    console.log('Connected with socket id = ',socket.id)
  
    socket.on('login',(data)=>{
        socket.join(data.username)
        socket.emit('logged_in')
    })

    socket.on('msg_send',(data)=>{
        if(data.to)
        {
            io.to(data.to).emit('msg_rcvd',data)
        }
        else
        {
            socket.broadcast.emit('msg_rcvd',data)
        }
    })
})

app.use('/',express.static(__dirname+'/public'))

server.listen(3344,()=>{
    console.log('http://localhost:3344')
})