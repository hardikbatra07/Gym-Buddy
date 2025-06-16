const express=require('express')
const router=express.Router()
const {
   getAllWorkouts,
   getWorkout,
   createWorkout,
   deleteWorkout,
   updateWorkout,
}=require('../Controllers/workoutcontroller')
const requireAuth=require('../middleware/requireAuth')
router.use(requireAuth)
//Creating Requets handlers onto the router
//Get all workouts
router.get('/', getAllWorkouts)

//Get a single workout
router.get('/:id',getWorkout)

//Post a new workout
router.post('/',createWorkout)
   

//Delete  a workout
router.delete('/:id',deleteWorkout)
  
//Update a workout
router.patch('/:id',updateWorkout)
 
module.exports=router