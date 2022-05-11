import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    password: { type: String, required: true, unique: true, min: 8 },

    email: { type: String, required: true, unique: true },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const user = mongoose.model('user', userSchema)

export default user