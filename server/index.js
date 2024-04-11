import express from "express"
import {createServer} from 'http'
import {Server} from 'socket.io'
import {config} from 'dotenv'


config({
    path : '.env'

})

const app = express()
const server = createServer(app)
const io = new Server(server , {
    cors: {
        origin: "http://localhost:3000",

    }
})


io.use((socket, next) =>{
    const username = socket.handshake.auth.username
    if (username) {
        socket.data.username = username
        next()

    }
})


io.on("connection" , async (socket) =>{
    
    socket.emit("user" , socket.data.username)
    socket.emit("total-users" , io.engine.clientsCount)
    let users = []

    const users_data = await io.fetchSockets()
    const fetch_users_data =  () =>{
        users_data.forEach((element) =>{
            const username = element.data.username
            const userID = element.id
            users.push({username, userID})
        })

       io.emit("online-users" , users)
    }

    fetch_users_data()
    
    socket.broadcast.emit("new-user" , {newuser: `${socket.data.username} has joined!`})

    socket.on("new-message" , (e) =>{
        const user_who_send = socket.data.username
        const socketID = socket.id
        const date_time = new Date()
        const am_pm = date_time.getFullYear() > 12 ? "PM" : "AM"
        const time = date_time.getHours() + ":" + date_time.getMinutes() + am_pm
       

        io.emit("Message-new" , {message:e , whoSended:user_who_send , socketid:socketID , time:time})
    })


    socket.on("disconnect" , () =>{
        const socketId = socket.id
        users = users.filter(e=> e.userID !== socketId)
        socket.broadcast.emit("disconnected-user" , {disconnected: `${socket.data.username} has left!`})

        io.emit("online-users" , users)
    })
    

})

server.listen(process.env.PORT || 4000 , ()=>{
    
    console.log(`Server is running on ${process.env.PORT || 4000}`)

})


