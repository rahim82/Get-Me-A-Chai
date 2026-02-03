"use client"
import React, { useEffect } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useraction'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments } from '@/actions/useraction'
import { searchParams, useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react'

const paymentpage = ({ username }) => {

    const [paymentform, setpaymentform] = useState({ name: "", amount: "", message: "" })
    const [currentuser, setcurrentuser] = useState({});
    const [payments, setpayments] = useState([]);
    const searchParams = useSearchParams()
    const { data: session, update } = useSession()
    useEffect(() => {
        getdata();
    }, [])
    const toastShown = useRef(false);
    useEffect(() => {
        if (searchParams.get("paymentdone") == "true" &&   !toastShown.current) {
             toastShown.current = true;
            toast('ThankYou for your support', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
    }, [session])

    const handlechange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getdata = async (params) => {
        let u = await fetchuser(username);
        setcurrentuser(u);
        let dbpayments = await fetchpayments(username);
        setpayments(dbpayments);


    }

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderid = a.id
        var options = {
            "key": currentuser.razorpay_key_id, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Gate me a chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderid, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();



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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className="bgimg w-full relative">
                <img className='w-full h-60' src="/giphy.webp" alt="" />
                <div className='profpic  border rounded-full absolute -bottom-15 left-1/2 -translate-x-1/2'>
                    <img className='w-30 h-30 object-cover border rounded-full' src={currentuser.image} alt="" />
                </div>
            </div>
            <div className="mt-14">
                <h2 className='text-3xl font-bold text-center mt-10'>Creator Profile</h2>
                <p className='text-center text-sm text-gray-400'>Join to support #{username} </p>
                <p className='text-center text-sm text-gray-400'>{payments.length} payments.</p>

            </div>
            <div className="payment text-white mx-auto  flex-col md:flex-row justify-center items-center mt-5 flex gap-4  w-3/4">

                <div className='makePayment bg-slate-800 w-full md:w-1/2 p-4  rounded-lg text-center h-62.5'>
                    <h3>Make Payment</h3>
                    <form action="" className='flex flex-col gap-2 mt-4 '>
                        {/* inpute name */}
                        <input required onChange={handlechange} value={paymentform.name} name="name" type="text" placeholder='Your Name' className='py-1 px-3 rounded-lg bg-slate-700 text-white' />
                        <input required onChange={handlechange} value={paymentform.amount} name="amount" type="text" placeholder='Enter Amount' className='py-1 px-3 rounded-lg bg-slate-700 text-white' />
                        <input onChange={handlechange} value={paymentform.message} name="message" type="text" placeholder='Message (Optional)' className='py-1 px-3 rounded-lg bg-slate-700 text-white' />
                        <button disabled={paymentform.name?.length < 3 || paymentform.amount?.length < 1} className=' disabled:bg-slate-800 bg-slate-900  px-4 py-1  font-bold rounded-lg hover:bg-slate-400 transition-all duration-200' type='button' onClick={() => pay(paymentform.amount)}>Pay
                        </button>
                        <div className="amounts flex justify-center gap-3">
                            <button disabled={paymentform.name?.length < 3} className='px-4 bg-slate-900 rounded-lg hover:bg-slate-600 transition-all duration-200' type='button' onClick={() => pay(10)}>₹10</button>
                            <button disabled={paymentform.name?.length < 3 } className='px-4 bg-slate-900 rounded-lg hover:bg-slate-600 transition-all duration-200' type='button' onClick={() => pay(20)}>₹20</button>
                            <button disabled={paymentform.name?.length < 3 } className='px-4 bg-slate-900 rounded-lg hover:bg-slate-600 transition-all duration-200' type='button' onClick={() => pay(50)}>₹50</button>
                        </div>

                    </form >

                </div>
                <div className='bg-slate-800 w-full md:w-1/2 p-4  rounded-lg flex flex-col justify-start items-start h-62.5'>
                    <h3 className='text-2xl font-bold mb-3'>Supporters </h3>
                    <ul className='w-[90%] md:ml-10 text-slate-400  space-y-2 h-50 overflow-y-auto pr-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-900 [&::-webkit-scrollbar-thumb]:bg-slate-600 
    [&::-webkit-scrollbar-thumb]:rounded-full'>
                        {payments.length == 0 && <li>No payments yet</li>}

                        {payments.map((p, i) => {
                            return <li key={i} className='flex items-center text-sm  gap-x-1'><img className='w-5 h-5' src="/avatar.gif" alt="" /><span> {p.name} send <span className='font-bold text-white'>₹{p.amount}</span> with message "{p.message}" </span></li>
                        })}

                    </ul>
                </div>
            </div>

        </>
    )
}

export default paymentpage
