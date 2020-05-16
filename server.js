const http=require('http')
const express=require('express')
const app=express()
const socketio=require('socket.io')

const server=http.createServer(app)
const io=socketio(server)// to work with socket on server named server
// it includes a js file at path /socket.io/socket.io.js

let users={
        'arnav':'agag123'
}
let socketmap={}
io.on('connection',(socket)=>{
    console.log('Connected with socket id = ',socket.id)
    
    function login(s,u) {
        s.join(u)
        s.emit('logged_in')
        socketmap[s.id]=u
        console.log(socketmap)
    }

    socket.on('login',(data)=>{
        if(users[data.username])
        {
            if(users[data.username]==data.password)
            {
                login(socket,data.username)
            }
            else{
                socket.emit('login_failed')
            }
        }
        else{
            users[data.username]=data.password
            login(socket,data.username)
        }
        console.log(users)
    })

    socket.on('msg_send',(data)=>{
        data.from=socketmap[socket.id]
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