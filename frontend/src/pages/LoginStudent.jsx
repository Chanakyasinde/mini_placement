import React,{useState} from 'react'

export default function LoginStudent(){
  const [name,setName] = useState('')
  
  return (
    <div>
        <h1>Login page</h1>
        <input
        placeholder='Enter your email'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        <input
        placeholder='Enter your email'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        
    </div>
  )
}
