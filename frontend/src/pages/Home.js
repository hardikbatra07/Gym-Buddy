import { useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from '../hooks/useAuth'
//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/Workoutform"
const Home=()=>{
    const {workouts,dispatch}=useWorkoutsContext()
    const {user}=useAuthContext()
    useEffect(()=>{
        const fetchWorkouts=async()=>{
            const response=await fetch('/api/workouts',{
            headers:{
                 'Authorization':`Bearer ${user.token}`
            }
          })
            const json=await response.json()

            if(response.ok){
               dispatch({type:'SET_WORKOUTS',payload:json})
            }
        }
        if(user){
        fetchWorkouts()
        }
    },[dispatch,user])
    return(
        <div className="home">
            <div className="workouts">
               {workouts && workouts.length > 0 ? (
  workouts.map((workout) => (
    <WorkoutDetails key={workout._id} workout={workout}/>
  ))
) : (
  <p>No workouts found</p>
)}

            </div>
             <WorkoutForm/>
        </div>
    )
}
export default Home