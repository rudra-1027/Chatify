import React, { useState } from 'react'
import { Button } from 'flowbite-react'
import Profile from './Profile';


function SearchList({user}) {
 
  const [isToggle,toggleProfile]=useState(false);
  const [userProfile,SetUser]=useState(null)
  
  
  return (
     <div >
      <div className="flow-root">
        <ul className="divide-y divide-gray-700">
          {user.map((u)=>(
             <li className="py-3 sm:py-4 border-hidden">
            <div className="flex items-center space-x-4" onClick={()=>{SetUser(u);toggleProfile(true);}}>
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
  <img src={u.profile} alt="User" className="w-full h-full object-cover" />
</div>

              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{u.user}</p>
                <p className="truncate text-sm text-gray-400">{u.email}</p>
              </div>
            </div>
            <div>
          
         </div>
          </li>
            ))}
         
        </ul>
        {isToggle && userProfile && (
         <Profile open={isToggle} setProfile={userProfile} onClose={()=>toggleProfile(false)}/>
        )}
      </div>
    </div>
  )
}

export default SearchList
