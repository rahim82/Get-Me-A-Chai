"use client"
import { SessionProvider } from "next-auth/react"

export default function sessionWraper({children}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}