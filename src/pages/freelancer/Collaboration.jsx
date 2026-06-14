import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Clock, 
  Users,
  Briefcase,
  AlertCircle,
  UserCheck
} from 'lucide-react'

export default function Collaboration() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  // -----------------------------
  // MOCK DATA: COLLABORATION JOBS
  // -----------------------------
  const [collabJobs] = useState([
    {
      id: 'cj-1',
      title: 'Frontend UI Integration for E-commerce',
      posterName: 'Alex Mercer',
      posterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      budgetCut: '30%',
      type: 'Fixed Price',
      deadline: 'Nov 10, 2026',
      timeLeft: '5 hours, 30 mins',
      isClosed: false,
      postedAt: '2 hours ago',
      maxApplicants: 10,
      appliedCount: 4,
      description: 'I need another frontend developer to help me integrate the product listing and checkout flows. The backend API is already complete. Looking to split the workload to meet a tight deadline.'
    },
    {
      id: 'cj-2',
      title: 'Backend API Optimization',
      posterName: 'Priya Sharma',
      posterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      budgetCut: '40%',
      type: 'Milestone Based',
      deadline: 'Oct 30, 2026',
      timeLeft: '2 days',
      isClosed: false,
      postedAt: '5 hours ago',
      maxApplicants: 5,
      appliedCount: 2,
      description: 'My current queries are too slow for the scale of data the client is expecting. Need a backend specialist to write optimized raw SQL queries and implement Redis caching.'
    },
    {
      id: 'cj-3',
      title: 'GSAP Scroll Animations',
      posterName: 'Jordan Lee',
      posterAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
      budgetCut: '15%',
      type: 'Hourly',
      deadline: 'Oct 25, 2026',
      timeLeft: '0 mins',
      isClosed: true,
      postedAt: '1 day ago',
      maxApplicants: 15,
      appliedCount: 12,
      description: 'The layout is fully built, but the client wants complex, physics-based scroll animations (pinning, horizontal scroll sections). Need an animation expert to knock this out.'
    },
    {
      id: 'cj-4',
      title: 'Figma to React Native (3 Screens)',
      posterName: 'Nadia Hassan',
      posterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      budgetCut: '25%',
      type: 'Fixed Price',
      deadline: 'Nov 05, 2026',
      timeLeft: '45 mins',
      isClosed: false,
      postedAt: '2 days ago',
      maxApplicants: 8,
      appliedCount: 8, // Full
      description: 'I am handling the logic and API integration, but I need someone to translate the Wallet, Settings, and Profile screens from Figma into pixel-perfect React Native components.'
    }
  ])

  // -----------------------------
  // LOGIC
  // -----------------------------
  const filteredJobs = collabJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboration Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Browse sub-jobs and co-worker requests posted by other freelancers.</p>
        </div>

        {/* ==================== SEARCH ==================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm pl-10 pr-4 py-3 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* ==================== JOB GRID ==================== */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10 items-stretch">
            {filteredJobs.map((job) => {
              const isFull = job.appliedCount >= job.maxApplicants
              const isUnavailable = isFull || job.isClosed

              return (
                <div 
                  key={job.id} 
                  className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col h-full transition-colors"
                >
                  {/* Header: Poster Info & Time */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <img 
                        src={job.posterAvatar} 
                        alt={job.posterName} 
                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200"
                      />
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Posted by</p>
                        <h4 className="text-sm font-bold text-black leading-none">{job.posterName}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">
                      <Clock size={12} /> {job.postedAt}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 flex flex-col mb-6">
                    <h3 className="text-xl font-bold text-black leading-tight mb-3">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Meta Details Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Amount</p>
                      <p className="text-lg font-black text-black leading-none">{job.budgetCut}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Type</p>
                      <p className="text-sm font-bold text-black">{job.type}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Project Deadline</p>
                      <p className="text-sm font-bold text-black">{job.deadline}</p>
                    </div>
                  </div>

                  {/* Application Limits Grid */}
                  <div className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-sm mb-6 bg-white">
                    <div className="flex items-center gap-2">
                      <UserCheck size={14} className="text-gray-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Applicants</span>
                        <span className={`text-xs font-bold ${isFull ? 'text-red-600' : 'text-black'}`}>
                          {job.appliedCount} / {job.maxApplicants}
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-px h-6 bg-gray-200"></div>

                    <div className="flex items-center gap-2">
                      <Clock size={14} className={`text-gray-400 ${job.isClosed ? 'text-red-400' : ''}`} />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Time Left</span>
                        <span className={`text-xs font-bold ${job.isClosed ? 'text-red-600' : 'text-black'}`}>
                          {job.isClosed ? 'Closed' : job.timeLeft}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3 mt-auto">
                    <button 
                      onClick={() => navigate(`/freelancer/dashboard/collaboration/${job.id}`)}
                      className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-sm text-sm font-bold hover:bg-gray-50 hover:text-black transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => console.log('Apply clicked for', job.id)}
                      disabled={isUnavailable}
                      className={`flex-1 py-3 rounded-sm text-sm font-bold transition-colors text-center ${
                        isUnavailable 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200' 
                          : 'bg-black text-[#F5F216] hover:bg-gray-800'
                      }`}
                    >
                      {job.isClosed ? 'Closed' : isFull ? 'Applications Full' : 'Apply Now'}
                    </button>
                  </div>

                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-sm bg-gray-50/50 text-center px-4">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Users className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">No collaboration requests found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              There are currently no sub-jobs matching your search criteria. Check back later!
            </p>
          </div>
        )}

      </div>
    </div>
  )
}