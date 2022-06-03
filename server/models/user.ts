import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 10 },

    password: { type: String, required: false, min: 8, max: 18},

    email: { type: String, required: true, unique: true, min: 14 },

    createdAt: { type: Date, default: new Date() },

    isAdman: { type: Boolean, default: false }
})

const user = mongoose.model('user', userSchema)

export default user