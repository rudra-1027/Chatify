import React, { useRef, useState } from 'react'
import { Card,Label,FileInput,TextInput,Textarea,Checkbox,Button, Avatar} from "flowbite-react";
import Login from './Login';

function SetProfile() {
    const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff";
    const[file,setImage]=useState(DEFAULT_AVATAR);
    const imgref=useRef();
    function upload(){
        //console.log(document.getElementById("imgfile").getAttribute('ref'));
        imgref.current.click();
    }
    
    const handleFile=(e)=>{
        const img=e.target.files[0];
        if(!img) {setImage(DEFAULT_AVATAR);}
        else{
            setImage(URL.createObjectURL(img));
        }
        
    };
  return (
<div className="dark min-h-screen bg-[#1a1a2e] bg-[radial-gradient(circle_at_20%_20%,_rgba(255,100,150,0.25),_transparent_60%),_radial-gradient(circle_at_80%_80%,_rgba(150,100,255,0.25),_transparent_60%)] flex justify-center items-center">
       <div>
<div className=" 

        w-lvw max-w-lg
        bg-[#181824] 
        rounded-3xl 
        shadow-[0_0_25px_rgba(255,100,200,0.3)]
        p-10
        backdrop-blur-xl
        border border-white/10
        
      ">
<Button onClick={()=>window.location.href="/home"} className='p-8 focus:ring-0 focus:outline-none focus:shadow-none active:ring-0'>               <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path></svg>
</Button>
      <form className='grid p-8 gap-8' action="/auth/setProfile" method='post' encType="multipart/form-data">
        <div className='flex justify-center '>
         <div className="  w-40 h-40 rounded-full overflow-hidden  justify-center cursor-pointer" onClick={upload}>
  <img src={file} alt="User" className="w-full h-full  object-cover"  />
</div></div>
          <div className="flex w-full items-center justify-center hidden">
     
        
        <input type='file' id="imgfile" name="imgurl" ref={imgref} className="hidden" onChange={handleFile} />
      
    </div>
        <div className='py-3'>
          <div className="mb-2 block ">
            <Label htmlFor="email1">Your Name</Label>
          </div>
          <TextInput id="email1" name="user" type="text" placeholder="name" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Bio</Label>
          </div>
           <Textarea id="comment" name='bio' placeholder="Leave a bio..." required rows={4} />
    </div>
        
        <Button type="submit" className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
      Setup Profile!</Button>
      </form>
    </div>
      </div>
    </div>
  )
}

export default SetProfile
