import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, DollarSign, MessageSquare, ShieldAlert, Flag, X, Users, Eye, CheckCircle2, Star } from 'lucide-react'

export default function ClientMyJobs() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Ongoing Works')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false)
  const [disputeMessage, setDisputeMessage] = useState('')
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [rating, setRating] = useState(0)

  const [jobs] = useState([
    {
      id: 'job-1', title: 'Senior React Developer for SaaS', freelancer: null, applicants: 12,
      status: 'Accepting Proposals', tab: 'Posted Briefs', budget: '₹2,50,000', adminApproved: false,
    },
    {
      id: 'job-2', title: 'E-commerce Website Redesign', freelancer: 'Aman Sharma',
      status: 'In Progress', tab: 'Ongoing Works', budget: '₹1,50,000', adminApproved: true,
      progressUpdate: 'Phase 2: Homepage Layout complete. Starting checkout flow.', progress: 65
    },
    {
      id: 'job-3', title: 'SaaS Dashboard Frontend UI', freelancer: 'David Chen',
      status: 'Deliverables Submitted', tab: 'Review & Pay', budget: '₹85,000', adminApproved: true,
      progressUpdate: 'All files submitted. Ready for final review.'
    },
    {
      id: 'job-4', title: 'Corporate Landing Page', freelancer: 'Priya R.',
      status: 'Paid & Closed', tab: 'Closed', budget: '₹45,000', adminApproved: true,
    }
  ])

  const filteredJobs = jobs.filter(j => j.tab === activeTab && j.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-gray-50/30 text-black font-sans overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Jobs Management</h1>
          <p className="text-sm text-gray-500 mt-1">Select applicants, track ongoing production, and release escrow payments.</p>
        </div>

        {/* Search & Tabs Row (Tab underline fix) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-0">
          <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
            {['Posted Briefs', 'Ongoing Works', 'Review & Pay', 'Closed'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`pb-3 text-sm font-bold transition-colors whitespace-nowrap border-b-[3px] ${
                  activeTab === tab ? 'text-black border-black' : 'text-gray-500 border-transparent hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 pb-3 md:pb-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search jobs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-gray-300 rounded-sm pl-9 pr-4 py-2 text-sm outline-none focus:border-black" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredJobs.length === 0 ? (
             <div className="py-20 text-center border border-dashed border-gray-300 rounded-sm bg-gray-50/30">
               <p className="text-sm text-gray-500 font-bold">No {activeTab.toLowerCase()} found.</p>
             </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-sm p-6 hover:border-gray-300 transition-colors flex flex-col md:flex-row justify-between gap-6 shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 rounded-sm uppercase tracking-wider">{job.status}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  
                  {job.freelancer ? (
                    <p className="text-sm text-gray-600 mb-4"><span className="font-bold text-black">Talent:</span> {job.freelancer}</p>
                  ) : (
                    <p className="text-sm text-gray-600 mb-4"><span className="font-bold text-black">Applicants:</span> {job.applicants}</p>
                  )}
                  
                  {activeTab === 'Ongoing Works' && job.progress && (
                    <div className="mb-4 max-w-md">
                      <div className="flex justify-between items-center text-xs font-bold text-gray-600 mb-1.5">
                        <span>Production Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${job.progress}%` }} />
                      </div>
                    </div>
                  )}

                  {job.progressUpdate && (
                    <div className="bg-gray-50 border border-gray-100 p-3 rounded-sm text-xs font-medium text-gray-700 mb-4 w-fit max-w-xl">
                      <span className="font-bold text-black">Update: </span> {job.progressUpdate}
                    </div>
                  )}

                  <div className="flex gap-4 text-xs font-bold text-gray-500">
                    <span className="flex items-center gap-1 border border-gray-200 bg-gray-50 px-2 py-1 rounded-sm text-black"><DollarSign size={14}/> Budget: {job.budget}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 justify-center md:min-w-[180px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                  
                  {activeTab === 'Posted Briefs' && (
                    <button onClick={() => navigate(`/client/dashboard/applicants/${job.id}`)} className="bg-black text-white px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                      <Users size={14} /> Review Talent
                    </button>
                  )}

                  {activeTab === 'Ongoing Works' && (
                    <>
                      {job.adminApproved ? (
                        <button onClick={() => navigate('/client/dashboard/messages')} className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                          <MessageSquare size={14} /> Open Chat
                        </button>
                      ) : (
                        <p className="text-[10px] text-gray-400 italic mb-1 text-center">Chat locked until Admin Approval</p>
                      )}
                      <button onClick={() => setIsDisputeModalOpen(true)} className="bg-red-50 text-red-700 border border-red-100 px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                        <ShieldAlert size={14} /> File Dispute
                      </button>
                    </>
                  )}

                  {activeTab === 'Review & Pay' && (
                    <>
                      <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                        <Eye size={14} /> Inspect Files
                      </button>
                      <button onClick={() => setIsReviewModalOpen(true)} className="bg-red-600 text-white px-4 py-2.5 rounded-sm text-xs font-bold hover:bg-red-700 flex items-center justify-center gap-2 transition-colors">
                        <CheckCircle2 size={14}/> Release Funds
                      </button>
                    </>
                  )}

                  {activeTab === 'Closed' && (
                    <button className="bg-white border border-gray-300 text-black px-4 py-2.5 rounded-sm text-xs font-bold hover:bg-gray-50 transition-colors">View Receipt</button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DISPUTE MODAL */}
      {isDisputeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black flex items-center gap-2"><Flag size={16} className="text-red-500"/> File a Dispute</h3>
              <button onClick={() => setIsDisputeModalOpen(false)} className="text-gray-400 hover:text-black"><X size={20} /></button>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Filing a dispute pauses the contract. An admin will mediate. We may assign a new freelancer, transfer to our in-house team, or refund the escrow.
              </p>
              <textarea rows={4} value={disputeMessage} onChange={(e) => setDisputeMessage(e.target.value)} placeholder="Explain the issue with the work or communication..." className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2 text-sm text-black transition-colors focus:border-red-500 outline-none resize-none" />
            </div>
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsDisputeModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black">Cancel</button>
              <button disabled={!disputeMessage.trim()} className={`px-6 py-2 text-xs font-bold rounded-sm transition-colors ${disputeMessage.trim() ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                Submit to Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW & PAY MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black flex items-center gap-2"><CheckCircle2 size={16} className="text-green-600"/> Review & Release Funds</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-gray-400 hover:text-black"><X size={20} /></button>
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-600 mb-4 leading-relaxed bg-gray-50 p-3 rounded-sm border border-gray-200">
                You are about to approve the work and signal the Admin to release the escrow funds to the freelancer. <strong className="text-black">This action is final.</strong>
              </p>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 mb-2">Rate Freelancer</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                      <Star size={24} className={rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsReviewModalOpen(false)} className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black">Cancel</button>
              <button disabled={rating === 0} className={`px-6 py-2 text-xs font-bold rounded-sm transition-colors ${rating > 0 ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                Acknowledge & Release
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}