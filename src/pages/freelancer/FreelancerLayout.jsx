import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Home, 
  FolderGit2, 
  MessageSquare, 
  Activity, 
  Compass, 
  Wallet, 
  Briefcase, 
  LayoutGrid, 
  X, 
  Bell, 
  Hash,
  LogOut,
  Moon
} from 'lucide-react'

export default function FreelancerLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  const notifRef = useRef(null)

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    navigate('/login')
  }

  // --- NAVIGATION LISTS ---
  const topNav = [
    { id: 'home', icon: Home, path: '/freelancer/dashboard/home', label: 'Home' },
    { id: 'projects', icon: FolderGit2, path: '/freelancer/dashboard/projects', label: 'Projects' },
    { id: 'chats', icon: MessageSquare, path: '/freelancer/dashboard/messages', label: 'Chats' },
    { id: 'status', icon: Activity, path: '/freelancer/dashboard/job-status', label: 'Jobs' },
  ]

  const bottomNav = [
    { id: 'other-jobs', icon: Compass, path: '/freelancer/dashboard/collaboration', label: 'Collab' },
    { id: 'my-jobs', icon: Briefcase, path: '/freelancer/dashboard/posted-collabs', label: 'My Jobs' },
    { id: 'wallet', icon: Wallet, path: '/freelancer/dashboard/payments', label: 'Wallet' },
  ]

  const mobileBottomNav = [
    { id: 'home', icon: Home, path: '/freelancer/dashboard/home', label: 'Home' },
    { id: 'chats', icon: MessageSquare, path: '/freelancer/dashboard/messages', label: 'Chats' },
    { id: 'profile', icon: null, path: '/freelancer/dashboard/profile', label: 'Profile' },
  ]

  const mobileDrawerNav = [
    { id: 'projects', icon: FolderGit2, path: '/freelancer/dashboard/projects', label: 'Projects' },
    { id: 'status', icon: Activity, path: '/freelancer/dashboard/status', label: 'Jobs' },
    { id: 'other-jobs', icon: Compass, path: '/freelancer/dashboard/other-jobs', label: 'Collaborations' },
    { id: 'my-jobs', icon: Briefcase, path: '/freelancer/dashboard/my-jobs', label: 'My Jobs' },
    { id: 'wallet', icon: Wallet, path: '/freelancer/dashboard/payments', label: 'Wallet' },
  ]

  // Dummy Notifications
  const notifications = [
    { id: 1, text: 'TechNova Solutions accepted your proposal!', time: '10m ago', unread: true },
    { id: 2, text: 'New message from Elevate Commerce', time: '1h ago', unread: true },
    { id: 3, text: 'Your milestone was approved.', time: '2d ago', unread: false },
  ]

  // Helper to determine active route (Fixed to support both exact /home and root dashboard path)
