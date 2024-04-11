import React from 'react'

export default function Sidebar({ Onlineusers , server , Totalusers }) {

  return ( 
    <div className='w-[30%] flex flex-col gap-[20px] bg-gray-900 h-full p-[20px]'>
      
        <p className='text-cyan-500 text-lg h-[10%] w-full flex items-center '>Online Users {Totalusers}</p>
        <hr />
        <div className='h-full w-full text-white overflow-y-auto flex flex-col gap-[20px]'>
         {Onlineusers.map((value, index) =>{

          return  <p key={index}>{value.userID !== server.id ? value.username : "" }</p>
         })}
        </div>
    </div>
  )
}

