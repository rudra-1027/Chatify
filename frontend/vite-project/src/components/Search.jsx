import React, { useState } from 'react'
import { TextInput } from 'flowbite-react'
import SearchList from './SearchList';
import Tab from './Tab';
function Search() {
  const [data,setdata]=useState([])
 async function handle(txt){
   
    const res=await fetch(`/auth/search?q=${txt}`)
    const d=await res.json();
    setdata(d);
    

  }
  return (
    <div className='h-screen flex flex-col bg-gradient-to-b from-[#0b0616] via-[#12091f] to-[#0a0a14]'>
      <div className="shrink-0  ">
      
      <TextInput className='dark' id="username3" placeholder="username" addon="@" onChange={(e) => handle(e.target.value)} required /></div>
        <div className='flex-1 overflow-y-auto px-4'>
          <SearchList user={data}/>
        </div>
        <div className='shrink-0'>
        <Tab/>
        </div>
    
    </div>
  )
}

export default Search
