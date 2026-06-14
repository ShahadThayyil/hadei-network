import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Briefcase,
  AlertCircle,
  Clock
} from 'lucide-react'

export default function MyPostedCollabs() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // -----------------------------
  // MOCK DATA: POSTED JOBS & APPLICANTS
  // -----------------------------
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 'pj-1',
      title: 'Frontend UI Integration for E-commerce',
      description: 'Need another frontend developer to help me integrate the product listing and checkout flows. The backend API is already complete.',
      deadline: 'Nov 10, 2026',
      status: 'Active',
      postedAt: '2 days ago',
      applicants: [
        {
          id: 'app-101',
          name: 'Rahul K.',
          role: 'React Specialist',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
          match: '95%'
        },
        {
          id: 'app-102',
          name: 'Priya Sharma',
          role: 'Frontend Developer',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
          match: '88%'
        }
      ]
    },
    {
      id: 'pj-2',
      title: 'Backend API Optimization',
      description: 'My current queries are too slow for the scale of data the client is expecting. Need a backend specialist to write optimized raw SQL queries.',
      deadline: 'Oct 30, 2026',
      status: 'Active',
      postedAt: '5 days ago',
      applicants: [
        {
          id: 'app-103',
          name: 'David Chen',
          role: 'Backend Architect',
          avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
          match: '99%'
        }
      ]
    },
    {
      id: 'pj-3',
      title: 'Figma to React Native (3 Screens)',
      description: 'Translate the Wallet, Settings, and Profile screens from Figma into pixel-perfect React Native components.',
      deadline: 'Nov 05, 2026',
      status: 'Active',
      postedAt: '1 week ago',
      applicants: []
    }
  ])

  // -----------------------------
  // LOGIC
  // -----------------------------
  const filteredJobs = postedJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApprove = (jobId, applicantId, applicantName) => {
    // In a real app, this would trigger an API call to assign the sub-job
    console.log(`Approved ${applicantName} for job ${jobId}`)
    alert(`You have approved ${applicantName} for this collaboration!`)
    
    // Optimistic UI update: Remove the job or mark it as filled
    setPostedJobs(prev => prev.filter(job => job.id !== jobId))
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Posted Collaborations</h1>
          <p className="text-sm text-gray-500 mt-1">Review applications from other freelancers for sub-jobs you have posted.</p>
        </div>

        {/* ==================== SEARCH BAR ==================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your posted jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm pl-10 pr-4 py-3 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* ==================== POSTED JOBS GRID ==================== */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10 items-start">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col h-full"
              >
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase size={12} /> Sub-Job
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-sm uppercase tracking-wider">
                      {job.status}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Clock size={12} /> {job.postedAt}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-black leading-tight mb-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm font-bold text-black mb-6 bg-gray-50 w-fit px-3 py-1.5 rounded-sm border border-gray-100">
                  <Calendar size={16} className="text-gray-400" /> 
                  Deadline: {job.deadline}
                </div>

                <div className="w-full h-px bg-gray-200 mb-6"></div>

                {/* Applicants Section */}
                <div className="flex-1 flex flex-col">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Users size={14} /> Applied Freelancers ({job.applicants.length})
                  </h4>

                  {job.applicants.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {job.applicants.map(applicant => (
                        <div key={applicant.id} className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          
                          {/* Applicant Info */}
                          <div className="flex items-center gap-3">
                            <img 
                              src={applicant.avatar} 
                              alt={applicant.name} 
                              className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                              <p className="text-sm font-bold text-black flex items-center gap-2">
                                {applicant.name}
                                <span className="text-[9px] bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                                  {applicant.match} Match
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 font-medium">{applicant.role}</p>
                            </div>
                          </div>

                          {/* Applicant Actions */}
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button 
                              onClick={() => console.log('View Profile for', applicant.id)}
                              className="flex-1 sm:flex-none bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-sm text-xs font-bold hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center gap-1.5"
                            >
                              Details <ExternalLink size={12} />
                            </button>
                            <button 
                              onClick={() => handleApprove(job.id, applicant.id, applicant.name)}
                              className="flex-1 sm:flex-none bg-black text-[#F5F216] px-4 py-2 rounded-sm text-xs font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
                            >
                              Approve <CheckCircle2 size={14} />
                            </button>
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    /* No Applicants State */
                    <div className="flex flex-col items-center justify-center py-6 bg-gray-50 border border-gray-100 border-dashed rounded-sm">
                      <p className="text-sm font-medium text-gray-500 italic">No applications yet.</p>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State for Jobs */
          <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-sm bg-gray-50/50 text-center px-4">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <AlertCircle className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">No posted jobs found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              You haven't posted any collaboration requests yet, or your search didn't match any results.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}