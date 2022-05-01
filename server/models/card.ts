import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    title: String,
    price: Number,
    pieces: Number,
    desc: String,
    type: String,
    img: String,
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const card = mongoose.model('card', cardSchema)

export default card

