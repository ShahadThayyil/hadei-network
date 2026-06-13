import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon, 
  Download, 
  Calendar, 
  Users, 
  HelpCircle,
  Briefcase,
  ShieldCheck,
  X
} from 'lucide-react'

export default function ProjectDetails() {
  const navigate = useNavigate()
  const { id } = useParams() // Captures the project ID from the URL if needed

  // Interaction States
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  // Mock Data: Detailed Project Information
  const [project] = useState({
    id: id || 'proj-101',
    title: 'Senior React Developer for SaaS Dashboard',
    clientName: 'TechNova Solutions',
    clientLocation: 'Bengaluru, India (Remote)',
    verified: true,
    category: 'Web Development',
    type: 'Fixed Price',
    budget: '₹2,00,000 - ₹3,50,000',
    duration: '1-3 months',
    deadline: 'October 30, 2026',
    posted: '2 hours ago',
    timeRemaining: '5 days',
    applied: 12,
    maxApplicants: 20,
    requirements: [
      'Minimum 4 years of experience with React.js and modern hooks.',
      'Proficient in utility-first CSS frameworks, specifically Tailwind CSS.',
      'Proven experience building responsive, data-heavy SaaS dashboards.',
      'Strong understanding of RESTful API integration and Redux state management.'
    ],
    skills: ['React', 'Tailwind CSS', 'Redux', 'REST APIs', 'Figma'],
    description: `We are looking for an experienced frontend architect to rebuild our primary analytics dashboard from the ground up. 

The current dashboard is built on an outdated tech stack and suffers from performance issues when handling large datasets. Your goal will be to implement a modern, highly responsive, and accessible UI using React and Tailwind CSS. 

The API is fully documented and ready for consumption. We do not require any backend work for this role, strictly frontend execution.`,
    attachments: [
      { id: 1, name: 'dashboard_wireframes.pdf', type: 'pdf', size: '4.2 MB' },
      { id: 2, name: 'api_endpoints_v2.docx', type: 'doc', size: '1.1 MB' },
      { id: 3, name: 'current_ui_screenshot.png', type: 'image', size: '3.5 MB' }
    ]
  })

  const isFilled = project.applied >= project.maxApplicants

  const handleConfirmApplication = () => {
    setHasApplied(true)
    setIsApplyModalOpen(false)
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit mb-2"
        >
          <ArrowLeft size={16} /> Back to Feed
        </button>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
          
          {/* ==================== LEFT COLUMN: MAIN DETAILS (FREE LAYOUT) ==================== */}
          <div className="flex-1 w-full flex flex-col">
            
            {/* Top Meta & Title */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                <span className="bg-gray-100 px-2.5 py-1 rounded-sm text-gray-700">{project.category}</span>
                <span>•</span>
                <span>Posted {project.posted}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  By <span className="text-black">{project.clientName}</span>
                  {project.verified && <CheckCircle2 size={14} className="text-blue-600 fill-blue-50 ml-0.5" />}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">
                {project.title}
              </h1>
              
              {/* Key Highlights Bar */}
              <div className="flex flex-wrap items-center gap-x-12 gap-y-6 py-6 border-t border-b border-gray-200 bg-white">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Clock size={14} /> Duration
                  </p>
                  <p className="text-sm font-bold">{project.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Briefcase size={14} /> Project Type
                  </p>
                  <p className="text-sm font-bold">{project.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MapPin size={14} /> Location
                  </p>
                  <p className="text-sm font-bold">{project.clientLocation}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4">Project Description</h2>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>
            </div>

            {/* Requirements List */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4">Requirements</h2>
              <ul className="flex flex-col gap-3">
                {project.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#F5F216] mt-1 shrink-0"><CheckCircle2 size={16} className="text-black fill-[#F5F216]" /></span>
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Tags */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Attachments / Files */}
            <div className="mb-10 border-t border-gray-200 pt-8">
              <h2 className="text-lg font-bold mb-4">Project Files</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-sm hover:border-black transition-colors group cursor-pointer bg-gray-50/50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 bg-white border border-gray-200 text-black flex items-center justify-center rounded-sm shrink-0">
                        {file.type === 'image' ? <ImageIcon size={18} /> : <FileText size={18} />}
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{file.size}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 group-hover:text-black transition-colors shrink-0 p-2">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: STICKY EDITORIAL LAYOUT ==================== */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex flex-col shrink-0 lg:sticky lg:top-8 pb-10">
            
            {/* Clean Budget Focus */}
            <div className="mb-8 border border-gray-200 rounded-sm p-6 bg-gray-50/50">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Total Budget</p>
              <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
                {project.budget}
              </h2>
              <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-green-700 bg-green-100/50 w-fit px-2.5 py-1 rounded-sm border border-green-200">
                <ShieldCheck size={14} /> Payment Verified Escrow
              </div>
            </div>

            {/* Clean Stats Grid */}
            <div className="flex flex-col gap-6 mb-8">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="text-sm font-bold">Application Deadline</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-black">{project.deadline}</p>
                  <p className={`text-xs font-bold mt-0.5 ${isFilled ? 'text-red-500' : 'text-orange-600'}`}>
                    {isFilled ? 'Expired' : `${project.timeRemaining} remaining`}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} className="text-gray-400" />
                    <span className="text-sm font-bold">Applicants</span>
                  </div>
                  <span className="text-sm font-bold text-black">{project.applied} / {project.maxApplicants}</span>
                </div>
                {/* Thin, elegant progress bar */}
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isFilled ? 'bg-red-500' : 'bg-black'}`}
                    style={{ width: `${(project.applied / project.maxApplicants) * 100}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
              <button 
                onClick={() => setIsApplyModalOpen(true)}
                disabled={isFilled || hasApplied}
                className={`w-full py-4 text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2 ${
                  hasApplied
                    ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
                    : isFilled 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                      : 'bg-black text-[#F5F216] hover:bg-gray-800'
                }`}
              >
                {hasApplied ? (
                  <><CheckCircle2 size={18} /> Applied Successfully</>
                ) : isFilled ? (
                  'Applications Closed'
                ) : (
                  'Apply for this Job'
                )}
              </button>
              
              <button className="w-full py-4 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 rounded-sm border border-transparent">
                <HelpCircle size={16} /> Have a question? Contact us
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ==================== CONFIRM APPLICATION MODAL ==================== */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black text-lg">Confirm Application</h3>
              <button onClick={() => setIsApplyModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                You are about to apply for the <span className="font-bold text-black">{project.title}</span> role at <span className="font-bold text-black">{project.clientName}</span>. 
              </p>
              <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-sm">
                <p className="text-xs text-gray-500 mb-1">Your default application includes:</p>
                <ul className="text-sm font-medium text-gray-800 flex flex-col gap-1">
                  <li>• Your Hadei Freelancer Profile</li>
                  <li>• Your verified portfolio link</li>
                  <li>• Relevant skill match data</li>
                </ul>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmApplication}
                className="bg-black text-[#F5F216] px-6 py-2 text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Confirm & Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}