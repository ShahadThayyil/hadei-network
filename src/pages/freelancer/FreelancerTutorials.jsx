import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayCircle, Trophy, Medal, X, ArrowRight } from 'lucide-react'

export default function FreelancerTutorials() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expertRequestText, setExpertRequestText] = useState('')

  // Mock data for the 8 onboarding videos
  const [videos] = useState([
    { id: 1, title: 'Introduction to the Network', duration: '2:15', progress: 100, completed: true },
    { id: 2, title: 'Setting Up a Winning Profile', duration: '4:30', progress: 100, completed: true },
    { id: 3, title: 'How Our Escrow System Works', duration: '3:45', progress: 45, completed: false },
    { id: 4, title: 'Communicating with Clients', duration: '5:20', progress: 0, completed: false },
    { id: 5, title: 'Submitting Milestones', duration: '2:50', progress: 0, completed: false },
    { id: 6, title: 'Managing Revisions & Feedback', duration: '4:10', progress: 0, completed: false },
    { id: 7, title: 'Understanding Platform Fees', duration: '3:15', progress: 0, completed: false },
    { id: 8, title: 'Growing Your Freelance Business', duration: '6:00', progress: 0, completed: false },
  ])

  const completedCount = videos.filter(v => v.completed).length
  const totalVideos = videos.length
  const overallProgress = (completedCount / totalVideos) * 100

  const handleVideoClick = (id) => {
    // In the real app, this will navigate to the dedicated video player page you requested
    navigate(`/tutorial/watch/${id}`)
  }

  const handleExpertSubmit = () => {
    // Submit logic here
    navigate('/freelancer/dashboard/home')
    setIsModalOpen(false)
    setExpertRequestText('')
  }

  return (
    <div className="min-h-screen w-full bg-white font-sans text-black">
      
      {/* Exact Navbar Provided */}
      <header className="sticky top-0 w-full bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between z-30">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dmtzmgbkj/image/upload/v1780479006/f_webp/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png"
            alt="Platform Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <button className="text-sm font-semibold text-black border border-gray-300 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">
          Save & Exit
        </button>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-8 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Platform Orientation</h1>
            <p className="text-sm text-gray-500">Welcome, Muhammed Shahad. Watch these quick guides to understand how the platform works.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-sm font-semibold text-black border border-gray-300 bg-white px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors shrink-0"
          >
            Are you an expert?
          </button>
        </div>

        {/* Progress & Badge Section */}
        <div className="bg-white border border-gray-200 rounded-sm p-5 mb-8 flex flex-col md:flex-row items-center gap-6">
          {/* Level Info */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 bg-[#F5F216] rounded-full flex items-center justify-center border-2 border-black">
              <Medal className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Current Status</p>
              <h2 className="text-lg font-bold">Unverified User</h2>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200"></div>

          {/* Progress Bar */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-sm font-bold text-black">Unlock Level 1 & Verified Badge</p>
                <p className="text-xs text-gray-500">Complete all {totalVideos} videos to activate your account features.</p>
              </div>
              <span className="text-sm font-bold">{completedCount} / {totalVideos} Watched</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-sm overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-1000 ease-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* YouTube Style Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="flex flex-col text-left group cursor-pointer"
              onClick={() => handleVideoClick(video.id)}
            >
              {/* Thumbnail Container (YouTube Style) */}
              <div className="w-full aspect-video bg-gray-100 rounded-sm relative overflow-hidden mb-3 border border-gray-200 group-hover:border-black transition-colors">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className={`w-10 h-10 ${video.completed ? 'text-[#F5F216]' : 'text-gray-400 group-hover:text-black'} transition-colors duration-200`} />
                </div>
                
                {/* Duration Tag */}
                <div className="absolute bottom-1.5 right-1.5 bg-black/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  {video.duration}
                </div>

                {/* Progress Bar under thumbnail (Like YouTube red bar) */}
                {video.progress > 0 && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
                    <div 
                      className="h-full bg-[#F5F216]" 
                      style={{ width: `${video.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <h3 className="font-bold text-sm text-black leading-snug line-clamp-2">
                {video.id}. {video.title}
              </h3>
              
              <div className="mt-1 flex items-center gap-1.5">
                {video.completed ? (
                  <span className="text-xs font-semibold text-black bg-[#F5F216] px-1.5 py-0.5 rounded-sm">
                    Watched
                  </span>
                ) : video.progress > 0 ? (
                  <span className="text-xs font-semibold text-gray-600">
                    {video.progress}% Watched
                  </span>
                ) : (
                  <span className="text-xs font-medium text-gray-400">
                    Unwatched
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Final Next Button (Appears only when all videos are completed) */}
        {overallProgress === 100 && (
          <div className="mt-12 flex justify-end border-t border-gray-200 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => navigate('/dashboard/freelancer')}
              className="bg-black text-white px-8 py-3 rounded-sm text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              Continue to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* ==================== EXPERT VERIFICATION MODAL ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-sm border border-gray-200 flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-black flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#F5F216]" /> Request Expert Verification
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                If you are an established professional, you can request a manual profile review. If approved, your account level will be manually set, and you can skip these orientation tutorials.
              </p>

              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Provide context for the admin team
                </label>
                <textarea 
                  rows={4}
                  placeholder="E.g., I have 5+ years of experience in MERN stack development..."
                  value={expertRequestText}
                  onChange={(e) => setExpertRequestText(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2 text-sm text-black transition-colors focus:border-black focus:outline-none placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-200 rounded-sm transition-colors border border-transparent"
              >
                Cancel
              </button>
              <button 
                onClick={handleExpertSubmit}
                className="px-6 py-2 text-sm font-semibold bg-black text-[#F5F216] rounded-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Submit Request <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}