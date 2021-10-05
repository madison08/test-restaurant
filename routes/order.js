import express from 'express'
import Order from '../models/order.js'
import Meal from '../models/meal.js'


const router =  express.Router()



router.get('/', async (req, res) => {


    const orderList = await Order.find().populate('meals user')
    
    if (!orderList){

        return res.send(orderList)
    }

    return res.send(orderList)

})




router.post('/', async (req, res) =>{

    try{

        const mealsItemID = req.body.meals.map( mealItem =>{
        
            return mealItem
        })
    
    
        let orders = new Order({
            meals: mealsItemID,
            address: req.body.address,
            phone: req.body.phone,
            status: req.body.status,
            user: req.body.user
        })

        await orders.save()
    
        res.send(orders)
    }catch(e){
        console.log(e)
    }
    
})


router.get('/:id', async (req, res) => {

    try{

        const order = await Order.findById(req.params.id)

        if(!order){
            return res.status(404).send('order not found')
        }

        return res.send(order)

    }catch(e){

        console.log(e)

    }

})




router.put('/:id', async (req, res) =>{


    try{

        const order = await Order.findById(req.params.id)

        if(!order){

            return res.status(404).send('order not found')
        }

        const mealsItemID = req.body.meals.map( mealItem =>{
        
            return mealItem
        })

        const orderFind = await Order.findByIdAndUpdate(
            req.params.id,
            {
                meals: mealsItemID,
                address: req.body.address,
                phone: req.body.phone,
                status: req.body.status,
                user: req.body.user
            },
            { new: true }
        )

        res.send(orderFind)


    }catch(e){

        console.log(e)

    }

})




router.delete('/:id', async (req, res) =>{


    Order.findByIdAndRemove(

        Order.findByIdAndRemove(req.params.id).then(order => {
            if(order){
                return res.status(200).json({success: true, message: 'order deleted !'})
            }else{
                return res.status(404).json({success: false, message: 'order not found'})
            }
        }).catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    )

})

export default router