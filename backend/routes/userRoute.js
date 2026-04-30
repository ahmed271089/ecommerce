import express from 'express'
import { register,login,getMe } from '../controllers/usersController.js'




const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/profile',getMe)





export default router



