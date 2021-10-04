import express from 'express'
import Order from '../models/order.js'
import Meal from '../models/meal.js'


const router =  express.Router()



router.get('/', async (req, res) => {


    const orderList = await Order.find()
    
    if (!orderList){

        return res.send(orderList)
    }

})







export default router