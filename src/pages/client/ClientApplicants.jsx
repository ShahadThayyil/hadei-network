import { useState } from 'react'
import { CheckCircle2, Star, Award, ShieldAlert, ArrowLeft, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ClientApplicants() {
  const navigate = useNavigate()
  
  // Client's currently posted jobs (For the dropdown)
  const postedJobs = [
    { id: 'CON-2026-88', title: 'Senior React Developer for SaaS Dashboard' },
    { id: 'CON-2026-89', title: 'MERN Stack Developer for E-commerce MVP' }
  ]

  const [selectedJobId, setSelectedJobId] = useState(postedJobs[0].id)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  // Dummy Applicants separated by job
  const allApplicants = {
    'CON-2026-88': [
      {
        id: 'usr-1', name: 'Aman Sharma', role: 'Senior React Developer', experience: '5 Years', rating: 4.9, verified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        skills: ['React', 'Node.js', 'Tailwind'],
        coverLetter: "I have built similar SaaS dashboards previously and can deliver this within 3 weeks with high performance."
      },
      {
        id: 'usr-2', name: 'Priya R.', role: 'Frontend UI Engineer', experience: '3 Years', rating: 4.7, verified: false,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        skills: ['React', 'CSS', 'Figma'],
        coverLetter: "I specialize in translating Figma designs into pixel-perfect React components."
      }
    ],
    'CON-2026-89': [
      {
        id: 'usr-3', name: 'Rahul V.', role: 'Full Stack Engineer', experience: '7 Years', rating: 5.0, verified: true,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80',
        skills: ['MongoDB', 'Express', 'Node.js'],
        coverLetter: "I run a small boutique team and can guarantee enterprise-level code quality for your MVP."
      }
    ]
  }

  const currentApplicantsList = allApplicants[selectedJobId] || []

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-gray-50/30 text-black font-sans overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-6">
        
        {/* Header & Job Selector */}
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-4">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Review Applicants</h1>
              <p className="text-sm text-gray-500 mt-1">Review proposals and select talent for your jobs.</p>
            </div>
            
            <div className="w-full md:w-80">
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Showing Applicants For:</label>
              <div className="relative">
                <select 
                  value={selectedJobId} 
                  onChange={(e) => { setSelectedJobId(e.target.value); setSelectedApplicant(null); }}
                  className="w-full border border-gray-300 p-2.5 rounded-sm text-sm font-bold outline-none focus:border-black bg-white appearance-none pr-8 cursor-pointer"
                >
                  {postedJobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
                <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Applicant Feed */}
        <div className="flex flex-col gap-4">
          {currentApplicantsList.map((user) => (
            <div key={user.id} className={`bg-white border ${selectedApplicant === user.id ? 'border-black shadow-md' : 'border-gray-200'} rounded-sm p-6 flex flex-col md:flex-row gap-6 hover:border-gray-400 transition-all`}>
              
              <div className="flex items-start gap-4 flex-1">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover bg-gray-100 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    {user.verified && <CheckCircle2 size={16} className="text-blue-500 fill-blue-50" />}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{user.role} • {user.experience}</p>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-500 mb-3">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" /> {user.rating} Success Rate
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {user.skills.map((skill, i) => <span key={i} className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">{skill}</span>)}
                  </div>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-sm border border-gray-100 italic">"{user.coverLetter}"</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 md:min-w-[200px]">
                <button className="bg-white border border-gray-300 text-black px-4 py-2 rounded-sm text-xs font-bold hover:bg-gray-50 transition-colors w-full">View Full Profile</button>
                <button 
                  onClick={() => setSelectedApplicant(user.id)} 
                  className={`px-4 py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors w-full ${selectedApplicant === user.id ? 'bg-gray-200 text-gray-500 cursor-default' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  <Award size={14}/> {selectedApplicant === user.id ? 'Selected' : 'Select Freelancer'}
                </button>
                
                {selectedApplicant === user.id && (
                  <div className="mt-2 text-[9px] text-orange-700 bg-orange-50 border border-orange-200 p-2.5 rounded-sm flex items-start gap-1.5 shadow-sm">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                    <span>Sent to Admin for Verification. Escrow and Chat will unlock once approved.</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}