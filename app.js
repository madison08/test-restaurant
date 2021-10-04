import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import userRouter from './routes/user.js'
import mealRouter from './routes/meal.js'
import orderRouter from './routes/order.js'


const app = express()


const swaggerJs = YAML.load("./api.yaml") 

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJs))
app.use(express.json())
app.use(cors())


app.use(`/user`, userRouter)
app.use(`/meal`, mealRouter)
app.use(`/order`, orderRouter)





mongoose.connect('mongodb://localhost:27017', {
    dbName: 'cie-restaurant-database'
}).then(() =>{
    console.log('[DATABSE] is connected')
})
.catch((err) =>{
    console.log(err)
})






app.listen('3000', ()=> {

    console.log('[server] running on 3000')

})

