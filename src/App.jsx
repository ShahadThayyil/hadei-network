import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import SuccessfulLogin from './pages/auth/SuccessfulLogin'

// FIXED IMPORT: Directing the routing path to your newly rewritten ClientWelcomePage layout file

import ClientOnboarding from './pages/client/ClientOnboarding' 


// Freelancer Pre-Dashboard Pages
import FreelancerOnboarding from './pages/freelancer/FreelancerOnboarding'
import FreelancerTutorials from './pages/freelancer/FreelancerTutorials'
import FreelancerVideoPlayer from './pages/freelancer/FreelancerVideoPlayer'

// Freelancer Dashboard Pages
import FreelancerLayout from './pages/freelancer/FreelancerLayout'
import FreelancerHome from './pages/freelancer/FreelancerHome'
import ProjectDetails from './pages/freelancer/ProjectDetails'
import MyProjects from './pages/freelancer/MyProjects'
import RequestCoworker from './pages/freelancer/RequestCoWorker'
import FreelancerChats from './pages/freelancer/FreelancerChats'
import JobStatus from './pages/freelancer/JobStatus'
import Collaboration from './pages/freelancer/Collaboration'
import CollaborationDetails from './pages/freelancer/CollaborationDetails'
import MyPostedCollabs from './pages/freelancer/MyPostedCollabs'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/login-success" element={<SuccessfulLogin />} />

        {/* Onboarding Pipeline */}
        <Route path="/client/onboarding" element={<ClientOnboarding />} />

        {/* Client Dashboard Render Target */}
        {/* Client Routes */}
       

      
        // {/* Freelancer Pre-Dashboard Routes */}
        <Route
          path="/freelancer/onboarding" 
          element={<FreelancerOnboarding />} 
        />
        <Route 
          path="/freelancer/tutorial" 
          element={<FreelancerTutorials />} 
        />
        <Route 
          path="/tutorial/watch/:id" 
          element={<FreelancerVideoPlayer />} 
        />

      {/* Freelancer Dashboard Routes (Nested) */}
<Route path="/freelancer/dashboard" element={<FreelancerLayout />}>
  
  {/* Automatically redirect the base dashboard path to /home */}
  <Route index element={<Navigate to="home" replace />} />
  
  {/* Main Dashboard Pages */}
  <Route path="home" element={<FreelancerHome />} />
  
  {/* Job Details Page */}
  <Route path="home/jobs/:id" element={<ProjectDetails />} />
  <Route path="projects" element={<MyProjects />} />
  <Route path="projects/request-coworker/:id" element={<RequestCoworker />} />
<Route path="messages" element={<FreelancerChats />} />
<Route path="messages/:chatId" element={<FreelancerChats />} />
<Route path="job-status" element={<JobStatus />} />
<Route path="collaboration" element={<Collaboration />} />
<Route path="collaboration/:collabId" element={<CollaborationDetails />} />
<Route path="posted-collabs" element={<MyPostedCollabs />} />
  {/* <Route path="profile" element={<FreelancerProfile />} /> */}
  {/* <Route path="messages" element={<FreelancerMessages />} /> */}
  {/* <Route path="status" element={<FreelancerStatus />} /> */}
  {/* <Route path="other-jobs" element={<FreelancerDiscover />} /> */}
  {/* <Route path="my-jobs" element={<FreelancerMyJobs />} /> */}
  {/* <Route path="payments" element={<FreelancerWallet />} /> */}
  
</Route>

        {/* Catch-all fallback routing configuration */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}