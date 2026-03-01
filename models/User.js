import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
       
    },
    username: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        
    },
    image: {
        type: String,
    },
    sml: {
        type: String,
    },
    bio: {
        type: String,
    },
    razorpay_key_id: {
        type: String,
        
    },
    razorpay_key_secret: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.models.User || model("User", userSchema);
export default User;


