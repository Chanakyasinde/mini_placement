import React,{useEffect,useState} from 'react'
import { use } from 'react'

export default function StudentDashboard(){
  const [info,setInfo] = useState([])
  const [jobsdata,setJobsdata] = useState([])

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
      const jobsAvail = await fetch('http://localhost:3000/student/dashboard/jobsStudent',{
        method: 'GET',
      })
      const jobsInfo = await jobsAvail.json()
      const data = await res.json()
      setInfo(data)
      setJobsdata(jobsInfo)
      console.log("Recieved Data:", data)
      console.log("Jobs Data:", jobsInfo)
    }
    getData()
  },[])
  return (
    <>
    <div>
      student dadsdasbdhsbnds
      <div></div>
    </div>
    </>

  )
}
