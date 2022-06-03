import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    sendAt: {
        type: Date,
        default: new Date()
    },
    items: {
        type: [
            {
                _id: { type: String, required: true },
                q: { type: Number, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                title: { type: String, required: true }
            }
        ],
    },
    user: {
        type: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            _id: { type: String, required: true }
        }
    },
    total: {
        type: Number,
        required: true
    }
})


const payment = mongoose.model('payment', paymentSchema)

export default payment