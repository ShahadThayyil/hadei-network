import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Calendar, 
  Users, 
  Briefcase,
  AlertCircle,
  Clock,
  Building,
  Edit3,
  ChevronRight
} from 'lucide-react'

export default function MyPostedCollabs() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All') // 'All', 'Active', 'Closed'

  // -----------------------------
  // MOCK DATA: POSTED JOBS & APPLICANTS
  // -----------------------------
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 'pj-1',
      title: 'Frontend UI Integration for E-commerce',
      parentProject: 'E-commerce Website Redesign',
      clientName: 'TechNova Solutions',
      description: 'Need another frontend developer to help me integrate the product listing and checkout flows. The backend API is already complete.',
      deadline: 'Nov 10, 2026',
      status: 'Active',
      postedAt: '2 days ago',
      applicants: [
        { id: 'app-101', name: 'Rahul K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
        { id: 'app-102', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
        { id: 'app-103', name: 'Arjun M.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' }
      ]
    },
    {
      id: 'pj-2',
      title: 'Backend API Optimization',
      parentProject: 'SaaS Analytics Dashboard',
      clientName: 'HealthSync',
      description: 'My current queries are too slow for the scale of data the client is expecting. Need a backend specialist to write optimized raw SQL queries.',
      deadline: 'Oct 30, 2026',
      status: 'Active',
      postedAt: '5 days ago',
      applicants: [
        { id: 'app-104', name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop' }
      ]
    },
    {
      id: 'pj-3',
      title: 'Figma to React Native (3 Screens)',
      parentProject: 'Fintech Mobile App MVP',
      clientName: 'FinFlow Inc.',
      description: 'Translate the Wallet, Settings, and Profile screens from Figma into pixel-perfect React Native components.',
      deadline: 'Nov 05, 2026',
      status: 'Closed',
      postedAt: '1 week ago',
      applicants: []
    }
  ])

  // -----------------------------
  // LOGIC
  // -----------------------------
  const filteredJobs = postedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.parentProject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'All' || job.status === activeTab

    return matchesSearch && matchesTab
  })

  const tabs = ['All', 'Active', 'Closed']

  return (
    <main className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight">My Posted Collaborations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your sub-jobs and review applied freelancers.</p>
        </header>

        {/* ==================== TABS & SEARCH ==================== */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-1">
          
          {/* Tabs */}
          <nav className="flex items-center gap-6 overflow-hidden custom-scrollbar" aria-label="Job Status Tabs">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-colors relative whitespace-nowrap ${
                  activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab}
                {activeTab === tab && <div className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-black rounded-t-sm" />}
              </button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center pb-3 md:pb-0">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="search" 
                placeholder="Search jobs or parent projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm pl-9 pr-4 py-2 text-sm outline-none focus:border-black transition-colors"
                aria-label="Search your posted jobs"
              />
            </div>
          </div>

        </section>

        {/* ==================== POSTED JOBS GRID ==================== */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10 items-start">
            {filteredJobs.map((job) => (
              <article 
                key={job.id} 
                className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col h-full  transition-colors"
              >
                {/* Job Header */}
                <header className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                      job.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {job.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> {job.postedAt}
                    </span>
                  </div>
                  <button 
                    onClick={() => navigate(`/freelancer/dashboard/posted-collabs/edit-collab/${job.id}`)}
                    className="text-gray-500 hover:text-black transition-colors flex items-center gap-1.5 text-xs font-bold bg-gray-50 px-2 py-1 rounded-sm border border-transparent hover:border-gray-200"
                    aria-label={`Edit ${job.title}`}
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                </header>

                {/* Title & Parent Details */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-black leading-tight mb-3">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                      <Briefcase size={14} className="text-gray-400" />
                      <span>Original Job: <strong className="text-black">{job.parentProject}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                      <Building size={14} className="text-gray-400" />
                      <span>Client: <strong className="text-black">{job.clientName}</strong></span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm font-bold text-black mb-6 bg-gray-50 w-fit px-3 py-1.5 rounded-sm border border-gray-100">
                  <Calendar size={16} className="text-gray-400" /> 
                  Deadline: {job.deadline}
                </div>

                <div className="w-full h-px bg-gray-100 mb-6"></div>

                {/* Applicant Stack Section */}
                <section className="flex-1 flex flex-col mt-auto">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Freelancer Applications
                  </h4>

                  <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-sm p-4">
                    
                    {job.applicants.length > 0 ? (
                      <>
                        <div className="flex items-center gap-3">
                          {/* Overlapping Avatars */}
                          <div className="flex -space-x-3">
                            {job.applicants.slice(0, 3).map((app, index) => (
                              <img 
                                key={app.id}
                                src={app.avatar} 
                                alt={app.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                style={{ zIndex: 10 - index }}
                              />
                            ))}
                            {job.applicants.length > 3 && (
                              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm z-0">
                                +{job.applicants.length - 3}
                              </div>
                            )}
                          </div>
                          <p className="text-sm font-bold text-black">
                            {job.applicants.length} {job.applicants.length === 1 ? 'Applicant' : 'Applicants'}
                          </p>
                        </div>

                        <button 
                          onClick={() => navigate(`/freelancer/dashboard/posted-collabs/applicants/${job.id}`)}
                          className="bg-black text-[#F5F216] px-4 py-2.5 rounded-sm text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1.5 shrink-0"
                        >
                          View Applicants <ChevronRight size={14} />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users size={16} />
                          <span className="text-sm font-medium italic">No applications yet.</span>
                        </div>
                        <button disabled className="bg-gray-100 text-gray-400 px-4 py-2.5 rounded-sm text-xs font-bold cursor-not-allowed">
                          View Applicants
                        </button>
                      </div>
                    )}
                  </div>
                </section>

              </article>
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
              {activeTab === 'All' 
                ? "You haven't posted any collaboration requests yet, or your search didn't match any results."
                : `You don't have any ${activeTab.toLowerCase()} jobs matching your criteria.`}
            </p>
          </div>
        )}

      </div>
    </main>
  )
}