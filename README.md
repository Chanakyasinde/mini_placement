# Mini-Placement Portal

A comprehensive web application designed to bridge the gap between students and recruiters, streamlining the campus placement process. This portal enables companies to post job openings and manage applications, while allowing students to showcase their profiles, upload resumes, and apply for jobs seamlessly.

---

## 🚀 Features

### 🎓 For Students
- **User Authentication**: Secure Sign Up and Login functionality.
- **Profile Management**: Create and update professional profiles with details like college, CGPA, and skills.
- **Resume Management**: Upload and share resume links.
- **Job Discovery**: Browse and filter verified job postings based on skills and preferences.
- **Application Tracking**: Monitor the status of job applications (Pending, Shortlisted, Rejected).

### 🏢 For Recruiters
- **Talent Search**: Access a database of public student resumes.
- **Applicant Management**: View and manage students who have applied to specific job postings.
- **Skill Filtering**: Filter candidates based on specific skill sets.
- **Job Management**: Create and publish detailed job descriptions, including roles, stipends, and required skills.

### 🔑 Key Highlights
- **Role-Based Access Control (RBAC)**: Distinct dashboards and permissions for Students and Companies.
- **Skill Matching**: Intelligent filtering to match candidates with job requirements.
- **Secure Data**: JWT-based authentication ensures data privacy and security.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs

### Deployment
- **Frontend**: Vercel
- **Backend**: Render

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL installed and running

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mini-placement-portal.git
cd mini-placement-portal
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/mini_placement?schema=public"
JWT_SECRET="your_super_secret_key"
```

Run database migrations:
```bash
npx prisma migrate dev --name init
```

Start the backend server:
```bash
npm start
# OR for development
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173` (or similar).

---

## 📊 ERP Diagram

Visualize the database schema and relationships:
[View ERP Diagram](https://dbdiagram.io/d/68f638ed2e68d21b4154e6f0)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.
