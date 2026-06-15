import { useState } from 'react'
import { 
  Search, 
  DollarSign, 
  Calendar,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  HelpCircle
} from 'lucide-react'

export default function JobStatus() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // -----------------------------
  // MOCK DATA: APPLIED JOBS
  // -----------------------------
  const [applications] = useState([
    {
      id: 'app-1',
      jobTitle: 'Senior React Developer for SaaS Dashboard',
      clientName: 'TechNova Solutions',
      amount: '₹2,00,000 - ₹3,50,000',
      status: 'Applied',
      appliedDate: 'Oct 15, 2026',
      description: 'We are looking for an experienced frontend architect to rebuild our primary analytics dashboard from the ground up using React and Tailwind CSS.',
    },
    {
      id: 'app-2',
      jobTitle: 'UI/UX Designer for Fintech Mobile App',
      clientName: 'FinFlow Inc.',
      amount: '₹1,50,000',
      status: 'Under Review',
      appliedDate: 'Oct 12, 2026',
      description: 'Need a complete mobile app design focusing on a clean, modern aesthetic with highly intuitive user onboarding flows.',
    },
    {
      id: 'app-3',
      jobTitle: 'Backend Node.js API Integration',
      clientName: 'HealthSync',
      amount: '₹80,000',
      status: 'Rejected',
      appliedDate: 'Oct 05, 2026',
      description: 'Develop and document secure REST APIs for our healthcare patient portal. Must be familiar with HIPAA compliance standards.',
    },
    {
      id: 'app-4',
      jobTitle: 'Minimalist Portfolio Website',
      clientName: 'David Chen',
      amount: '₹40,000',
      status: 'Hired',
      appliedDate: 'Oct 01, 2026',
      description: 'Looking for a frontend developer to bring my Figma designs to life. Needs to be highly optimized and responsive.',
    },
    {
      id: 'app-5',
      jobTitle: 'Full Stack E-commerce Setup',
      clientName: 'Apex Industries',
      amount: '₹4,50,000',
      status: 'Applied',
      appliedDate: 'Oct 16, 2026',
      description: 'End-to-end development of a custom e-commerce solution using Next.js, Stripe integration, and a headless CMS.',
    },
    {
      id: 'app-6',
      jobTitle: 'GSAP Animation Specialist',
      clientName: 'Creative Studio X',
      amount: 'Hourly (₹1,500/hr)',
      status: 'Under Review',
      appliedDate: 'Oct 14, 2026',
      description: 'We need someone strictly dedicated to adding complex scroll-based animations to an existing marketing website.',
    }
  ])

  // -----------------------------
  // LOGIC & FILTERING
  // -----------------------------
  const filteredApps = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'All' || app.status === activeTab
    
    return matchesSearch && matchesTab
  })

  // Status Badge Styling Helper
  const getStatusDisplay = (status) => {
    switch(status) {
      case 'Applied': 
        return { style: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Clock size={12} className="mr-1" /> }
      case 'Under Review': 
        return { style: 'bg-purple-50 text-purple-700 border-purple-200', icon: <Eye size={12} className="mr-1" /> }
      case 'Hired': 
        return { style: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle2 size={12} className="mr-1" /> }
      case 'Rejected': 
        return { style: 'bg-red-50 text-red-700 border-red-200', icon: <XCircle size={12} className="mr-1" /> }
      default: 
        return { style: 'bg-gray-50 text-gray-700 border-gray-200', icon: null }
    }
  }

  const tabs = ['All', 'Applied', 'Under Review', 'Hired', 'Rejected']

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Application Status</h1>
          <p className="text-sm text-gray-500 mt-1">Track the jobs you've applied for and monitor their progress.</p>
        </div>

        {/* ==================== TABS & SEARCH ==================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-1">
          
          {/* Tabs */}
          <div className="flex items-center gap-6 overflow-hidden custom-scrollbar">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-colors relative whitespace-nowrap ${
                  activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute -bottom-[1px] left-0 w-full h-[3px] bg-black rounded-t-sm" />}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center pb-3 md:pb-0">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm pl-9 pr-4 py-2 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

        </div>

        {/* ==================== APPLICATIONS GRID ==================== */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10 items-stretch">
            {filteredApps.map((app) => {
              const statusData = getStatusDisplay(app.status)
              
              return (
                <div 
                  key={app.id} 
                  className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col h-full"
                >
                  {/* Status Badge & Date */}
                  <div className="flex items-start justify-between mb-5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm border flex items-center ${statusData.style}`}>
                      {statusData.icon} {app.status}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={12} /> {app.appliedDate}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 flex flex-col mb-6">
                    <h3 className="text-lg font-bold text-black leading-tight mb-3">
                      {app.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  {/* Details Block (Client & Amount) */}
                  <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col gap-3 mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Client</span>
                      <span className="text-sm font-semibold text-gray-800 truncate pl-4">{app.clientName}</span>
                    </div>
                    <div className="w-full h-px bg-gray-200"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Budget / Rate</span>
                      <span className="text-sm font-bold text-black">{app.amount}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <button className="w-full py-2.5 text-xs font-bold text-gray-600 hover:text-black hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 rounded-sm border border-transparent">
                      <HelpCircle size={14} /> Contact Support / Report
                    </button>
                  </div>

                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-sm bg-gray-50/30 text-center px-4">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">No applications found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {activeTab === 'All' 
                ? "You haven't applied to any jobs yet." 
                : `You don't have any applications with the status "${activeTab}".`}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}