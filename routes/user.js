import express from 'express'
import User from '../models/user.js'


const router = express.Router()


// recuperer tous les utilisateur
router.get(`/`, async (req, res)=>{

    try{

        const userList = await User.find()

        if(!userList){
            return res.send(userList)
        }

        return res.send(userList)


    }catch(e){

        console.log(e)

    }

})


// recuperer un utilisateur par son id
router.get('/:id', async (req, res) => {

    try{

        const user = await User.findById(req.params.id)

        if(!user){
            return res.status(404).send('user not found')
        }

        return res.send(user)

    }catch(e){

        console.log(e)

    }

})


// enregistrer un utilisateur
router.post('/register', async (req, res) => {


    try{

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        })

        await user.save()

        return res.send(user)


    }catch(e){

        console.log(e)

    }

})

// mettre a jour un utilisateur
router.put('/:id', async (req, res) =>{


    try{

        const user = await User.findById(req.params.id)

        if(!user){

            return res.status(404).send('user not found')
        }

        const userFind = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone
            },
            { new: true }
        )

        res.send(userFind)


    }catch(e){

        console.log(e)

    }

})

// suppression d'un utilisateur

router.delete('/:id', async (req, res) =>{


    User.findByIdAndRemove(

        User.findByIdAndRemove(req.params.id).then(user => {
            if(user){
                return res.status(200).json({success: true, message: 'user deleted !'})
            }else{
                return res.status(404).json({success: false, message: 'user not found'})
            }
        }).catch(err => {
            return res.status(400).json({success: false, error: err})
        })
    )

})





export default router