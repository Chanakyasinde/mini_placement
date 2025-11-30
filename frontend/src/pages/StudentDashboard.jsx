import React,{useEffect,useState} from 'react'

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
  const handleClick = async () => {
    const token = localStorage.getItem("studentToken")
    const res = await fetch('http://localhost:3000/student/apply',{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        jobId: 2
      })
    })
    const response = await res.json()
    console.log("handleClick",response)
  }
  return (
    <>
    <div>
      student dadsdasbdhsbnds
      <div onClick={handleClick}>click chey babai</div>
    </div>
    </>

  )
}
