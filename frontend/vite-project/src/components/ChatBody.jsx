import React,{ useEffect, useState } from 'react'
import { Label, Textarea,Footer, Button } from "flowbite-react";
import { Toast } from "flowbite-react";
import { FaTelegramPlane } from "react-icons/fa";
import socket from '../socket';
import { HiMail } from "react-icons/hi";
import Chat from './Chat';
import { motion, AnimatePresence } from "framer-motion"


function ChatBody({chatId,userId,message}) {
  const messageVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
}
 
  const [data,setdata]=useState([])
  useEffect(()=>{
    
    message.map((m)=>( setdata((prev) => [...prev,m])))
    socket.connect();
    socket.emit("join chat",chatId);
    socket.on("new message",({message})=>{
      setdata((prev) => [...prev, message])
    })
    return ()=>{
      socket.off("new message")
    }
  },[chatId])
  function sendMsg(){
    const message=document.getElementById("message").value.trim();
   if (!message) return
    socket.emit("send message",{chatId,message});
      
    document.getElementById("message").value="";
  
  }
  return (
    <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 space-y-3 sm:space-y-4 no-scrollbar">
      

          { data.map((d,i)=>(
            <motion.div
      key={d._id || i}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`flex ${
        d.senderId === userId ? "justify-end" : "justify-start"
      }`}
    >
  
      <div
        className={` max-w-[85%] sm:max-w-[65%]
          transition hover:brightness-110
          px-4 py-2.5
          rounded-2xl
          text-sm sm:text-base
          break-words whitespace-pre-wrap
          ${(d.senderId==userId) 
            ? "bg-[#1f2937] text-white rounded-br-md" 
            : "bg-[#4f46e5] text-white rounded-bl-md"}
        `}
      >
        {d.text}
      </div>
       </motion.div>
))}
    </div>
           
     <div className="shrink-0 sticky bottom-0  p-3 flex gap-2 items-center">
        <Textarea
          id="message"
          placeholder="Type a message..."
          className="bg-[#1f2937] border-0 w-full resize-none min-h-[44px] max-h-32 rounded-xl text-white text-sm sm:text-base focus:!ring-0 focus:!outline-none"
        />
        <Button
          onClick={sendMsg}
          className="h-[44px] w-[44px] p-0 flex items-center justify-center rounded-xl focus:ring-0 focus:outline-none active:ring-0"
        >
          <FaTelegramPlane className="h-5 w-5 text-white rotate-45 hover:-rotate-12 transition-all duration-200" />
        </Button>
      </div>

    </div>
  )
}

export default ChatBody
