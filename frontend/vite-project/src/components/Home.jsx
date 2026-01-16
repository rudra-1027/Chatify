import React,{ useEffect,useState }  from 'react'
import Tab from './Tab'
import Nav from './Nav'
import ChatList from './ChatList'
function Home() {
  const [data,setdata]=useState({userInfo: [],frdInfo: [],frdStatus:[]});
  async function get(){
      const res=await fetch("/auth/getChatList",{method:"POST",headers:{"content-type":"application/json"}});
      const d=await res.json();
      setdata(d);
      
  }

  useEffect(()=>{get();
                const interval=setInterval(()=>{
                  get()
                },30000)
return () => clearInterval(interval);
  },[])
  return (
   
      
      <div className="h-screen flex flex-col bg-gradient-to-b from-[#0b0616] via-[#12091f] to-[#0a0a14]"> 
     
      <div className="shrink-0">
        <Nav  user={data.userInfo} />
      </div>

      
      <div className="flex-1 overflow-hidden  px-4 ">
        <ChatList mainUser={data.userInfo} user={{frdInfo:data.frdInfo,frdStatus:data.frdStatus}} />
      </div>

      
      <div className="shrink-0">
        <Tab />
      </div>
    </div>
    
  )
}

export default Home
