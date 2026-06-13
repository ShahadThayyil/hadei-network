import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Clock, DollarSign, CheckCircle2, Search, Heart, Share2, MoreHorizontal, Filter, Flag, Users, X } from 'lucide-react'

export default function FreelancerHome() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('jobs') // 'jobs' or 'posts'
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true) // Loading state for skeletons
  
  // Interactive States
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [jobTypeFilter, setJobTypeFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Report Modal States
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportTargetId, setReportTargetId] = useState(null)
  const [reportMessage, setReportMessage] = useState('')

  // Simulate initial network request for skeletons (runs ONLY on first load/refresh)
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Shows skeleton for 1.5 seconds on initial mount
    return () => clearTimeout(timer)
  }, []) // Empty dependency array ensures it doesn't trigger on tab switch

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = () => {
      setActiveDropdown(null)
      setIsFilterOpen(false)
    }
    window.addEventListener('click', closeDropdowns)
    return () => window.removeEventListener('click', closeDropdowns)
  }, [])

  const handleActionClick = (e, id) => {
    e.stopPropagation()
    setActiveDropdown(activeDropdown === id ? null : id)
    setIsFilterOpen(false)
  }

  const handleFilterClick = (e) => {
    e.stopPropagation()
    setIsFilterOpen(!isFilterOpen)
    setActiveDropdown(null)
  }

  const openReportModal = (id) => {
    setReportTargetId(id)
    setIsReportModalOpen(true)
    setActiveDropdown(null)
  }

  const handleSendReport = () => {
    // Admin send logic goes here
    console.log(`Report sent for job ${reportTargetId}: ${reportMessage}`)
    setIsReportModalOpen(false)
    setReportMessage('')
  }

  const handleViewDetails = (jobId) => {
    navigate(`/freelancer/dashboard/home/jobs/${jobId}`)
  }

  // Mock Data: Platform Jobs
  const [jobs] = useState([
    {
      id: 'job-1',
      title: 'Senior React Developer for SaaS Dashboard',
      client: 'TechNova Solutions',
      clientAvatar: 'T',
      verified: true,
      type: 'Fixed Price',
      category: 'Web Development',
      budget: '₹2,00,000 - ₹3,50,000',
      duration: '1-3 months',
      posted: '2 hours ago',
      timeRemaining: '5 hours',
      applied: 12,
      maxApplicants: 20,
      tags: ['React', 'Tailwind CSS', 'Redux'],
      description: 'Looking for an experienced frontend architect to rebuild our analytics dashboard. Must have strong experience with complex state management, responsive layouts, and modern React hooks.'
    },
    {
      id: 'job-2',
      title: 'React Native Expert for FinTech Mobile App',
      client: 'Elevate Commerce',
      clientAvatar: 'E',
      verified: true,
      type: 'Hourly',
      category: 'App Development',
      budget: '₹2,500 - ₹4,000 / hr',
      duration: '3-6 months',
      posted: '5 hours ago',
      timeRemaining: 'Expired',
      applied: 50,
      maxApplicants: 50,
      tags: ['React Native', 'Firebase', 'Redux'],
      description: 'Need a full-stack mobile developer to help us launch our MVP. You will be responsible for setting up the database schema, API endpoints, and integrating the frontend.'
    },
    {
      id: 'job-3',
      title: 'GSAP Animation Specialist for Landing Page',
      client: 'Creative Studio X',
      clientAvatar: 'C',
      verified: false,
      type: 'Fixed Price',
      category: 'Design',
      budget: '₹60,000',
      duration: 'Less than 1 month',
      posted: '1 day ago',
      timeRemaining: '2 days',
      applied: 4,
      maxApplicants: 15,
      tags: ['GSAP', 'HTML5', 'CSS3'],
      description: 'We have a Figma design that needs to be brought to life. Looking for smooth, physics-based scroll animations and a premium glassmorphism feel.'
    }
  ])

  // Mock Data: Community Programs / Events
  const [posts] = useState([
    {
      id: 'post-1',
      title: 'Mastering Advanced GSAP Timelines',
      venue: 'Online (Zoom)',
      eventType: 'Workshop',
      eventDate: 'June 15, 2026 • 10:00 AM IST',
      content: 'Join our official lead designers as we walk through the exact physics-based animation techniques used by top-tier Awwwards winning sites. Perfect for intermediate frontend developers.',
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop',
      likes: 124,
    },
    {
      id: 'post-2',
      title: 'Freelancer Networking Meetup: Kerala Chapter',
      venue: 'Offline (Kochi, India)',
      eventType: 'Meetup',
      eventDate: 'June 18, 2026 • 2:00 PM IST',
      content: 'Connect with fellow Hadei Network professionals in person! We will be discussing agency growth, client acquisition, and how to scale your freelance business in 2026.',
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800&auto=format&fit=crop',
      likes: 89,
    }
  ])

  // Apply filters
  const filteredJobs = jobs.filter(job => 
    (jobTypeFilter === 'All' || job.type === jobTypeFilter) &&
    (categoryFilter === 'All' || job.category === categoryFilter) &&
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const profilePic = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8 bg-gray-50/30 text-black font-sans relative">
      
      {/* Width updated to span fully and adapt responsively */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ==================== LEFT / MAIN FEED COLUMN ==================== */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* Header & Search */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-4">Discover Opportunities</h1>
            <div className="flex gap-3 relative">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab === 'jobs' ? 'jobs' : 'programs'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-sm pl-12 pr-4 py-3.5 text-sm outline-none"
                />
              </div>
              
              {/* Filter Button & Dropdown */}
              <div className="relative shrink-0">
                <button 
                  onClick={handleFilterClick}
                  className="bg-white border border-gray-200 text-black px-5 h-full rounded-sm flex items-center gap-2 text-sm font-bold hover:bg-gray-50 transition-colors"
                >
                  <Filter size={18} />
                  <span className="hidden sm:inline">Filters</span>
                </button>

                {isFilterOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-sm z-20 py-2 shadow-lg"
                  >
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Job Type</div>
                    <button onClick={() => setJobTypeFilter('All')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${jobTypeFilter === 'All' ? 'font-bold' : ''}`}>All Types</button>
                    <button onClick={() => setJobTypeFilter('Fixed Price')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${jobTypeFilter === 'Fixed Price' ? 'font-bold' : ''}`}>Fixed Price</button>
                    <button onClick={() => setJobTypeFilter('Hourly')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${jobTypeFilter === 'Hourly' ? 'font-bold' : ''}`}>Hourly</button>
                    
                    <div className="px-4 py-2 mt-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 border-t pt-3">Category</div>
                    <button onClick={() => setCategoryFilter('All')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === 'All' ? 'font-bold' : ''}`}>All Categories</button>
                    <button onClick={() => setCategoryFilter('Web Development')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === 'Web Development' ? 'font-bold' : ''}`}>Web Development</button>
                    <button onClick={() => setCategoryFilter('App Development')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === 'App Development' ? 'font-bold' : ''}`}>App Development</button>
                    <button onClick={() => setCategoryFilter('Design')} className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${categoryFilter === 'Design' ? 'font-bold' : ''}`}>Design</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feed Tabs */}
          <div className="flex gap-8 border-b border-gray-200 mt-2">
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === 'jobs' ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Job Feed
              {activeTab === 'jobs' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-t-sm" />}
            </button>
            <button 
              onClick={() => setActiveTab('posts')}
              className={`pb-3 text-sm font-bold transition-colors relative ${activeTab === 'posts' ? 'text-black' : 'text-gray-500 hover:text-black'}`}
            >
              Community Programs
              {activeTab === 'posts' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-t-sm" />}
            </button>
          </div>

          {/* ==================== ACTIVE FEED CONTENT ==================== */}
          <div className="flex flex-col gap-5 pb-10">
            
            {/* --- LOADING SKELETONS --- */}
            {isLoading && activeTab === 'jobs' && (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-sm p-5 animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-sm"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 w-32 rounded-sm"></div>
                          <div className="h-3 bg-gray-200 w-20 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="w-8 h-6 bg-gray-200 rounded-sm"></div>
                    </div>
                    <div className="h-6 bg-gray-200 w-3/4 mb-4 rounded-sm"></div>
                    <div className="h-10 bg-gray-50 border border-gray-100 w-full mb-4 rounded-sm"></div>
                    <div className="space-y-2 mb-6">
                      <div className="h-3.5 bg-gray-200 w-full rounded-sm"></div>
                      <div className="h-3.5 bg-gray-200 w-5/6 rounded-sm"></div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <div className="h-9 bg-gray-200 w-24 rounded-sm"></div>
                      <div className="h-9 bg-gray-200 w-28 rounded-sm"></div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {isLoading && activeTab === 'posts' && (
              <>
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-sm overflow-hidden animate-pulse">
                    <div className="w-full h-48 sm:h-64 bg-gray-200"></div>
                    <div className="p-5 md:p-6">
                      <div className="h-6 bg-gray-200 w-2/3 mb-3 rounded-sm"></div>
                      <div className="h-3 bg-gray-200 w-1/3 mb-5 rounded-sm"></div>
                      <div className="space-y-2 mb-6">
                        <div className="h-3.5 bg-gray-200 w-full rounded-sm"></div>
                        <div className="h-3.5 bg-gray-200 w-full rounded-sm"></div>
                        <div className="h-3.5 bg-gray-200 w-4/5 rounded-sm"></div>
                      </div>
                      <div className="flex gap-3 w-full">
                        <div className="h-10 bg-gray-200 w-1/2 rounded-sm"></div>
                        <div className="h-10 bg-gray-200 w-1/2 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* --- JOBS FEED (LOADED) --- */}
            {!isLoading && activeTab === 'jobs' && filteredJobs.map((job) => {
              const isFilled = job.applied >= job.maxApplicants || job.timeRemaining === 'Expired'

              return (
                <div key={job.id} className="bg-white border border-gray-200 rounded-sm p-5 hover:border-gray-300 transition-colors">
                  
                  {/* Client Info / Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center text-lg font-bold text-gray-700">
                        {job.clientAvatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">{job.client}</h4>
                          {job.verified && (
                            <CheckCircle2 size={14} className="text-blue-500 fill-blue-50" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{job.posted}</span>
                      </div>
                    </div>
                    
                    {/* Three Dots Dropdown (Report Only) */}
                    <div className="relative">
                      <button 
                        onClick={(e) => handleActionClick(e, job.id)}
                        className="text-gray-400 hover:text-black transition-colors p-1"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                      {activeDropdown === job.id && (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-sm z-20 py-1 shadow-lg"
                        >
                          <button onClick={() => openReportModal(job.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-sm transition-colors">
                            <Flag size={14}/> Report
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Title & Specs */}
                  <h3 className="text-lg font-bold mb-3 cursor-pointer hover:underline decoration-2 underline-offset-2">{job.title}</h3>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-600 mb-4 bg-gray-50/50 p-3 rounded-sm border border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-black font-bold">{job.budget}</span> <span className="font-normal text-gray-500">({job.type})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} /> {job.duration}
                    </div>
                    {/* New Data Points: Applied count and Time remaining */}
                    <div className="flex items-center gap-1.5 border-l border-gray-300 pl-4">
                      <Users size={14} className={isFilled ? 'text-red-500' : 'text-gray-500'} /> 
                      <span className={isFilled ? 'text-red-500' : ''}>
                        {job.applied}/{job.maxApplicants} Applied
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={isFilled ? 'text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-sm' : 'text-orange-600 bg-orange-50 px-2 py-0.5 rounded-sm font-bold'}>
                        {job.timeRemaining === 'Expired' ? 'Expired' : `${job.timeRemaining} left`}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-end pt-4 border-t border-gray-100 gap-3">
                    <button 
                      onClick={() => handleViewDetails(job.id)}
                      className="border border-gray-300 text-black text-xs font-bold px-6 py-2.5 rounded-sm hover:bg-gray-50 transition-colors"
                    >
                      Details
                    </button>
                    <button 
                      disabled={isFilled}
                      className={`text-[#F5F216] text-xs font-bold px-6 py-2.5 rounded-sm transition-colors ${
                        isFilled ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-black hover:bg-gray-800'
                      }`}
                    >
                      {isFilled ? 'Applications Closed' : 'Apply Job'}
                    </button>
                  </div>

                </div>
              )
            })}

            {/* --- COMMUNITY POSTS FEED (LOADED) --- */}
            {!isLoading && activeTab === 'posts' && filteredPosts.map((post) => {
               return (
                <div key={post.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-gray-300 transition-colors">
                  
                  {/* Cover Page / Image */}
                  <div className="w-full h-48 sm:h-64 overflow-hidden relative border-b border-gray-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-[#F5F216] text-black text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest">
                      {post.eventType}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-widest">
                      {post.venue}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
                    <p className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">{post.eventDate}</p>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">
                      {post.content}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                      <button className="w-full sm:flex-1 border border-gray-300 text-black text-sm font-bold py-2.5 rounded-sm hover:bg-gray-50 transition-colors">
                        Show full details
                      </button>
                      <button className="w-full sm:flex-1 bg-black text-[#F5F216] text-sm font-bold py-2.5 rounded-sm hover:bg-gray-800 transition-colors">
                        Join to the program
                      </button>
                    </div>
                  </div>

                  {/* Engagement Bar (No Comments, WhatsApp Share) */}
                  <div className="px-5 md:px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 cursor-pointer hover:text-black transition-colors group">
                      <Heart size={16} className="group-active:scale-110 transition-transform" /> {post.likes} Likes
                    </div>
                    
                    <a 
                      href={`https://wa.me/?text=Check out this Hadei Network event: ${post.title}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black transition-colors"
                    >
                      <Share2 size={16} /> Share on WhatsApp
                    </a>
                  </div>

                </div>
               )
            })}

            {/* Empty States */}
            {!isLoading && activeTab === 'jobs' && filteredJobs.length === 0 && (
              <div className="p-8 text-center text-gray-500 border border-gray-200 bg-white rounded-sm">
                No jobs found matching your criteria.
              </div>
            )}
            {!isLoading && activeTab === 'posts' && filteredPosts.length === 0 && (
              <div className="p-8 text-center text-gray-500 border border-gray-200 bg-white rounded-sm">
                No programs found matching your search.
              </div>
            )}
          </div>

        </div>

        {/* ==================== RIGHT COLUMN: STATS & TRENDS (STICKY) ==================== */}
        <div className="hidden lg:flex w-[320px] xl:w-[360px] flex-col gap-6 shrink-0 sticky top-6 pb-10">
          
          {/* Skeletons for Right Column */}
          {isLoading ? (
            <>
              <div className="bg-white border border-gray-200 rounded-sm p-6 animate-pulse">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-3"></div>
                  <div className="h-5 bg-gray-200 w-32 rounded-sm mb-2"></div>
                  <div className="h-3 bg-gray-200 w-24 rounded-sm"></div>
                </div>
                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between px-4">
                  <div className="flex flex-col items-center gap-2">
                     <div className="h-3 bg-gray-200 w-16 rounded-sm"></div>
                     <div className="h-6 bg-gray-200 w-8 rounded-sm"></div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                     <div className="h-3 bg-gray-200 w-24 rounded-sm"></div>
                     <div className="h-6 bg-gray-200 w-8 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-sm p-6 animate-pulse">
                 <div className="h-5 bg-gray-200 w-24 mb-5 rounded-sm"></div>
                 <div className="space-y-4">
                   {[1, 2, 3, 4, 5].map(i => (
                     <div key={i} className="flex items-center gap-3">
                       <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                       <div className="h-3 bg-gray-200 w-3/4 rounded-sm"></div>
                     </div>
                   ))}
                 </div>
              </div>
            </>
          ) : (
            <>
              {/* Quick Profile Snippet */}
              <div className="bg-white border border-gray-200 rounded-sm p-6">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-20 h-20 object-cover rounded-full border-2 border-black mb-3 p-[2px]"
                  />
                  <h3 className="font-bold text-black text-lg">Muhammed Shahad</h3>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Full Stack Developer</p>
                </div>
                
                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between text-center px-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Profile Views</p>
                    <p className="text-xl font-black text-black">14</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">Completed Jobs</p>
                    <p className="text-xl font-black text-black">8</p>
                  </div>
                </div>
              </div>

              {/* Trending Jobs */}
              <div className="bg-white border border-gray-200 rounded-sm p-6">
                <h3 className="text-sm font-bold mb-4">Trending Jobs</h3>
                <div className="flex flex-col gap-3">
                  {['Frontend Developer', 'UI/UX Designer', 'Node.js Backend Dev', 'Smart Contract Dev', 'Product Manager'].map((jobRole) => (
                    <div key={jobRole} className="flex items-center gap-2 group cursor-pointer">
                      <Search size={14} className="text-gray-400 group-hover:text-black transition-colors" />
                      <span className="text-sm font-semibold text-gray-600 group-hover:text-black transition-colors">
                        {jobRole}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

      </div>

      {/* ==================== REPORT MODAL ==================== */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black flex items-center gap-2"><Flag size={16}/> Report Job</h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <label className="block text-xs font-bold text-gray-700 mb-2">Why are you reporting this job?</label>
              <textarea 
                rows={4}
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="E.g., Inappropriate content, scam, asking for free work outside the platform..."
                className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2 text-sm text-black transition-colors focus:border-black focus:outline-none resize-none"
              />
            </div>
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSendReport}
                disabled={!reportMessage.trim()}
                className={`px-6 py-2 text-xs font-bold rounded-sm transition-colors ${
                  reportMessage.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}