import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuth";
const WorkoutForm=()=>{
    const {dispatch}=useWorkoutsContext()
    const [title,setTitle]=useState('')
    const [setnumber,setSetno]=useState('')
    const [reps,setReps]=useState('')
    const [load,setLoad]=useState('')
    const [error,setError]=useState('')
    const [emptyFields,setEmptyFields]=useState([])
    
     const {user}=useAuthContext()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        
        if(!user){
            setError('You must be logged in')
            return
        }

        const workout={title,setnumber,reps,load}
        const response=await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                 'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields || []);
        }
        if(response.ok){
            setTitle('')
            setSetno('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added',json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Workout Title:</label>
            <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title')?'error':''}
            />

            <label>Load (in kg):</label>
            <input
            type="number"
            onChange={(e)=>setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load')?'error':''}
            />

            <label>Set Number:</label>
            <input
            type="number"
            onChange={(e)=>setSetno(e.target.value)}
            value={setnumber}
            className={emptyFields.includes('setnumber')?'error':''}
            />

            <label>Number of Reps:</label>
            <input
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps')?'error':''}
            />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm