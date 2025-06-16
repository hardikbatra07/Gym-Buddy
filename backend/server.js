require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const workoutRoutes=require('./routes/workouts')
const userRoutes=require('./routes/user')

//express app
const app=express()

//middleware
app.use(express.json()) //To pass the data or body to the request handlers or routes with the request
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


// //routes
// //taking requests and giving responses
// app.get('/',(req,res)=>{
//     res.json({message:'Welcome to my app'})
// })

//calling from workout.js(routes)
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

//connecting to database
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    //listen to requests
app.listen(process.env.PORT,()=>{
    console.log('Connected to database & Listening to port 4000')
})
  })
  .catch((error)=>{
    console.log(error)
  })
