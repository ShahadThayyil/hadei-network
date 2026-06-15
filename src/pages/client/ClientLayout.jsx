import { useState, useEffect, useRef } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Briefcase, MessageSquare, Wallet, Moon, Bell, LayoutGrid, X, LogOut, PlusCircle, Hash, Users } from 'lucide-react'

export default function ClientLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const notifRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotificationOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const topNav = [
    { id: 'home', icon: Home, path: '/client/dashboard/home', label: 'Home' },
    { id: 'my-jobs', icon: Briefcase, path: '/client/dashboard/my-jobs', label: 'My Jobs' },
    { id: 'applicants', icon: Users, path: '/client/dashboard/applicants/CON-2026-88', label: 'Applicants' }, // Added default ID for testing
    { id: 'chats', icon: MessageSquare, path: '/client/dashboard/messages', label: 'Chats' },
  ]
  const bottomNav = [
    { id: 'wallet', icon: Wallet, path: '/client/dashboard/payments', label: 'Wallet' },
  ]

  const isRouteActive = (path) => {
    const currentPath = location.pathname.replace(/\/$/, '')
    if (path === '/client/dashboard/home') return currentPath === '/client/dashboard' || currentPath.startsWith('/client/dashboard/home')
    return currentPath.startsWith(path)
  }

  const getCurrentPageTitle = () => {
    const allLinks = [...topNav, ...bottomNav, { path: '/client/dashboard/profile', label: 'Profile' }, { path: '/client/dashboard/post', label: 'Post Job' }]
    const activeLink = allLinks.find(link => isRouteActive(link.path))
    return activeLink ? activeLink.label : 'Platform'
  }

  const profilePic = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"

  // Realistic Notifications for Client Lifecycle
  const notifications = [
    { id: 1, text: 'You have 4 new applicants for Senior React Developer.', time: '10m ago', unread: true },
    { id: 2, text: 'Neha M. has submitted Milestone 1 for review.', time: '1h ago', unread: true },
    { id: 3, text: 'Escrow payment of ₹45,000 released successfully.', time: '2d ago', unread: false },
  ]

  return (
    <div className="flex h-screen w-full bg-white font-sans overflow-hidden border-none">
      
      {/* ==================== DESKTOP SIDEBAR ==================== */}
      <aside className="hidden md:flex flex-col w-[76px] h-full bg-[#111111] shrink-0 border-r border-[#222222] py-4 items-center z-50">
        <div className="mb-4 px-2 flex justify-center w-full mt-1 cursor-pointer" onClick={() => navigate('/client/dashboard/home')}>
          <img src="https://res.cloudinary.com/dmtzmgbkj/image/upload/v1780479006/f_webp/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png" alt="Hadei" className="w-14 h-10 object-contain filter invert opacity-90" />
        </div>

        <div className="flex flex-col gap-2 w-full px-2 mt-2">
          {topNav.map((item) => (
            <Link key={item.id} to={item.path} className={`w-full h-12 flex flex-col items-center justify-center rounded-sm transition-colors relative ${isRouteActive(item.path) ? 'bg-[#2A2D31] text-white' : 'text-gray-400 hover:bg-[#222222] hover:text-gray-200'}`}>
              {isRouteActive(item.path) && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-[#F5F216] rounded-r-sm"></div>}
              <item.icon size={18} />
              <span className="text-[9px] mt-1 tracking-wide font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="flex-1" />
        
        <div className="flex flex-col gap-2 w-full px-2">
          {bottomNav.map((item) => (
            <Link key={item.id} to={item.path} className={`w-full h-12 flex flex-col items-center justify-center rounded-sm transition-colors relative ${isRouteActive(item.path) ? 'bg-[#2A2D31] text-white' : 'text-gray-400 hover:bg-[#222222]'}`}>
              {isRouteActive(item.path) && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-[#F5F216] rounded-r-sm"></div>}
              <item.icon size={18} />
              <span className="text-[9px] mt-1 tracking-wide font-medium">{item.label}</span>
            </Link>
          ))}
          <Link to="/client/dashboard/post" className={`w-full h-12 flex flex-col items-center justify-center rounded-sm transition-colors relative ${isRouteActive('/client/dashboard/post') ? 'bg-[#2A2D31] text-white' : 'text-gray-400 hover:text-[#F5F216] hover:bg-[#222222]'}`}>
             {isRouteActive('/client/dashboard/post') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-[#F5F216] rounded-r-sm"></div>}
            <PlusCircle size={18} />
            <span className="text-[9px] mt-1 tracking-wide font-medium">Post Job</span>
          </Link>
        </div>

        <div className="w-full flex flex-col items-center gap-5 mt-auto pt-8 px-2 pb-4 border-t border-[#222222]/50">
          <Link to="/client/dashboard/profile" className="w-full flex items-center justify-center relative group">
             {isRouteActive('/client/dashboard/profile') && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#F5F216] rounded-r-sm z-10"></div>}
            <img src={profilePic} alt="Profile" className={`w-9 h-9 rounded-full object-cover border-2 ${isRouteActive('/client/dashboard/profile') ? 'border-white' : 'border-transparent group-hover:border-gray-500'}`} />
          </Link>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT WRAPPER ==================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-white pb-16 md:pb-0 h-full overflow-hidden"> 
        <header className="flex-shrink-0 h-14 w-full bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-600 p-1" onClick={() => setIsMobileMenuOpen(true)}>
              <LayoutGrid size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 text-black">
              <Hash size={18} className="text-gray-400" />
              <h2 className="text-base sm:text-lg font-bold tracking-tight">{getCurrentPageTitle()}</h2>
            </div>
          </div>
          <div className="flex items-center gap-4 relative" ref={notifRef}>
            <button onClick={() => setIsNotificationOpen(!isNotificationOpen)} className={`relative p-2 rounded-sm transition-colors ${isNotificationOpen ? 'bg-gray-100 text-black' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>
              <Bell size={18} />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444] border border-white"></span>
              )}
            </button>

            {/* Notification Panel */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-sm shadow-xl z-50 flex flex-col">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider">Alerts</h3>
                  <button className="text-[10px] text-gray-400 hover:text-black font-bold uppercase">Clear All</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar flex flex-col">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${notif.unread ? 'bg-gray-50/50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0">
                          <div className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-[#F5F216]' : 'bg-transparent'}`}></div>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${notif.unread ? 'font-semibold text-black' : 'text-gray-700'}`}>{notif.text}</p>
                          <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50 relative custom-scrollbar h-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}