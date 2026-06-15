import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, CheckCircle2, Clock, Activity, Briefcase, Users, CreditCard, AlertCircle, Award, Flag } from 'lucide-react'

export default function ClientHome() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('In Progress') // 'Proposals', 'In Progress', 'Review'
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [activeTab])

  const clientProfilePic = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"

  // Mixed Jobs Feed 
  const dashboardFeed = [
    {
      id: 'CON-2026-88',
      type: 'Proposals', 
      title: 'Senior React Developer for SaaS Dashboard',
      budget: '₹2,00,000 - ₹3,50,000',
      posted: 'Posted 2 hours ago',
      applicantsCount: 12,
      tags: ['React', 'Tailwind CSS', 'Redux']
    },
    {
      id: 'CON-2026-90',
      type: 'In Progress', 
      title: 'UI/UX Design for Fintech Mobile App',
      freelancer: 'Arjun Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      verified: true,
      budget: '₹1,50,000',
      progress: 60,
      currentTask: 'Freelancer Update: Wireframes completed, starting high-fidelity mockups.',
      tags: ['Figma', 'UI/UX', 'Mobile']
    },
    {
      id: 'CON-2026-94',
      type: 'Review', 
      title: 'MERN Stack Developer for E-commerce MVP',
      freelancer: 'Neha Mathews',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      verified: true,
      budget: '₹1,80,000',
      progress: 100,
      currentTask: 'Deliverables submitted for Phase 1. Awaiting client review.',
      tags: ['Node.js', 'Express', 'MongoDB']
    }
  ]

  const filteredFeed = dashboardFeed.filter(item => 
    item.type === activeTab && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-8 text-black font-sans relative">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* ==================== LEFT COLUMN ==================== */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          <h1 className="text-2xl font-bold tracking-tight">Control Cockpit</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5 rounded-sm flex items-center gap-4 shadow-sm cursor-pointer hover:border-gray-300 transition-colors" onClick={() => navigate('/client/dashboard/my-jobs')}>
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Briefcase size={20}/></div>
              <div><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Posted Briefs</p><p className="text-xl font-black">4</p></div>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-sm flex items-center gap-4 shadow-sm cursor-pointer hover:border-gray-300 transition-colors" onClick={() => navigate('/client/dashboard/my-jobs')}>
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><Activity size={20}/></div>
              <div><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Ongoing Work</p><p className="text-xl font-black">2</p></div>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-sm flex items-center gap-4 shadow-sm cursor-pointer hover:border-gray-300 transition-colors" onClick={() => navigate('/client/dashboard/payments')}>
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0"><CheckCircle2 size={20}/></div>
              <div><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">To Review & Pay</p><p className="text-xl font-black">1</p></div>
            </div>
          </div>

          <div className="flex gap-3 relative mt-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search workspace..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm pl-12 pr-4 py-3.5 text-sm outline-none transition-colors focus:border-gray-400" />
            </div>
            <button className="bg-white border border-gray-200 text-black px-5 h-full rounded-sm flex items-center gap-2 text-sm font-bold hover:bg-gray-50 transition-colors shrink-0">
              <Filter size={18} /> <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          <div className="flex gap-6 border-b border-gray-200 overflow-x-auto custom-scrollbar">
            {['Proposals', 'In Progress', 'Review'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-bold transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-black'}`}>
                {tab === 'Proposals' ? 'Accepting Proposals' : tab === 'Review' ? 'Review & Pay' : tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black rounded-t-sm" />}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5 pb-10">
            {isLoading ? (
              <div className="bg-white border border-gray-200 rounded-sm p-5 animate-pulse h-48 w-full" />
            ) : filteredFeed.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-gray-300 rounded-sm bg-gray-50/30">
                <p className="text-sm text-gray-500 font-bold">No jobs currently in {activeTab}.</p>
              </div>
            ) : (
              filteredFeed.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-sm p-6 hover:border-gray-300 transition-colors shadow-sm flex flex-col md:flex-row justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="mb-3">
                      {item.type === 'Proposals' && <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-blue-700 rounded-sm uppercase tracking-wider">Collecting Applicants</span>}
                      {item.type === 'In Progress' && <span className="text-[10px] font-bold px-2 py-1 bg-orange-50 text-orange-700 rounded-sm uppercase tracking-wider">Production</span>}
                      {item.type === 'Review' && <span className="text-[10px] font-bold px-2 py-1 bg-red-50 text-red-700 rounded-sm uppercase tracking-wider flex items-center gap-1 w-fit"><AlertCircle size={12}/> Needs Action</span>}
                    </div>

                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    
                    {item.type === 'Proposals' ? (
                      <p className="text-sm text-gray-500 font-medium mb-4 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-black border border-gray-200 bg-gray-50 px-2 py-0.5 rounded-sm">Budget: {item.budget}</span> • <span>{item.posted}</span>
                      </p>
                    ) : (
                      <div className="flex items-center gap-3 mb-4">
                        <img src={item.avatar} alt={item.freelancer} className="w-8 h-8 rounded-full object-cover bg-gray-100" />
                        <div>
                          <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                            {item.freelancer} {item.verified && <CheckCircle2 size={12} className="text-blue-500 fill-blue-50" />}
                          </p>
                          <p className="text-xs text-gray-500">Contract: {item.budget}</p>
                        </div>
                      </div>
                    )}

                    {item.type !== 'Proposals' && (
                      <div className="bg-gray-50 border border-gray-200 p-3 rounded-sm text-xs font-medium text-gray-700 mb-4 max-w-2xl">
                        <span className="font-bold text-black">Status Update:</span> {item.currentTask}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => <span key={index} className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">{tag}</span>)}
                    </div>
                  </div>

                  {/* Actions Right Side */}
                  <div className="flex flex-col gap-3 justify-center items-end md:min-w-[180px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    {item.type === 'Proposals' && (
                      <div className="w-full flex flex-col gap-2">
                        <div className="bg-gray-50 border border-gray-200 text-center py-3 rounded-sm mb-1">
                          <p className="text-2xl font-black text-black">{item.applicantsCount}</p>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1"><Users size={12}/> Applied</p>
                        </div>
                        <button onClick={() => navigate(`/client/dashboard/applicants/${item.id}`)} className="w-full bg-black text-[#F5F216] px-4 py-2.5 rounded-sm text-xs font-bold hover:bg-gray-800 transition-colors">Review Talent</button>
                      </div>
                    )}
                    {item.type === 'In Progress' && (
                      <button onClick={() => navigate('/client/dashboard/my-jobs')} className="w-full border border-gray-300 bg-white text-black px-4 py-2.5 rounded-sm text-xs font-bold hover:bg-gray-50 transition-colors">Manage Work</button>
                    )}
                    {item.type === 'Review' && (
                      <button onClick={() => navigate('/client/dashboard/payments')} className="w-full bg-red-600 text-white px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
                        <CreditCard size={14} /> Review & Pay
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* ==================== RIGHT COLUMN (RESTORED EXPANDED PROFILE) ==================== */}
        <div className="hidden lg:flex w-[320px] xl:w-[360px] flex-col gap-6 shrink-0 sticky top-6 pb-10">
          
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <img src={clientProfilePic} alt="Profile" className="w-20 h-20 object-cover rounded-full border-2 border-black mb-3 p-[2px]" />
              <h3 className="font-bold text-black text-lg">Muhammed Shahad</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Enterprise Client</p>
              
              <div className="mt-4 inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-sm">
                <Award size={14} className="fill-yellow-500" />
                <span className="text-xs font-bold tracking-wide">1,450 XP (Pro Member)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-semibold">Total Contracts</span>
                <span className="font-bold text-black">12</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-semibold">Active Talent</span>
                <span className="font-bold text-black">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-semibold">Total Spent</span>
                <span className="font-bold text-black">₹3,45,000</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-semibold">Member Since</span>
                <span className="font-bold text-black">Aug 2025</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-800">Action Required</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-sm cursor-pointer hover:bg-red-100 transition-colors">
                <Flag size={16} className="text-red-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-red-700">Approve Milestone</p>
                  <p className="text-[10px] text-red-500 mt-0.5">CON-2026-90 requires action</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}