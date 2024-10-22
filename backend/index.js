//importing modules
import express from 'express'
import sequelize from 'sequelize'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import db from './models/index.js'
import router from './router/userRoutes.js'
import cors from 'cors';

//setting up your port
// const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow sending cookies
}));
dotenv.config();

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync().then(() => {
  console.log('Database synchronized');
})

//routes for the user API
app.use('/api/users', router)

//listening to server connection
app.listen(3000, () => console.log(`Server is connected on 3000`))