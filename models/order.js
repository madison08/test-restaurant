import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({


    meals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true
    }],

    address: {
        type: "string",
        required: true
    },

    phone: {
        type: "string",
        required: true
    },
    status: {
        type: "string",
        required: true,
        default: "En attente"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
    


})



const Order = mongoose.model('Order', orderSchema)

export default Order