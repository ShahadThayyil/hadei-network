import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Clock, 
  DollarSign, 
  Calendar,
  AlertCircle,
  MessageSquare,
  UserPlus,
  Edit2,
  Users,
  Quote,
  X,
  CheckCircle2,
  CreditCard
} from 'lucide-react'

export default function MyProjects() {
  const navigate = useNavigate()
  
  // States
  const [activeTab, setActiveTab] = useState('Ongoing')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Status Modal States
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  // Mock Data: 9 Projects Total (Cancelled projects removed)
  const [projects, setProjects] = useState([
    // --- ONGOING PROJECTS ---
    {
      id: 'proj-1',
      title: 'E-commerce Website Redesign',
      clientName: 'Sarah Jenkins',
      category: 'Web Development',
      description: 'A complete overhaul of the legacy e-commerce platform using Next.js and Tailwind CSS to improve mobile responsiveness and conversion rates.',
      status: 'In Progress',
      tab: 'Ongoing',
      budget: '₹1,50,000',
      started: 'Oct 01, 2026',
      deadline: 'Oct 24, 2026',
      timeProgress: 65, 
      paymentStatus: 'N/A',
      coWorkers: [
        { name: 'Aman S.', role: 'Backend Developer' },
        { name: 'Priya R.', role: 'UI Designer' }
      ],
    },
    {
      id: 'proj-2',
      title: 'React Native Mobile App MVP',
      clientName: 'Marcus Thorne',
      category: 'App Development',
      description: 'Building the first version of a fintech mobile application focusing on secure user onboarding and wallet integration.',
      status: 'Planning',
      tab: 'Ongoing',
      budget: '₹3,00,000',
      started: 'Nov 10, 2026',
      deadline: 'Dec 15, 2026',
      timeProgress: 15,
      paymentStatus: 'N/A',
      coWorkers: [
        { name: 'Rahul K.', role: 'Product Manager' }
      ],
    },

    // --- COMPLETED PROJECTS (Waiting for payment) ---
    {
      id: 'proj-3',
      title: 'SaaS Dashboard Frontend UI',
      clientName: 'David Chen',
      category: 'UI/UX & Frontend',
      description: 'Implemented complex state management and interactive charts for a B2B analytics dashboard.',
      status: 'Completed',
      tab: 'Completed',
      budget: '₹85,000',
      started: 'Oct 15, 2026',
      deadline: 'Nov 02, 2026',
      timeProgress: 100,
      paymentStatus: 'Pending',
      coWorkers: [],
    },
    {
      id: 'proj-4',
      title: 'Corporate Landing Page Integration',
      clientName: 'Elena Rodriguez',
      category: 'Web Development',
      description: 'Developed a high-performance, SEO-optimized landing page with complex GSAP scroll animations.',
      status: 'Completed',
      tab: 'Completed',
      budget: '₹45,000',
      started: 'Aug 20, 2026',
      deadline: 'Sep 10, 2026',
      timeProgress: 100,
      paymentStatus: 'Processing',
      coWorkers: [
        { name: 'Vijay M.', role: 'SEO Specialist' }
      ],
    },
    {
      id: 'proj-5',
      title: 'Healthcare Portal Authentication Module',
      clientName: 'Dr. Anil Kumar',
      category: 'Backend Development',
      description: 'Built a secure, HIPAA-compliant authentication system using Node.js and JWT tokens.',
      status: 'Completed',
      tab: 'Completed',
      budget: '₹1,20,000',
      started: 'Sep 01, 2026',
      deadline: 'Sep 25, 2026',
      timeProgress: 100,
      paymentStatus: 'Pending',
      coWorkers: [],
    },

    // --- CLOSED PROJECTS (History: Paid) ---
    {
      id: 'proj-7',
      title: 'Real Estate Property Listing App',
      clientName: 'Vikram Singh',
      category: 'App Development',
      description: 'A full-stack property listing application featuring Google Maps integration and real-time chat.',
      status: 'Completed',
      tab: 'Closed',
      budget: '₹2,50,000',
      started: 'Jan 10, 2026',
      deadline: 'Apr 20, 2026',
      timeProgress: 100,
      paymentStatus: 'Paid',
      coWorkers: [
        { name: 'Neha G.', role: 'UI/UX Designer' },
        { name: 'Arjun P.', role: 'QA Tester' }
      ],
      clientReview: 'Exceptional attention to detail. The map integration works flawlessly. Would hire again.',
    },
    {
      id: 'proj-8',
      title: 'Blockchain Smart Contract Audit',
      clientName: 'CryptoFlow Inc.',
      category: 'Web3 & Blockchain',
      description: 'Security audit and gas optimization for an Ethereum-based staking contract.',
      status: 'Completed',
      tab: 'Closed',
      budget: '₹95,000',
      started: 'May 05, 2026',
      deadline: 'May 20, 2026',
      timeProgress: 100,
      paymentStatus: 'Paid',
      coWorkers: [],
      clientReview: 'Saved us thousands in gas fees. Very professional and communicative throughout.',
    },
    {
      id: 'proj-9',
      title: 'Restaurant Menu QR Code Generator',
      clientName: 'Cafe Delight',
      category: 'Web Development',
      description: 'Simple web application for restaurant owners to dynamically generate and update QR menus.',
      status: 'Completed',
      tab: 'Closed',
      budget: '₹35,000',
      started: 'Jun 01, 2026',
      deadline: 'Jun 15, 2026',
      timeProgress: 100,
      paymentStatus: 'Paid',
      coWorkers: [],
    },
    {
      id: 'proj-11',
      title: 'Portfolio Website for Photographer',
      clientName: 'Anita Desai',
      category: 'Web Development',
      description: 'Minimalist, masonry-grid portfolio website with heavy image optimization.',
      status: 'Completed',
      tab: 'Closed',
      budget: '₹40,000',
      started: 'Feb 10, 2026',
      deadline: 'Feb 28, 2026',
      timeProgress: 100,
      paymentStatus: 'Paid',
      coWorkers: [],
      clientReview: 'Absolutely love my new site! The image loading is incredibly fast.',
    }
  ])

  const handleRequestPayment = (projectId) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, paymentStatus: 'Processing' } : p
    ))
  }

  // Derived Data (Counts & Filtering)
  const counts = useMemo(() => {
    return {
      Ongoing: projects.filter(p => p.tab === 'Ongoing').length,
      Completed: projects.filter(p => p.tab === 'Completed').length,
      Closed: projects.filter(p => p.tab === 'Closed').length,
    }
  }, [projects])

  const filteredProjects = projects.filter(p => 
    p.tab === activeTab && 
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.clientName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Status Badge Styling Helper
  const getStatusStyles = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'In Review': return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'Planning': return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'Completed': return 'bg-green-50 text-green-700 border-green-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  // Modal Handlers
  const handleOpenStatusModal = (project) => {
    setSelectedProject(project)
    setNewStatus(project.status)
    setIsStatusModalOpen(true)
  }

  const handleUpdateStatus = () => {
    if (!selectedProject || newStatus === selectedProject.status) return

    setProjects(prev => prev.map(p => {
      if (p.id === selectedProject.id) {
        let newTab = p.tab
        let newPaymentStatus = p.paymentStatus

        // Force tab transition based on status.
        if (newStatus === 'Completed') {
          newTab = 'Completed'
          newPaymentStatus = 'Pending' // Requires payment request
        }
        if (['In Progress', 'In Review', 'Planning'].includes(newStatus)) {
          newTab = 'Ongoing'
        }

        return { 
          ...p, 
          status: newStatus, 
          tab: newTab, 
          paymentStatus: newPaymentStatus,
          timeProgress: newStatus === 'Completed' ? 100 : p.timeProgress 
        }
      }
      return p
    }))
    
    setIsStatusModalOpen(false)
    setSelectedProject(null)
  }

  const isStatusDisabled = (statusToCheck) => {
    if (!selectedProject) return false
    const statusOrder = ['Planning', 'In Progress', 'In Review', 'Completed']
    const currentIndex = statusOrder.indexOf(selectedProject.status)
    const checkIndex = statusOrder.indexOf(statusToCheck)
    // Cannot move backwards
    return checkIndex < currentIndex
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar" onClick={() => setActiveDropdown(null)}>
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all your freelance engagements.</p>
        </div>

        {/* ==================== TABS & SEARCH ==================== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-1">
          
          {/* Tabs */}
          <div className="flex items-center gap-6 overflow-x-auto overflow-hidden custom-scrollbar">
            {['Ongoing', 'Completed', 'Closed'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-colors relative whitespace-nowrap ${
                  activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab} <span className="ml-1 text-xs px-2 py-0.5 rounded-sm bg-gray-100 text-gray-600">{counts[tab]}</span>
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
                placeholder="Search projects or clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm pl-9 pr-4 py-2 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

        </div>

        {/* ==================== PROJECTS DISPLAY ==================== */}
        {filteredProjects.length > 0 ? (
          activeTab === 'Closed' ? (
            /* --- HISTORY LIST VIEW (CLOSED TAB) --- */
            <div className="flex flex-col gap-4 pb-10">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white border border-gray-200 rounded-sm p-4 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-gray-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-black leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">
                      {project.description}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mb-4">
                      <span className="text-gray-400 font-normal">Client:</span> {project.clientName} &nbsp;•&nbsp; 
                      <span className="text-gray-400 font-normal">Started:</span> {project.started} &nbsp;•&nbsp; 
                      <span className="text-gray-400 font-normal">Completed on:</span> {project.deadline}
                    </p>

                    {/* Team Members List */}
                    {project.coWorkers && project.coWorkers.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Users size={12} /> Team Members
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.coWorkers.map((worker, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-sm border border-gray-100">
                              <span className="text-xs font-bold text-gray-800">{worker.name}</span>
                              <span className="text-[10px] font-medium text-gray-500">({worker.role})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.clientReview && (
                      <div className="mt-4 bg-green-50/50 border-l-2 border-green-500 p-3 rounded-r-sm max-w-2xl">
                        <div className="flex items-start gap-2 text-green-800">
                          <Quote size={14} className="shrink-0 mt-0.5" />
                          <p className="text-xs italic leading-relaxed">{project.clientReview}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 md:min-w-[180px] bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-sm border border-gray-100 md:border-none md:mt-2">
                    <span className="text-xs font-bold px-3 py-1.5 uppercase tracking-wider rounded-sm border bg-green-50 text-green-700 border-green-200 flex items-center gap-1.5 w-fit">
                      <CheckCircle2 size={14} /> Payment Approved
                    </span>
                    <span className="text-xl font-bold text-black mt-1">
                      {project.budget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* --- GRID CARDS VIEW (ONGOING & COMPLETED TABS) --- */
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10 items-stretch">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col h-full"
                >
                  {/* Top Row: Category & Status */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-sm uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded-sm border ${getStatusStyles(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-black leading-tight mb-2 hover:underline cursor-pointer decoration-2 underline-offset-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Client Name */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <span className="text-gray-400 font-normal">Client:</span> {project.clientName}
                    </p>
                  </div>

                  {/* Flex Spacer pushes everything below it to the bottom */}
                  <div className="flex-1" />

                  {/* Team Members List (Only visible if there are co-workers) */}
                  {project.coWorkers && project.coWorkers.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Users size={14} /> Team Members
                      </p>
                      <div className="flex flex-col gap-2">
                        {project.coWorkers.map((worker, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-sm border border-gray-100">
                            <span className="text-sm font-bold text-gray-800">{worker.name}</span>
                            <span className="text-xs font-medium text-gray-500">{worker.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Meta Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><DollarSign size={12}/> Budget</p>
                      <p className="text-sm font-bold text-black">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Started</p>
                      <p className="text-sm font-bold text-black">{project.started}</p>
                    </div>
                  </div>

                  {/* Deadline Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5">
                        <Clock size={14} /> Deadline Target
                      </span>
                      <span className="text-xs font-bold text-black">{project.deadline}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-sm overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          project.status === 'Completed' ? 'bg-green-500' : 'bg-black'
                        }`}
                        style={{ width: `${project.timeProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Payment Status (Only in Completed Tab) */}
                  {project.tab === 'Completed' && (
                    <div className="mb-6 flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-sm">
                      <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                        <CreditCard size={14} /> Payment Status
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-sm ${
                        project.paymentStatus === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {project.paymentStatus}
                      </span>
                    </div>
                  )}

                  {/* Footer Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-3 mt-auto">
                    
                    {project.tab === 'Completed' && (
                      <button 
                        onClick={() => handleRequestPayment(project.id)}
                        disabled={project.paymentStatus === 'Processing'}
                        className={`w-full px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                          project.paymentStatus === 'Processing' 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                            : 'bg-black text-[#F5F216] hover:bg-gray-800'
                        }`}
                      >
                        <DollarSign size={16} /> 
                        {project.paymentStatus === 'Processing' ? 'Payment Requested' : 'Request Payment'}
                      </button>
                    )}

                    {project.tab === 'Ongoing' && (
                      <>
                        <button className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-black transition-colors">
                          <MessageSquare size={16} /> Chat
                        </button>
                        <button
                        onClick={()=> navigate(`/freelancer/dashboard/projects/request-coworker/${project.id}`)}
                        className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 hover:text-black transition-colors">
                          <UserPlus size={16} /> Need Workers?
                        </button>
                        <div className="w-full sm:w-auto flex relative">
                          <button 
                            onClick={(e) => handleOpenStatusModal(project)}
                            className="w-full bg-black text-[#F5F216] px-5 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                          >
                            <Edit2 size={14} /> Update Status
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-sm bg-gray-50/30 text-center px-4">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">No projects found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              You don't have any {activeTab.toLowerCase()} projects matching your criteria right now.
            </p>
            {activeTab === 'Ongoing' && (
              <button 
                onClick={() => navigate('/freelancer/dashboard/home')}
                className="bg-black text-[#F5F216] px-6 py-2.5 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors"
              >
                Explore New Jobs
              </button>
            )}
          </div>
        )}

      </div>

      {/* ==================== UPDATE STATUS MODAL (BUTTON GRID) ==================== */}
      {isStatusModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black">Update Project Phase</h3>
              <button onClick={() => setIsStatusModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4">
                Select the new status for <span className="font-bold text-black">{selectedProject.title}</span>.
              </p>
              
              <div className="bg-orange-50 border border-orange-100 text-orange-800 text-xs p-3 rounded-sm mb-5">
                <span className="font-bold">Note:</span> Progress flows forward. You cannot revert to previous phases. Marking as Completed is final.
              </div>

              {/* Status Button Grid */}
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Planning', id: 'Planning' },
                  { label: 'In Progress', id: 'In Progress' },
                  { label: 'In Review', id: 'In Review' },
                  { label: 'Completed (Final)', id: 'Completed', final: true },
                ].map(statusOption => {
                  const isDisabled = isStatusDisabled(statusOption.id)
                  const isSelected = newStatus === statusOption.id
                  const isCurrentStatus = selectedProject.status === statusOption.id

                  return (
                    <button
                      key={statusOption.id}
                      disabled={isDisabled}
                      onClick={() => setNewStatus(statusOption.id)}
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-sm border text-sm font-bold transition-all text-left w-full
                        ${isDisabled 
                            ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed' 
                            : isSelected
                              ? 'bg-[#F5F216]/10 border-black text-black'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400'
                        }
                      `}
                    >
                      <span>{statusOption.label} {isCurrentStatus && '(Current)'}</span>
                      {isSelected && <CheckCircle2 size={16} className="text-black" />}
                    </button>
                  )
                })}
              </div>

            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsStatusModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateStatus}
                disabled={newStatus === selectedProject.status}
                className={`px-6 py-2 text-xs font-bold rounded-sm transition-colors ${
                  newStatus === selectedProject.status
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-[#F5F216] hover:bg-gray-800'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}