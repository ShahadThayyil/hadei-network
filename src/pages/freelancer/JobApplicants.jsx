import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  Star,
  Users,
  ExternalLink,
  Clock
} from 'lucide-react'

export default function JobApplicants() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  // -----------------------------
  // MOCK DATA: APPLICANTS
  // -----------------------------
  const [jobTitle, setJobTitle] = useState('Loading...')
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching job details and its applicants based on jobId
    setTimeout(() => {
      setJobTitle('Frontend UI Integration for E-commerce')
      setApplicants([
        {
          id: 'app-101',
          name: 'Rahul K.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
          category: 'React Specialist',
          experience: '4 Years Experience',
          badge: 'Top Rated',
          level: 3, // Added Level
          levelColor: 'text-yellow-500 fill-yellow-500',
          committedJobs: '24 Jobs Completed',
          appliedAt: '2 hours ago',
          isApproved: false
        },
        {
          id: 'app-102',
          name: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
          category: 'Frontend Developer',
          experience: '2.5 Years Experience',
          badge: 'Rising Talent',
          level: 1, // Added Level
          levelColor: 'text-blue-500 fill-blue-500',
          committedJobs: '8 Jobs Completed',
          appliedAt: '5 hours ago',
          isApproved: false
        },
        {
          id: 'app-103',
          name: 'Arjun M.',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
          category: 'Full Stack Engineer',
          experience: '6 Years Experience',
          badge: 'Expert',
          level: 5, // Added Level
          levelColor: 'text-purple-500 fill-purple-500',
          committedJobs: '42 Jobs Completed',
          appliedAt: '1 day ago',
          isApproved: false
        }
      ])
      setIsLoading(false)
    }, 500)
  }, [jobId])

  // Logic to handle the approval action
  const handleApprove = (applicantId, applicantName) => {
    // Update local state to show as approved
    setApplicants(prev => prev.map(app => 
      app.id === applicantId ? { ...app, isApproved: true } : app
    ))
    alert(`You have approved ${applicantName} for this collaboration!`)
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white text-black">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider animate-pulse">Loading Applicants...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ==================== PAGE HEADER ==================== */}
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit mb-6"
          >
            <ArrowLeft size={16} /> Back to Posted Jobs
          </button>
          
          <h1 className="text-3xl font-bold tracking-tight mb-2">Applicants</h1>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            Reviewing candidates for: <span className="font-bold text-black">{jobTitle}</span>
          </p>
        </div>

        {/* ==================== APPLICANTS GRID ==================== */}
        {applicants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10 items-stretch">
            {applicants.map((applicant) => (
              <div 
                key={applicant.id} 
                className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col h-full"
              >
                
                {/* Time Applied Badge */}
                <div className="flex justify-end mb-2">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">
                    <Clock size={10} /> Applied {applicant.appliedAt}
                  </span>
                </div>

                {/* Profile Image & Badge Row */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-3">
                    <img 
                      src={applicant.avatar} 
                      alt={applicant.name} 
                      className="w-20 h-20 rounded-full object-cover border border-gray-200"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-1">
                      <CheckCircle2 size={16} className="text-blue-600 fill-blue-50" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-black leading-tight">
                    {applicant.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <Star size={12} className={applicant.levelColor} />
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                      {applicant.badge} • Lvl {applicant.level}
                    </span>
                  </div>
                </div>

                {/* Info List (Free layout inside card) */}
                <div className="flex flex-col gap-4 mb-6 flex-1">
                  {/* Category */}
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Briefcase size={16} className="text-gray-400 shrink-0" />
                    <span className="font-bold truncate">{applicant.category}</span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Award size={16} className="text-gray-400 shrink-0" />
                    <span className="font-medium truncate">{applicant.experience}</span>
                  </div>

                  {/* Committed Jobs Count */}
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                    <span className="font-medium truncate">{applicant.committedJobs}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2 mt-auto">
                  <button 
                    onClick={() => navigate(`/freelancer/dashboard/posted-collabs/applicants/profile/${applicant.id}`)}
                    className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-sm text-xs font-bold hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center gap-2"
                  >
                    View Full Profile <ExternalLink size={14} />
                  </button>
                  
                  <button 
                    onClick={() => handleApprove(applicant.id, applicant.name)}
                    disabled={applicant.isApproved}
                    className={`w-full py-3 rounded-sm text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
                      applicant.isApproved 
                        ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                        : 'bg-black text-[#F5F216] hover:bg-gray-800'
                    }`}
                  >
                    {applicant.isApproved ? 'Approved' : 'Approve / Accept'}
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-sm bg-gray-50/50 text-center px-4">
            <div className="w-16 h-16 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Users className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">No applicants yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Freelancers have not submitted any proposals for this job yet.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}