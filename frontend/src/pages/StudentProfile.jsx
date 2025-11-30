import React from 'react'
import { useEffect,useState } from 'react'

export default function StudentProfile(){
    const [studentData,setStudentData] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem('studentToken')
        const getData = async()=>{
            const res = await fetch('http://localhost:3000/student/dashboard',{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const response = await res.json()
            setStudentData(response.data)
        }
        getData()
    },[])
    const handleSubmitChange = async () => {
        const token = localStorage.getItem('studentToken')
        const res = await fetch('http://localhost:3000/student/dashboard/profile',{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
    }
    const handleChange = (e) => {
        const {name,value} = e.target
        setStudentData((prevData)=>({
            ...prevData,
            [name]: value
        }))
    }
  return (
    <div>StudentProfile</div>
  )
}
