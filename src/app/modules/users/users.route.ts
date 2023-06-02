import express from 'express'
import userController from './users.controllers'
const router = express.Router()

router.post('/create-user', userController.createUser)
router.get('/get-users', userController.getUsers)

export default router
