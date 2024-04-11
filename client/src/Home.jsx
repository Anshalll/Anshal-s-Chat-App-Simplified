
import React, { useState } from 'react'
import Chat from './components/Chat'
export default function Home() {
  const [MessageState, setMessageState] = useState(false)
  const [Errors , setErrors] = useState()
  const [username, setusername] = useState("")

  const input_value = (e) =>{
    setusername(e.target.value)
  }


  const Register_user  = () =>{
    if (username.trim() !== "") {
        setMessageState(true)
    }
    else{
      setErrors("Username is required")
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center bg-black justify-center'>
      {MessageState? <Chat username={username}/> : <div className='w-[40%] p-[20px] bg-gray-900 text-white rounded-lg flex flex-col gap-[20px]'>
        {Errors? <p className='text-red-500'>{Errors}</p> : "" }
      <label htmlFor="username">Username</label>
      <input id='username' onChange={input_value} type="text" className='w-full rounded-full p-[15px] text-white bg-gray-800 outline-none focus:border-2 focus:border-cyan-500' />
      <button onClick={Register_user} className='text-black bg-green-500 rounded-full p-[10px]'>Register</button>
</div>  }
          
    </div>
  )
}
