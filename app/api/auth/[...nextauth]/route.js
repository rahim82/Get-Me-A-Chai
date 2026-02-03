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
      clientSecret: process.env.GITHUB_SECRET // Check your .env file (removed typo 'SECRETE')
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        await connectDB()

        try {
          // Check if user exists
          const currentUser = await User.findOne({ email: user.email })

          if (!currentUser) {
            // Create a new user
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
              razorpay_key_id: "",
              razorpay_key_secret: "",
            })
            // CRITICAL FIX: You must save the user to the database
            await newUser.save()
          }
          return true;
        } catch (error) {
          console.error("Error saving user to DB:", error);
          return false;
        }
      }
      return true
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