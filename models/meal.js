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



const Meal = mongoose.model('Meal', mealSchema)

export default Meal