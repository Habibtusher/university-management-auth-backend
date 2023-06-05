import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//!application routes
app.use('/api/v1/users', UserRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use(globalErrorHandler)
export default app
