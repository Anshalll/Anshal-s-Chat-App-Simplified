import React, { useEffect, useState, useMemo } from 'react'
import { io } from 'socket.io-client'
import Sidebar from './Sidebar'
import {Send} from '@mui/icons-material'

export default function Chat({ username }) {

    const [Onlineusers, setOnlineusers] = useState([])
    const [Messages, setMessages] = useState([])
    const [user, setuser] = useState('')
    const [input_value, setinput_value] = useState("")
    const [Totalusers , settotalusers] = useState(0)
    const server = useMemo(() => io("http://localhost:4000", {
        auth: {
            username: username
        }
    }), [username])


    useEffect(() => {
        server.on("message", e => {
            console.log(e)
        })


        server.on("total-users" , e=>settotalusers(e))

        server.on('online-users', e => setOnlineusers(e))
        server.on('new-user', (e) => {
            setMessages(newMessages => [...newMessages, e])
        })

        server.on("Message-new" , (e)=>{
            console.log(e)
            setMessages(newMessages=> [...newMessages , e])
        })


        server.on("user" , e=>setuser(e))

        server.on('disconnected-user', (e) => {
            setMessages(newMessages => [...newMessages, e])
        })




    }, [server])

    const message = (e) => {
        setinput_value(e.target.value)

    }

    const send_message = () => {

        if (input_value.trim() !== "") {

            server.emit("new-message", input_value)
            setinput_value("")
        }
    }

    return (
        <div className='w-full h-full flex'>
            <Sidebar Onlineusers={Onlineusers} server={server}  Totalusers={Totalusers}/>
            <div className='w-[70%] h-full items-center justify-center flex flex-col p-[20px]'>

                <div className='h-[10%] flex items-center text-white px-[20px] w-full bg-gray-900 rounded-full justify-between'>
                    <p>Anshal's Chat app</p>
                    <p className='bg-green-500  text-sm p-[5px] text-black'>{user}</p>
                </div>

                <div className='w-full scroller justify-end  h-[80%] flex flex-col p-[20px] text-white overflow-y-auto gap-[20px]'>
                    {Messages.map((value, index) => (
                            value.newuser ? <div   className='w-full flex items-center justify-center'>
                            <p className='bg-green-600 text-white p-[5px] rounded-lg'>{value.newuser}</p></div> : value.disconnected ? <div className='w-full flex items-center justify-center'>
                                <p className='bg-red-600 text-white p-[5px] rounded-lg'>{value.disconnected}</p></div> : value.socketid === server.id ? <div className='w-full flex items-center justify-end'>
                                <div className='bg-gray-800 w-[10cm]  rounded-lg p-[20px] text-white flex flex-col gap-[10px]'>
                                    <p className='text-cyan-500'>You</p>
                                    <div className='flex w-full flex-col justify-center gap-[10px]'>

                                    <p>{value.message}</p>
                                    <p className='text-gray-300 text-sm'>{value.time}</p>
                                    </div>
                                </div>
                               </div>:  <div className='w-full flex items-center justify-start'>
                                <div className='bg-gray-800 w-[10cm] p-[10px] rounded-lg text-white flex flex-col gap-[10px]'>
                                    <p className='text-cyan-500'>{value.whoSended}</p>
                                    <div className='flex w-full flex-col justify-center gap-[10px]'>

                                    <p>{value.message}</p>
                                    <p className='text-gray-300 text-sm'>{value.time}</p>
                                    </div>
                                </div>
                               </div>
                    ))}
                </div>

                <div className='w-full px-[20px] rounded-full h-[10%] flex bg-gray-900 border-2 border-cyan-500'>
                    <input value={input_value} onChange={message} type="text" placeholder='send message' className='w-[90%] h-full outline-none bg-transparent text-white' />
                    <button onClick={send_message} className='w-[10%] h-full flex items-center justify-center text-green-500'> <Send/> </button>
                </div>
            </div>
        </div>
    )
}
