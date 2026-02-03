"use client"
import React, { useEffect, useState } from 'react'
import { fetchuser, updateProfile } from '@/actions/useraction'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const { data: session, update } = useSession()
  const [form, setform] = useState({ name: "", username: "", email: "", bio: "", sml: "", image: "", razorpay_key_id: "", razorpay_key_secret: "" })
  useEffect(() => {
    document.title = "Dashboard-Get Me A Chai"
    if (session?.user?.name)
      getdata()
  }, [session])




  const getdata = async () => {
    let u = await fetchuser(session.user.name)

    if (u) {
      setform({
        name: u.name || "",
        username: u.username || "",
        email: u.email || "",
        bio: u.bio || "",
        sml: u.sml || "",
        image: u.image || "",
        razorpay_key_id: u.razorpay_key_id || "",
        razorpay_key_secret: u.razorpay_key_secret || ""
      })
    }
  }

  const handlechange = async (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      let a = await updateProfile(form, session.user.name)
      toast('Profile updated', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await update()
    } catch (error) {
      toast.error("Failed to update profile")
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/*welcome dashboard page*/}
      <div className="flex items-center flex-col">
        <div className="welcome text-center mt-30">
          <h1 className='text-4xl font-bold'>Welcome to your Dashboard</h1>
          <p className='text-gray-400 mx-4 mt-2'>Here you can manage your profile, view earnings, and customize your settings.</p>
        </div>
        <form className="inputes w-[40vw] mt-10" onSubmit={handlesubmit} >
          <div className="mb-2">
            <label className="text-sm">Name</label>
            <input value={form.name ? form.name : ""} onChange={handlechange} type="text" name='name' id='name' placeholder='Enter your name' className='w-full p-2 rounded-lg bg-slate-800 text-white' />
          </div>
          <div className="mb-2">
            <label className="text-sm">Username</label>
            <input value={form.username ? form.username : ""} onChange={handlechange} type="text" name='username' id='username' placeholder='Enter your Username' className='w-full p-2 rounded-lg bg-slate-800 text-white' />
          </div>
          <div className="mb-2  ">
            <label className="text-sm">Email</label>
            <input value={form.email ? form.email : ""} onChange={handlechange} type="email" name='email' id='email' placeholder='Enter your Email' className='w-full p-2 rounded-lg bg-slate-800 text-white' />
          </div>
          <div className="mb-2  ">
            <label className="text-sm">Bio</label>
            <input value={form.bio ? form.bio : ""} onChange={handlechange} type="text" name='bio' id='bio' placeholder='Update your profile bio' className='w-full p-2 rounded-lg bg-slate-800 text-white' />

          </div>
          <div className="mb-2 ">
            <label className="text-sm">Social media link</label>
            <input value={form.sml ? form.sml : ""} onChange={handlechange} type="text" name='sml' id='sml' placeholder='Add social media link' className='w-full p-2 rounded-lg bg-slate-800 text-white' />

          </div>
          <div className="mb-2 ">
            <label className="text-sm">Profile Image</label>
            <input value={form.image ? form.image : ""} onChange={handlechange} type="text" name='image' id='image' className='w-full p-2 rounded-lg bg-slate-800 text-white' />

          </div>
          <div className="mb-2  ">
            <label className="text-sm">Razorpay id</label>
            <input value={form.razorpay_key_id ? form.razorpay_key_id : ""} onChange={handlechange} type="text" name='razorpay_key_id' id='razorpay_key_id' placeholder='RazorPay Id' className='w-full p-2 rounded-lg bg-slate-800 text-white' />
          </div>
          <div className="mb-2  ">
            <label className="text-sm">Razorpay secret</label>
            <input value={form.razorpay_key_secret ? form.razorpay_key_secret : ""} onChange={handlechange} type="text" name='razorpay_key_secret' id='razorpay_key_secret' placeholder='RazorPay Secrete' className='w-full p-2 rounded-lg bg-slate-800 text-white' />
          </div>
          <div className='flex justify-center'>
            <button className=' px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 w-full '>Save</button>

          </div>
        </form>
      </div>
    </>
  )
}

export default Page
