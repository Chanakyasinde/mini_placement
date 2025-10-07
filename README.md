#  Mini-Placement Portal


**Overview**
 This project aims to implement a bridge between students and recrutiers to make the recruitment process easy and simple. The portal allows companies to post jobs, students to apply with resumes, and placement coordinators to manage shortlisting pipelines and deadlines.

---

## Features

1. Students -
   
   - Sign up/Login
   - Resume made public
   - create and update profile
   - filter jobs
   - apply to vertified job postings
   - Track application status (Pending, Shortlisted, Rejected)
   - Apply jobs before the deadline.
  
2. Recruiters -

   - Fill the form and get verified by the admin.
   - Get access to see the public resumes.
   - Get access to the students applied to the company.
   - Filter the students based upon the skills.
   - Post Job openings.
   - Edit the deadline to apply for the company.
   - Post job description.

3. Admin -

   - Approve the recruiters.
   - Manage the students who can apply for jobs according to the cgpa.
   - The companies are divided by phases on the basis of stipend and how big the           company is.
  
  ## KEY FEATURES

  
- **Job Posts** – Companies can create and publish job openings with details (role, CTC, skills, deadline).  
- **Shortlisting Pipeline** – Track candidates through stages: *Applied → Shortlisted → Interview → Selected*.  
- **Resume Management** – Students upload and share resume links (Drive/PDF/portal-hosted).  
- **Skill Matching** – Jobs specify required skills; candidates are filtered based on resumes/skills.  
- **Deadline Management** – Admins set application deadlines; system auto-closes expired posts.  
- **Role-Based Access** – Separate dashboards for Students, Companies, and Placement Cell/Admin.  

---

##  Tech Stack

- **Frontend:** React.js 
- **Backend:** Node.js + Express.js  
- **Database:** MySQL  
- **Authentication:** JWT / OAuth  
- **Deployment:** Vercel  

---

##  Workflow

1. **Admin/Placement Cell** creates job posts with requirements and deadlines.  
2. **Students** register, upload resumes, and apply for jobs.  
3. **Companies** view applicants, shortlist based on skills/resumes, and update candidate status.  
4. **Pipeline** manages the candidate journey from application to selection.  

---
## ERP Diagram

Link - https://dbdiagram.io/d/68dc1a6bd2b621e422a5b666
