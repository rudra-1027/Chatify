import React from 'react'
import {
  Avatar,
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
import SearchBar from './SearchBar';
import  ChatifyLogo  from '../assets/favicon.svg';



function Nav({user}) {
     

  return (
   <Navbar fluid rounded className='dark  bg-[#0e081b] border-b border-[#24113f]' >
      <NavbarBrand href="/home">
<img src={ChatifyLogo} alt="CHATIFY" className="h-10 mr-3  w-auto" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
           
            <div className="  w-16 h-16 rounded-full overflow-hidden  justify-center cursor-pointer">
  <img src={user.profile} alt="UserName" className="w-full h-full  object-cover"  />
</div>
          }
          className='dark'
        >
          <DropdownHeader>
            <span className="dark block text-sm">{user.user}</span>
          </DropdownHeader>
          <DropdownItem onClick={()=>window.location.href="/SetProfile"} className='dark'>Edit Profile</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={()=>window.location.href="/logout"} className='dark'>Sign out</DropdownItem>
        </Dropdown>
        
      </div>
      
    </Navbar>
  )
}

export default Nav
