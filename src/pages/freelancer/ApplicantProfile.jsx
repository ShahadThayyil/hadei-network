import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle2, 
  MessageSquare,
  Globe,
  Award,
  ExternalLink,
  ThumbsUp,
  FileText,
  Briefcase,
  Link as LinkIcon,
  X
} from 'lucide-react'

export default function ApplicantProfile() {
  const { applicantId } = useParams()
  const navigate = useNavigate()

  // -----------------------------
  // MOCK DATA & STATES
  // -----------------------------
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false) // NEW STATE FOR MODAL

  useEffect(() => {
    // Simulate fetching the applicant's full profile details
    setTimeout(() => {
      setProfile({
        id: applicantId || 'app-101',
        name: 'Rahul Krishnan',
        role: 'Senior React Specialist & UI Architect',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        location: 'Bengaluru, India',
        appliedAt: '2 hours ago',
        badge: 'Top Rated Plus',
        level: 3,
        category: 'Frontend Development',
        experience: '4 Years',
        completedProjects: 42,
        successRate: '98%',
        proposal: `Hi there!\n\nI reviewed your requirements for the Frontend UI Integration. Given that the backend API is already complete and fully documented in Swagger, I can hit the ground running immediately.\n\nI have spent the last 4 years building complex React applications and e-commerce checkouts. I heavily utilize Tailwind CSS and Redux Toolkit, ensuring state is managed efficiently across the product grid and multi-step cart.\n\nI am available to join your daily 10:00 AM IST syncs. Let me know if you'd like to jump on a quick call to discuss the Figma files.`,
        about: `I am a passionate Frontend Developer specializing in React, Next.js, and modern CSS frameworks. My primary focus is building scalable, accessible, and highly performant web applications. \n\nBefore transitioning to freelance full-time, I worked as a lead UI engineer at a prominent SaaS company, overseeing a design system used by millions of users. I write clean, maintainable code and always prioritize user experience.`,
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Figma', 'REST APIs', 'Jest'],
        languages: ['English (Fluent)', 'Hindi (Native)', 'Malayalam (Conversational)'],
        
        // NEW: Social Links Data
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com' },
          { platform: 'LinkedIn', url: 'https://linkedin.com' },
          { platform: 'Portfolio Website', url: 'https://portfolio.com' }
        ],

        portfolio: [
          { id: 1, title: 'Modern SaaS Analytics Dashboard', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop' },
          { id: 2, title: 'E-commerce Furniture Store', img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=400&auto=format&fit=crop' }
        ],
        recentHistory: [
          { 
            id: 'job-1', 
            title: 'React Developer for FinTech Panel', 
            date: 'Aug 2026', 
            feedback: 'Rahul is an absolute professional. Delivered pixel-perfect screens a week ahead of schedule.' 
          },
          { 
            id: 'job-2', 
            title: 'Next.js Landing Page Optimization', 
            date: 'Jul 2026', 
            feedback: 'Great communication and solid code quality. Would definitely hire again.' 
          }
        ]
      })
      setIsLoading(false)
    }, 600)
  }, [applicantId])

  // NEW: Confirm Approval Logic
  const confirmApproval = () => {
    setIsApproveModalOpen(false)
    alert(`You have approved ${profile.name}! They will be notified to begin the collaboration.`)
    navigate(-1) // Send them back to the applicants list
  }

  if (isLoading || !profile) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white text-black">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider animate-pulse">Loading Profile...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar relative">
      
      <div className="w-full max-w-[1200px] mx-auto flex flex-col">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit mb-8"
        >
          <ArrowLeft size={16} /> Back to Applicants
        </button>

        {/* ==================== HERO SECTION (FREE LAYOUT) ==================== */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-200 pb-10 mb-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border border-gray-200"
              />
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
                <CheckCircle2 size={24} className="text-blue-600 fill-blue-50" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                {profile.name}
              </h1>
              <p className="text-lg text-gray-700 font-medium mb-4">
                {profile.role}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {profile.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> Applied {profile.appliedAt}</span>
                <span className="flex items-center gap-1.5 text-yellow-600">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" /> {profile.badge} • Lvl {profile.level}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <button 
              onClick={() => setIsApproveModalOpen(true)} // UPDATED: Opens modal
              className="w-full md:w-48 bg-black text-[#F5F216] px-6 py-3.5 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Approve Applicant
            </button>
            <button className="w-full md:w-48 bg-white border border-gray-200 text-black px-6 py-3.5 rounded-sm text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={16} /> Message
            </button>
          </div>

        </header>

        {/* ==================== CONTENT GRID (FREE LAYOUT) ==================== */}
        <div className="flex flex-col lg:flex-row items-start">
          
          {/* LEFT COLUMN: MAIN CONTENT */}
          <div className="flex-1 w-full flex flex-col lg:border-r lg:border-gray-200 lg:pr-12 xl:pr-16">
            
            {/* The Proposal */}
            <section className="mb-12">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                <FileText size={16} className="text-gray-400" /> Cover Letter / Proposal
              </div>
              <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-medium pl-4 border-l-2 border-black">
                {profile.proposal}
              </div>
            </section>

            {/* About / Bio */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {profile.about}
              </div>
            </section>

            {/* Portfolio Grid */}
            <section className="mb-12">
              <h2 className="text-xl font-bold mb-6">Portfolio Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {profile.portfolio.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="w-full h-48 bg-gray-100 rounded-sm mb-3 overflow-hidden border border-gray-200">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-sm font-bold text-black flex items-center justify-between">
                      {item.title}
                      <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Work History */}
            <section className="mb-12 lg:mb-0">
              <h2 className="text-xl font-bold mb-6">Recent Work History</h2>
              <div className="flex flex-col gap-6">
                {profile.recentHistory.map((job) => (
                  <div key={job.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold text-black">{job.title}</h3>
                      <span className="text-xs font-bold text-gray-500">{job.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic">"{job.feedback}"</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: META DETAILS */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex flex-col shrink-0 mt-12 lg:mt-0 lg:pl-12 xl:pl-16">
            
            {/* Quick Stats */}
            <section className="mb-10">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6">Freelancer Stats</h3>
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Briefcase size={16} /> Category</span>
                  <span className="text-sm font-bold text-black">{profile.category}</span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Award size={16} /> Experience</span>
                  <span className="text-sm font-bold text-black">{profile.experience}</span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><CheckCircle2 size={16} /> Completed Projects</span>
                  <span className="text-lg font-bold text-black">{profile.completedProjects}</span>
                </div>
                <div className="flex justify-between items-end pb-3">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><ThumbsUp size={16} /> Job Success</span>
                  <span className="text-lg font-bold text-black">{profile.successRate}</span>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-10">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Verified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-50 border border-gray-200 text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="mb-10">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe size={16} /> Languages
              </h3>
              <ul className="flex flex-col gap-3">
                {profile.languages.map((lang, index) => (
                  <li key={index} className="text-sm font-bold text-black">
                    {lang}
                  </li>
                ))}
              </ul>
            </section>

            {/* NEW: Links & Socials */}
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <section>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <LinkIcon size={16} /> Links & Socials
                </h3>
                <div className="flex flex-col gap-3">
                  {profile.socialLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black transition-colors"
                    >
                      <ExternalLink size={14} className="text-gray-400" /> {link.platform}
                    </a>
                  ))}
                </div>
              </section>
            )}

          </div>

        </div>
      </div>

      {/* ==================== CONFIRM APPROVAL MODAL ==================== */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h3 className="font-bold text-black text-lg">Confirm Approval</h3>
              <button 
                onClick={() => setIsApproveModalOpen(false)} 
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-700 leading-relaxed">
                Are you sure you want to approve <span className="font-bold text-black">{profile.name}</span> for this collaboration? 
              </p>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-sm">
                <p className="text-xs font-medium text-blue-800 leading-relaxed">
                  Approving this applicant will notify them to accept the project and begin work. Ensure you have reviewed their proposal and portfolio thoroughly.
                </p>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsApproveModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmApproval}
                className="bg-black text-[#F5F216] px-6 py-2.5 text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Confirm & Approve
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}