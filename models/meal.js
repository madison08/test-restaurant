import mongoose from 'mongoose'


const mealSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }


})



const User = mongoose.model('User', userSchema)

export default User