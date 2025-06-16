const Workout=require('../models/WorkoutModel')
const mongoose=require('mongoose')

//func to get all workouts
const getAllWorkouts=async(req,res)=>{
    const user_id=req.user._id
    const workout=await Workout.find({user_id}).sort({createdAt:-1}) //find all workouts with reps=10 and sort them according to the created at time in descending order
    res.status(200).json(workout)

}
//func to get a single workout
const getWorkout=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findById(id)
    if(!workout) return res.status(404).json({error:'Workout not found'})
    res.status(200).json(workout)
}
//func to create a new workout
const createWorkout=async(req,res)=>{
    const {title,setnumber,reps,load}=req.body

    //handling errors
    let emptyFields=[]
    if(!title){
        emptyFields.push('title')
    }
    if(!setnumber){
        emptyFields.push('setnumber')
    }
     if(!reps){
        emptyFields.push('reps')
    }
     if(!load){
        emptyFields.push('load')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Fill out all the fields',emptyFields})
    }
    //add doc to database
    try{
            const user_id=req.user._id
            const workout=await Workout.create({title,setnumber,reps,load,user_id})
            res.status(200).json(workout)
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
       res.json({message:'Post a new workout'})
}


const deleteWorkout=async(req,res)=>{
const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout) return res.status(404).json({error:'No such workout'})
        res.status(200).json(workout)
}

const updateWorkout=async(req,res)=>{
    const{id}=req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout=await Workout.findByIdAndUpdate({_id:id},{
     ...req.body
    })
    if(!workout){
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)

}

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
}