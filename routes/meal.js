import express from 'express'
import Meal from '../models/meal.js'


const router = express.Router()


router.get(`/`,async (req, res) => {

    try{

        const mealList = await Meal.find()

        if (!mealList){

            return res.send(mealList)
        }

        return res.send(mealList)

    }catch(e){

        console.log(e)

    }

})


export default router