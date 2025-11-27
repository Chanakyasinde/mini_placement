import React,{useEffect,useState} from 'react'
import { use } from 'react'

export default function StudentDashboard(){
  const [info,setInfo] = useState([])

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("studentToken")
      const res = await fetch('http://localhost:3000/student/dashboard', {
        method:'GET',
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setInfo(data)
      console.log("Recieved Data:", data)
    }
    getData()
  },[])
  return (
    <>
    <div>
      StudentDashboard
    </div>
    </>

  )
}
