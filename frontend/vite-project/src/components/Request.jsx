import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";


function Request({ frdList = [], open, onClose }) {
  async function handle(frd) {
    onClose()
    const res = await fetch('/auth/acceptFrd', { method: 'post', headers: { "content-type": "application/json" }, body: JSON.stringify({ frd }) })
    
  }
  async function reject(frd) {
    onClose()
    const res = await fetch('/auth/rejectFrd', { method: 'post', headers: { "content-type": "application/json" }, body: JSON.stringify({ frd }) })
    
  }
  return (
    <div>
      <AnimatePresence>

        <Modal className='dark transition duration-300 ease-in-out ' dismissible show={open} onClose={() => {
          onClose();
          // reset for next open
        }} >
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
    [&>button:focus]:ring-0'><div className='text-white'>Friend Requests</div></ModalHeader>
            <ModalBody className='bg-[#140b22] max-h-[65vh] overflow-y-auto no-scrollbar'>
             {frdList.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="text-gray-400 text-sm">No friend requests here</p>
    </div>
  ) : (

              <ul className="divide-y divide-gray-700">
                {frdList.map((u) => (
                  <li className="py-3 sm:py-4 border-hidden">
                    <div className="flex items-center space-x-4"  >
                      <div className="shrink-0">

                        <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
                          <img src={u.profile} alt="User" className="w-full h-full object-cover" />
                        </div>

                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{u.user}</p>
                        <p className="truncate text-sm text-gray-400">{u.email}</p>

                      </div>
                      <div className='flex space-x-2'>
                        <Button
                          onClick={() => handle(u)}
                          className="   inline-flex items-center rounded-lg px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#7f4cf5]  bg-[#8b5cf6] focus:ring-0 focus:outline-none focus:shadow-none active:ring-0 "
                        >accept</Button> <Button  onClick={() => reject(u)} className='bg-[#24113f] hover:bg-gray-600 text-white  hover:bg-[#411e72] focus:ring-0 focus:outline-none focus:shadow-none active:ring-0'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></Button>
                      </div>
                    </div>

                  </li>
                ))}

              </ul>

  )}
            </ModalBody>
          </motion.div>
        </Modal>


      </AnimatePresence>



    </div>
  )
}

export default Request