const isRouteActive = (path) => {
    const currentPath = location.pathname.replace(/\/$/, '') // Remove trailing slash if any
    
    if (path === '/freelancer/dashboard/home') {
      // Makes it active for exactly /dashboard, exactly /home, AND any nested routes like /home/jobs/123
      return currentPath === '/freelancer/dashboard' || currentPath.startsWith('/freelancer/dashboard/home')
    }
    return currentPath.startsWith(path)
  }

  // Helper to get current page title for the top bar
  const getCurrentPageTitle = () => {
    const allLinks = [...topNav, ...bottomNav, { path: '/freelancer/dashboard/profile', label: 'Profile' }]
    const activeLink = allLinks.find(link => isRouteActive(link.path))
    return activeLink ? activeLink.label : 'Platform'
  }

  const profilePic = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"

  return (
    <div className="flex h-screen w-full bg-white font-sans overflow-hidden border-none">
      
      {/* ==================== DESKTOP PLATFORM SIDEBAR (FIXED THIN RAIL) ==================== */}
      <aside className="hidden md:flex flex-col w-[76px] h-full bg-[#111111] shrink-0 border-r border-[#222222] py-4 items-center z-50 overflow-hidden">
        
        {/* Adjusted Logo */}
        <div className="mb-4 px-2 flex justify-center w-full mt-1">
          <img
            src="https://res.cloudinary.com/dmtzmgbkj/image/upload/v1780479006/f_webp/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png"
            alt="Hadei Network"
            className="w-14 h-10 object-contain filter invert opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </div>

        {/* Top Navigation Area */}
        <div className="flex flex-col gap-2 w-full px-2 mt-2">
          {topNav.map((item) => {
            const isActive = isRouteActive(item.path)
            return (
              <Link 
                key={item.id} 
                to={item.path}
                className={`w-full h-12 flex flex-col items-center justify-center rounded-sm transition-colors relative ${
                  isActive ? 'bg-[#2A2D31] text-white' : 'text-gray-400 hover:bg-[#222222] hover:text-gray-200'
                }`}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[px] h-3/4 bg-[#F5F216] rounded-r-sm"></div>
                )}
                <item.icon 
                  size={18} 
                  className={isActive ? 'text-white' : 'text-gray-400'} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                <span className={`text-[9px] mt-1 tracking-wide ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Navigation Area */}
        <div className="flex flex-col gap-1 w-full px-2">
          {bottomNav.map((item) => {
            const isActive = isRouteActive(item.path)
            return (
              <Link 
                key={item.id} 
                to={item.path}
                className={`w-full h-12 flex flex-col items-center justify-center rounded-sm transition-colors relative mt-2 ${
                  isActive ? 'bg-[#2A2D31] text-white' : 'text-gray-400 hover:bg-[#222222] hover:text-gray-200'
                }`}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2  h-3/4 bg-[#F5F216] rounded-r-sm"></div>
                )}
                <item.icon 
                  size={18} 
                  className={isActive ? 'text-white' : 'text-gray-400'} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                <span className={`text-[9px] mt-1 tracking-wide ${isActive ? 'font-bold text-white' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Theme Switcher & Profile with extra spacing */}
        <div className="w-full flex flex-col items-center gap-5 mt-auto pt-16 px-2 pb-4 border-t border-[#222222]/50">
          <button className="w-9 h-9 rounded-sm bg-[#1A1A1A] hover:bg-[#2A2D31] text-gray-400 hover:text-white transition-colors flex items-center justify-center">
            <Moon size={16} />
          </button>
          
          <Link 
            to="/freelancer/dashboard/profile"
            className="w-full flex items-center justify-center relative group"
            title="Profile"
          >
             {isRouteActive('/freelancer/dashboard/profile') && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#F5F216] rounded-r-sm z-10"></div>
              )}
            <img 
              src={profilePic} 
              alt="Profile" 
              className={`w-9 h-9 rounded-full object-cover border-2 transition-colors ${
                isRouteActive('/freelancer/dashboard/profile') ? 'border-white' : 'border-transparent group-hover:border-gray-500'
              }`} 
            />
          </Link>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT WRAPPER ==================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-white pb-16 md:pb-0 h-full overflow-hidden"> 
        
        {/* Platform "Channel" Header */}
        <header className="flex-shrink-0 h-14 w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-30">
          
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gray-600 hover:text-black transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <LayoutGrid size={24} />
            </button>
            
            {/* Logo in top bar for mobile */}
            <div className="md:hidden flex items-center mr-2">
              <img
                src="https://res.cloudinary.com/dmtzmgbkj/image/upload/v1780479006/f_webp/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png"
                alt="Hadei Network"
                className="h-6 w-auto object-contain"
              />
            </div>

            {/* Title for Desktop */}
            <div className="hidden md:flex items-center gap-2 text-black">
              <Hash size={18} className="text-gray-400" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                {getCurrentPageTitle()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`relative p-2 rounded-sm transition-colors ${isNotificationOpen ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
            >
              <Bell size={18} />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5F216] rounded-full border border-white"></span>
              )}
            </button>

            {/* Notification Panel (No Shadows) */}
            {isNotificationOpen && (
              <div className="absolute top-12 right-0 w-80 bg-white border border-gray-200 rounded-sm z-50 flex flex-col">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <h3 className="text-sm font-bold text-black">Notifications</h3>
                  <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? 'bg-gray-50/50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          {notif.unread ? (
                            <div className="w-2 h-2 bg-[#F5F216] rounded-full"></div>
                          ) : (
                            <div className="w-2 h-2 bg-transparent"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${notif.unread ? 'font-semibold text-black' : 'text-gray-700'}`}>{notif.text}</p>
                          <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-4 py-3 text-xs font-bold text-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors border-t border-gray-200">
                  View All Notifications
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50 relative custom-scrollbar h-full">
          <Outlet />
        </main>

      </div>

      {/* ==================== MOBILE BOTTOM NAV (Instagram Style) ==================== */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 z-50 pb-safe">
        {mobileBottomNav.map((item) => {
          const isActive = isRouteActive(item.path)
          
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.id === 'profile' ? (
                <div className={`rounded-full p-[2px] ${isActive ? 'border border-black' : 'border border-transparent'}`}>
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full object-cover" 
                  />
                </div>
              ) : (
                <item.icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={isActive ? 'fill-black/5' : ''} 
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* ==================== MOBILE DRAWER MENU ==================== */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div className="relative w-[260px] h-full bg-[#111111] flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-16 flex items-center justify-between px-5 border-b border-[#222222]">
              <img
                src="https://res.cloudinary.com/dmtzmgbkj/image/upload/v1780479006/f_webp/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png"
                alt="Hadei Network"
                className="h-6 w-auto object-contain filter invert opacity-90"
              />
              <button 
                className="text-gray-400 hover:text-white transition-colors p-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
               <div className="flex flex-col gap-1">
                  <h3 className="px-3 mb-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Workspace</h3>
                  {mobileDrawerNav.map(item => {
                    const isActive = isRouteActive(item.path)
                    return (
                      <Link 
                        key={item.id} 
                        to={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg ${isActive ? 'bg-[#222222] text-[#F5F216] font-bold' : 'text-gray-400 font-medium hover:bg-[#1A1A1A] hover:text-gray-200 transition-colors'}`}
                      >
                        <item.icon size={20} /> <span>{item.label}</span>
                      </Link>
                    )
                  })}
               </div>
               
               <div className="mt-auto flex flex-col gap-2 border-t border-[#222222] pt-6">
                 {/* Theme Switcher Mobile */}
                 <button 
                   className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-gray-400 hover:text-white hover:bg-[#1A1A1A] transition-colors"
                 >
                   <Moon size={20} /> <span className="font-medium">Dark Mode</span>
                 </button>
                 
                 <button 
                   onClick={handleLogout}
                   className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-gray-400 hover:text-red-400 hover:bg-[#1A1A1A] transition-colors"
                 >
                   <LogOut size={20} /> <span className="font-medium">Logout</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}