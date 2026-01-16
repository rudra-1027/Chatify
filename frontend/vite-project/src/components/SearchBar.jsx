import React from 'react'
import { Label, TextInput } from "flowbite-react";
function SearchBar({value,onChange}) {
  return (
    <div>
        <div className="max-w-md">
      <div className="mb-2 block">
      
      </div>
      <TextInput className='dark' id="username3" placeholder="username" value={value} onChange={(e)=>onChange(e.target.value)} addon="@"  />
    </div>
    </div>
  )
}

export default SearchBar
