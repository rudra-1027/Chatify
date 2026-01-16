import React from 'react'
import {  Button, Modal, ModalBody,  ModalHeader } from "flowbite-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


function Profile(props) {
  const [data,setdata]=useState([]);
  const [loaded,setloaded]=useState(false)
  async function getStatus(){
    const res=await fetch("/auth/getStatus",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({friendId:props.setProfile.userId})})
    const d=await res.json();
    setdata(d);
    setloaded(true)
  }

  if (props.open && !loaded) {
    getStatus();
  }


  async function handle(){
    const res=await fetch("/auth/addFrd",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({friendId:props.setProfile.userId})})
    const d=await res.json();
    setdata(d);
  }
   
  return (
    <div>
      <AnimatePresence>
      <Modal  className='dark transition duration-300 ease-in-out text-white ' dismissible show={props.open} onClose={() => {
      props.onClose();
      setloaded(false); // reset for next open
    }} onshow={getStatus}>
      <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
        <ModalHeader className=' bg-[#140b22]
    border-b border-[#24113f]
     [&>button]:text-gray-300
    [&>button]:transition-all
    [&>button]:duration-200
    [&>button]:transform

    [&>button:hover]:scale-110
    [&>button:hover]:text-white
    [&>button:hover]:bg-transparent
    [&>button:focus]:ring-0'><div className='text-white'>Profile</div></ModalHeader>
        <ModalBody className='bg-[#140b22]'>
          
          <div className="space-y-6 flex justify-center">
            <div className="max-w-sm">
      
      <div className="flex flex-col items-center pb-10">
        
        <div className="w-40 h-40 rounded-full overflow-hidden cursor-pointer">
  <img src={props.setProfile.profile} alt="User" className="w-full h-full object-cover" />
</div>

        <h5 className="mb-1 text-xl font-medium text-white">{props.setProfile.user}</h5>
        <span className="text-sm text-gray-400">{props.setProfile.bio}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <Button
            onClick={handle}
            className="  inline-flex items-center rounded-lg px-4 py-2 text-center text-sm font-medium text-white  hover:bg-[#7f4cf5]  bg-[#8b5cf6] focus:ring-0 focus:outline-none focus:shadow-none active:ring-0"
          >
            {data.status}
          </Button>
           {/* <Button color="dark">Message</Button> */}
           
        </div>
      </div>
    </div>
          </div>
        </ModalBody>
        </motion.div>
      </Modal>
       </AnimatePresence>
    </div>
  )
}

export default Profile
