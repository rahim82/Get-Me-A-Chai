import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import payment from "@/models/Payment";
import { connectDB } from "@/db/connectDB";
import Razorpay from "razorpay";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB();



    let body = await req.formData();
    body = Object.fromEntries(body);

    /// check razorpayid is presnt at server
    let p = await payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ error: "Order Not Found" }, { status: 404 });
    }
    let user = await User.findOne({ username: p.to_user })
    const secret = user.razorpay_key_secret
    // verify payment 
    const isValid = validatePaymentVerification({
        "order_id": body.razorpay_order_id,
        "payment_id": body.razorpay_payment_id
    },
        body.razorpay_signature,
        secret);
    if (!isValid) {
        return NextResponse.json({ error: "Invalid Payment Verification" }, { status: 400 });
    }
    // update payment status
    else {

        const updatedPayment = await payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true });
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
    }


}