import React from 'react'
import Paymentpage from '@/components/paymentpage'
import { notFound } from 'next/navigation'
import { connectDB } from '@/db/connectDB'
import User from '@/models/User'

const Page = async ({ params }) => {
  const { username } = await params
  await connectDB()
  let u = await User.findOne({ username: username })
  if (!u) {
    return notFound()
  }


  return (
    <>
      <Paymentpage username={username} />
    </>
  )
}


export default Page


export const metadata = {
  title: 'Support-Get Me A Chai',
  description: '...',
}
