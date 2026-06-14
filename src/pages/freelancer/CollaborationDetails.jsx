import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon, 
  Download,
  AlertCircle,
  ShieldCheck,
  MessageSquare
} from 'lucide-react'

export default function CollaborationDetails() {
  const { collabId } = useParams() // Must match the variable name in App.jsx Route
  const navigate = useNavigate()

  const [job, setJob] = useState(null)

  // -----------------------------
  // MOCK DATA REPOSITORY
  // -----------------------------
  const allCollabJobs = [
    {
      id: 'cj-1',
      title: 'Frontend UI Integration for E-commerce',
      posterName: 'Alex Mercer',
      posterRole: 'Senior Full-Stack Developer',
      posterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      budgetCut: '30%',
      type: 'Fixed Price',
      deadline: 'Nov 10, 2026',
      postedAt: '2 hours ago',
      applicants: 4,
      skills: ['React', 'Tailwind CSS', 'Redux', 'Next.js', 'REST APIs'],
      description: `I am currently handling a large-scale e-commerce redesign and need another frontend developer to help me integrate the product listing and checkout flows to meet a tight deadline. \n\nThe backend API is already complete and fully documented via Swagger. The design system is established in Figma, and the base Next.js repository is already configured with Tailwind CSS.\n\nYour primary responsibilities will be:\n- Building the dynamic product grid with filtering and sorting capabilities.\n- Implementing the multi-step checkout flow (Cart -> Shipping -> Payment -> Success).\n- Ensuring 100% mobile responsiveness for these specific pages.\n\nI am looking to split the workload fairly. The total project budget is ₹1,50,000, and I am offering a 30% cut for this specific scope of work.`,
      requirements: [
        'Must have at least 2 years of experience with React and Next.js.',
        'Strong understanding of global state management (Redux Toolkit).',
        'Ability to write clean, utility-first CSS with Tailwind.',
        'Previous experience building e-commerce carts or checkout flows is highly preferred.',
        'Must be able to join daily 15-minute sync calls at 10:00 AM IST.'
      ],
      files: [
        { id: 'f1', name: 'UI_Design_System.pdf', size: '4.2 MB', type: 'document' },
        { id: 'f2', name: 'Checkout_Flow_Diagram.png', size: '1.8 MB', type: 'image' },
        { id: 'f3', name: 'API_Endpoints_List.pdf', size: '850 KB', type: 'document' }
      ]
    },
    {
      id: 'cj-2',
      title: 'Backend API Optimization',
      posterName: 'Priya Sharma',
      posterRole: 'Backend Architect',
      posterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      budgetCut: '40%',
      type: 'Milestone Based',
      deadline: 'Oct 30, 2026',
      postedAt: '5 hours ago',
      applicants: 2,
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'SQL'],
      description: `My current queries are too slow for the scale of data the client is expecting. I need a backend specialist to write optimized raw SQL queries and implement Redis caching to handle heavy read loads.\n\nYou will be working directly with the existing Node.js monolithic architecture.`,
      requirements: [
        'Expertise in PostgreSQL optimization and indexing.',
        'Experience setting up and managing Redis instances.',
        'Deep understanding of Node.js event loops and performance tuning.'
      ],
      files: [
        { id: 'f4', name: 'DB_Schema.pdf', size: '1.1 MB', type: 'document' },
        { id: 'f5', name: 'Slow_Queries_Log.txt', size: '45 KB', type: 'document' }
      ]
    },
    {
      id: 'cj-3',
      title: 'GSAP Scroll Animations',
      posterName: 'Jordan Lee',
      posterRole: 'Creative Director',
      posterAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
      budgetCut: '15%',
      type: 'Hourly',
      deadline: 'Oct 25, 2026',
      postedAt: '1 day ago',
      applicants: 8,
      skills: ['GSAP', 'HTML/CSS', 'JavaScript'],
      description: `The layout is fully built, but the client wants complex, physics-based scroll animations (pinning, horizontal scroll sections). I need an animation expert to knock this out quickly. You will not need to write structural CSS, only the GSAP timeline logic.`,
      requirements: [
        'Proven portfolio of high-end GSAP animations.',
        'Experience with GSAP ScrollTrigger plugin.',
        'Ability to ensure 60fps performance on mobile devices.'
      ],
      files: [
        { id: 'f6', name: 'Animation_References.mp4', size: '12 MB', type: 'document' } // document type fallback
      ]
    },
    {
      id: 'cj-4',
      title: 'Figma to React Native (3 Screens)',
      posterName: 'Nadia Hassan',
      posterRole: 'Mobile App Developer',
      posterAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      budgetCut: '25%',
      type: 'Fixed Price',
      deadline: 'Nov 05, 2026',
      postedAt: '2 days ago',
      applicants: 1,
      skills: ['React Native', 'Figma', 'Expo', 'Style components'],
      description: `I am handling the logic and API integration, but I need someone to translate the Wallet, Settings, and Profile screens from Figma into pixel-perfect React Native components.\n\nI will provide all the necessary design assets and a clean boilerplate Expo project.`,
      requirements: [
        'Pixel-perfect attention to detail from Figma to code.',
        'Experience with modern React Native styling techniques.',
        'Ability to work independently and deliver clean components.'
      ],
      files: [
        { id: 'f7', name: 'Screens_Preview.png', size: '3.2 MB', type: 'image' }
      ]
    }
  ]

  useEffect(() => {
    // Find the job that matches the URL parameter
    const foundJob = allCollabJobs.find(job => job.id === collabId)
    setJob(foundJob)
  }, [collabId])

  if (!job) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white text-black">
        <AlertCircle size={32} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">The collaboration request you are looking for does not exist.</p>
        <button 
          onClick={() => navigate('/freelancer/dashboard/collaboration')}
          className="bg-black text-[#F5F216] px-6 py-2.5 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          Return to Hub
        </button>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit mb-2"
        >
          <ArrowLeft size={16} /> Back to Collaboration Hub
        </button>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
          
          {/* ==================== LEFT COLUMN: MAIN CONTENT ==================== */}
          <div className="flex-1 w-full flex flex-col">
            
            {/* Top Meta & Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <Clock size={12} /> Posted {job.postedAt}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">
                {job.title}
              </h1>
              
              {/* Poster Quick Info */}
              <div className="flex items-center gap-4 py-4 border-y border-gray-100 mb-8">
                <img src={job.posterAvatar} alt={job.posterName} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{job.posterRole}</p>
                  <p className="text-sm font-bold text-black flex items-center gap-2">
                    {job.posterName}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4">Task Description</h2>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                {job.description}
              </div>
            </div>

            {/* Requirements List */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4">Requirements & Expectations</h2>
              <ul className="flex flex-col gap-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-700 font-medium bg-gray-50 p-3 rounded-sm border border-gray-100">
                    <CheckCircle2 size={18} className="text-black shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Tags */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-white border border-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Attachments / Files */}
            <div className="mb-10 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-bold mb-4">Project Files & References</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-sm bg-gray-50 hover:border-black transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 bg-white border border-gray-200 text-black flex items-center justify-center rounded-sm shrink-0">
                        {file.type === 'image' ? <ImageIcon size={18} /> : <FileText size={18} />}
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-bold text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{file.size} • {file.type === 'image' ? 'Image' : 'Document'}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-black transition-colors shrink-0 p-2">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: STICKY EDITORIAL LAYOUT ==================== */}
          <div className="w-full lg:w-[320px] xl:w-[340px] flex flex-col shrink-0 lg:sticky lg:top-8 pb-10">
            
            {/* Big Budget Focus (Free Layout) */}
            <div className="mb-8">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Offered Budget Cut</p>
              <h2 className="text-4xl xl:text-5xl font-black text-black tracking-tighter leading-none mb-4">
                {job.budgetCut}
              </h2>
              
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-50 w-fit px-2.5 py-1 rounded-sm uppercase tracking-wider">
                <ShieldCheck size={12} /> Escrow Protected
              </div>
            </div>

            {/* Clean Stats Grid */}
            <div className="flex flex-col gap-5 mb-8">
              
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <Briefcase size={16} />
                  <span className="text-sm font-bold">Job Type</span>
                </div>
                <p className="text-sm font-bold text-black">{job.type}</p>
              </div>

              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={16} />
                  <span className="text-sm font-bold">Deadline</span>
                </div>
                <p className="text-sm font-bold text-black">{job.deadline}</p>
              </div>

              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500">
                  <AlertCircle size={16} />
                  <span className="text-sm font-bold">Applicants</span>
                </div>
                <p className="text-sm font-bold text-black">{job.applicants} People</p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 text-sm font-bold bg-black text-[#F5F216] rounded-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Submit Proposal
              </button>
              
              <button className="w-full py-4 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Message {job.posterName.split(' ')[0]}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}