import { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import SignupBody from './components/SignupBody'
import Login from './components/Login';
import SetProfile from './components/SetProfile';
import Home from './components/Home';
import Search from './components/Search';
import Chat from './components/Chat';



function App() {
    function verify(){
      return document.cookie.includes("token=");

    }
    function Protected({children}){
      if(!verify()){
        window.location.href='/login'
      }
      return children;
    }

  return (

   
    <Routes>
      <Route path="/" element={<SignupBody />} />
        <Route path="/login" element={<Login />} />
         <Route path="/SetProfile" element={<Protected><SetProfile /></Protected>} />
         <Route path="/home" element={<Protected><Home /></Protected>} />
         <Route path='/search' element={<Protected><Search/></Protected>} />
         <Route path='/chat' element={<Protected><Chat/></Protected>} />
    </Routes>

   
  )
}

export default App
