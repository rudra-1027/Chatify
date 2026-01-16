import React from 'react'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
function ChatNav({chatId,friend}) {
  return (
    <div>
      
         <Navbar fluid rounded className='  bg-[#0e081b] border-b border-[#24113f]'  >
            <NavbarBrand href="/home">
            <Button className='px-2 focus:ring-0 focus:outline-none focus:shadow-none active:ring-0'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg></Button>
<div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
  <img src={friend.profile} alt="UserFrd" className="w-full h-full object-cover" />
</div>              
            </NavbarBrand>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">{friend.user}</span>
          </Navbar>
    </div>
  )
}

export default ChatNav
