let socket=io()
let btnSend=document.getElementById('btnSend')
let inpMsg=document.getElementById('inpMsg')
let ulMsgList=document.getElementById('ulMsgList')

btnSend.onclick=()=>{
    socket.emit('msg_send',{
        msg:inpMsg.value
    })
    inpMsg.value
}