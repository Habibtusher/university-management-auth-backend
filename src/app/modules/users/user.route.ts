import express from 'express'
import { UserController } from './user.controllers'

const router = express.Router()

router.post('/create-user', UserController.createUser)
router.get('/get-users', UserController.getUsers)

export const UserRoutes = router
