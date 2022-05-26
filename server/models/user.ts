import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    password: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    createdAt: { type: Date, default: new Date() },

    img: { type: String, required: false },

    payment: { type: [String], default: [] },

    likes: { type: [String], default: [] },
    
    isAdman: { type: Boolean, default: false }
})

const user = mongoose.model('user', userSchema)

export default user