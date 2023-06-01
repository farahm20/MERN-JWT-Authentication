import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 4000
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

connectDB()
const app = express()
//to parse raw json
app.use(express.json())
//to send form data
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.get('/', (req, res) => res.send('Server ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server up and running on port ${port}. `))
