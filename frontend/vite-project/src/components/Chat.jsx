import React, { useEffect, useState } from 'react'
import ChatNav from './ChatNav'
import ChatBody from './ChatBody'
import socket from '../socket'
import { useLocation, useNavigate } from 'react-router'


function Chat() {
 const [data,setdata]=useState({mainUser:[],user:[],chatId:[],message:[]})
 const location=useLocation();
 const navigate=useNavigate();
 useEffect(()=>{
   if(!location.state){
  navigate('/home');
  return null;
 }
  setdata(location.state)

 },[location.state,navigate])

  
  


  return (
     <div className="relative h-screen w-full flex justify-center  ">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0616]" />
        <div className="absolute inset-0 opacity-[0.1] bg-[repeating-linear-gradient(0deg,#5B21B6 0 2px,transparent 2px 8px)] bg-[repeating-linear-gradient(90deg,#0891B2 0 2px,transparent 2px 8px)]" />
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-[#5B21B6]/20 rounded-lg blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-[15%] right-[8%] w-[300px] h-[300px] bg-[#0891B2]/20 rounded-lg blur-[100px] animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#ffffff0a_1px,transparent 0)] bg-[size:4px_4px]" />

      </div>

      <div className="flex flex-col w-full  h-screen">
        
        
        <div className="shrink-0 sticky top-0 z-10">
          <ChatNav chatId={data.chatId} friend={data.user} />
        </div>

        
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <ChatBody
            chatId={data.chatId}
            userId={data.mainUser.userId}
            message={data.message}
          />
        </div>

      </div>
    </div>
    
  )
}

export default Chat
