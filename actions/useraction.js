"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import { connectDB } from "@/db/connectDB"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()

    let user = await User.findOne({ username: to_username })
    const secret = user.razorpay_key_secret

    var instance = new Razorpay({ key_id: user.razorpay_key_id, key_secret: secret })
    let options = {
        amount: Number(amount) * 100,
        currency: "INR",

    }
    let x = await instance.orders.create(options)
    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
    })
    return x;
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username }).lean()
    return JSON.parse(JSON.stringify(u))
}

export const fetchpayments = async (username) => {
    await connectDB()
    // find all payments sorted by decreeasing order of amount

    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return JSON.parse(JSON.stringify(p))
}

export const updateProfile = async (data, oldusername) => {
    await connectDB();
    let ndata = data;

    //if the username is being updated,check if username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exist" }
        }
        await User.updateOne({ email: ndata.email }, ndata);
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })

    }
    else {

        await User.updateOne({ email: ndata.email }, ndata);
    }


}