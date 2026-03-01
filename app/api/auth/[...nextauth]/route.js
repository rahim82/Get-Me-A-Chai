import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import { connectDB } from '@/db/connectDB'

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET, // Check your .env file (removed typo 'SECRETE')
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
  try {
    await connectDB()

    if (!user?.email) {
      console.log("No email from GitHub")
      return false
    }

    let existingUser = await User.findOne({ email: user.email })

    if (!existingUser) {
      await User.create({
        email: user.email,
        username: profile?.login || user.email.split("@")[0],
        razorpay_key_id: "",
        razorpay_key_secret: "",
      })
    }

    return true
  } catch (error) {
    console.error("SIGNIN ERROR:", error)

    // Duplicate key error ko allow kar do
    if (error.code === 11000) {
      return true
    }

    return false
  }
},

    async session({ session, user, token }) {
      // Ensure DB is connected for the session check as well
      await connectDB()

      // CRITICAL FIX: Use User.findOne, not user.find (lowercase 'user' is the NextAuth object, uppercase 'User' is your model)
      const dbUser = await User.findOne({ email: session.user.email })

      if (dbUser) {
        session.user.name = dbUser.username
        // You can also attach the ID here if needed
        // session.user.id = dbUser._id 
      }

      return session
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }