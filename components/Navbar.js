"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState } from "react"


const Navbar = () => {
  const [showdropdown, setshowdropdown] = useState(false)
  const { data: session } = useSession()

  return (
    <nav className='fixed  w-full z-50  flex justify-center bg-slate/60 backdrop-blur-lg md:justify-between md:px-4 items-center  flex-col md:flex-row '>
      <Link href={"/"}>
      <div className="logo text-lg text-white underline font-bold flex items-center">
        <span><img src="/tea.gif"width={40} alt="" /></span>
        GetMeAChai$</div>
      </Link>

      <div className="nav-links relative ">
    {session && <>
    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"onClick={()=>setshowdropdown(!showdropdown)} onBlur={()=>{setTimeout(() => { setshowdropdown(false);
      
    }, 300);}}
            className="relative inline-flex items-center justify-center md:px-5 text-sm font-semibold text-white rounded-xl  bg-size-[200%_200%] animate-gradient  hover:scale-[1.03] transition-all duration-300 focus:outline-none  focus:ring-cyan-400/40">
            Welcome:- {session.user.email}
             <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroklinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
          </button>


<div id="dropdown" className={`z-10 ${showdropdown?"":"hidden"} absolute right-0 rounded-base shadow-lg bg-slate-950/90 backdrop-blur-5xl w-full rounded-2xl`}>
    <ul className="text-sm text-body font-medium text-center" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link href={"/"}> <button
            className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-xl  bg-size-[200%_200%] animate-gradient   hover:scale-[1.03] transition-all duration-300 focus:outline-none  focus:ring-cyan-400/40">
            Home
          </button></Link>
      </li>
      <li>
        <Link href={"/dashboard"}>
          <button
            className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-xl  bg-size-[200%_200%] animate-gradient   hover:scale-[1.03] transition-all duration-300 focus:outline-none  focus:ring-cyan-400/40">
            Dashboard
          </button></Link>
      </li>
      <li>
        <Link href={`/${session.user.name}`}> <button
            className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-xl  bg-size-[200%_200%] animate-gradient   hover:scale-[1.03] transition-all duration-300 focus:outline-none  focus:ring-cyan-400/40">
            Your Page
          </button></Link>
      </li>
      
      
      <li>
        <Link href={"/login"}> <button onClick={() => { signOut() }}
            className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-xl  bg-size-[200%_200%] animate-gradient   hover:scale-[1.03] transition-all duration-300 focus:outline-none  focus:ring-cyan-400/40">
            Logout
          </button></Link>
      </li>
    </ul>
</div>
</>}




       
        {!session &&
          <Link href={"/login"}>
            <button
              className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-slate-950 via-blue-800 to-indigo-900 bg-size-[200%_200%] animate-gradient  hover:scale-[1.03] transition-all duration-300 focus:outline-none  focus:ring-cyan-400/40">
              Login
            </button></Link>}
      </div>
    </nav>
  )
}

export default Navbar
