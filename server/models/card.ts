import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true, min: 3, max: 10},
    price: { type: Number, required: true},
    pieces: { type: Number, required: true},
    desc: { type: String, required: true, min: 12, max: 100},
    type: { type: String, required: true, min: 3, max: 10},
    img: { type: String, required: true},

    createdAt: {
        type: Date,
        default: new Date()
    },

    discounts: {
        type: Number, default: 0
    },

    comments: {
        type: [{
            name: { type: String, required: true },
            email: { type: String, required: true },
            _id: { type: String, required: true }
        }], 
        default: []
    },

    payment: { 
        type: [{
            name: { type: String, required: true },
            email: { type: String, required: true },
            _id: { type: String, required: true }
        }], 
        default: []
    },

    likes: {
        type: [{
            name: { type: String, required: true },
            email: { type: String, required: true },
            _id: { type: String, required: true }
        }],
        default: []
    }
})

const card = mongoose.model('card', cardSchema)

export default card

