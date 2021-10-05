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


router.get('/:id', async (req, res) => {

    try{

        const meal = await Meal.findById(req.params.id)

        if(!meal){
            return res.status(404).send('meal not found')
        }

        return res.send(meal)

    }catch(e){

        console.log(e)

    }

})


router.post('/', async (req, res) => {


    try{

        let meal = new Meal({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        })

        await meal.save()

        return res.send(meal)


    }catch(e){

        console.log(e)

    }

})



router.put('/:id', async (req, res) =>{


    try{

        const meal = await Meal.findById(req.params.id)

        if(!meal){

            return res.status(404).send('user not found')
        }

        const mealFind = await Meal.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            },
            { new: true }
        )

        res.send(mealFind)


    }catch(e){

        console.log(e)

    }

})



router.delete('/:id', async (req, res) =>{


    Meal.findByIdAndRemove(

        Meal.findByIdAndRemove(req.params.id).then(meal => {
            if(meal){
                return res.status(200).json({success: true, message: 'meal deleted !'})
            }else{
                return res.status(404).json({success: false, message: 'meal not found'})
            }
        }).catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    )

})





export default router