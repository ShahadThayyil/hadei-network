import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  // Added font-sans to strictly enforce the MEIRO typeface from your tailwind config
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hadei-white transition-all shadow-sm font-sans">
      {/* Enforced 1440px max width and increased padding (px-8 to px-12 md:px-16) to match the reference image's inset margins */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between">
        
        {/* LEFT GROUP: Logo and Navigation Links */}
        <div className="flex items-center gap-10 lg:gap-14">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center group transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            {/* Custom Logo Wrapper - Borderless, smooth premium shadow on hover */}
            <div className="w-24  flex items-center justify-center shrink-0 overflow-hidden rounded-md transition-shadow duration-300 group-hover:shadow-md">
              <img 
                src="https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1780479006/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png" 
                alt="HADEI Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </Link>

          {/* Desktop nav - Clean text color transitions using hadei-black and hadei-yellow */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/#how-it-works"
              className="text-hadei-black text-sm font-medium transition-colors duration-300 ease-in-out hover:text-hadei-yellow"
            >
              How It Works
            </Link>
            <Link
              to="/#for-freelancers"
              className="text-hadei-black text-sm font-medium transition-colors duration-300 ease-in-out hover:text-hadei-yellow"
            >
              Freelancers
            </Link>
            <Link
              to="/#for-clients"
              className="text-hadei-black text-sm font-medium transition-colors duration-300 ease-in-out hover:text-hadei-yellow"
            >
              Clients
            </Link>
          </div>
        </div>

        {/* RIGHT GROUP: Auth Buttons & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          {/* CTA buttons - Anchored to the far right */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-3">
              {/* Ghost to Primary hover - Matches Join Now style on hover */}
              <Link
                to="/login"
                className="text-hadei-black bg-transparent text-sm font-bold px-5 py-2.5 rounded-md transition-all duration-300 ease-in-out hover:bg-hadei-yellow hover:shadow-md hover:-translate-y-0.5"
              >
                Log In
              </Link>
              {/* Primary Button - Default yellow, subtle hover lift */}
              <Link
                to="/signup"
                className="bg-hadei-yellow text-hadei-black text-sm font-bold rounded-md px-5 py-2.5 transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile hamburger - Smooth color transition */}
          <button
            className="md:hidden text-hadei-black p-2 transition-colors duration-300 "
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu - Borderless layout, using surface-light for subtle separation */}
      {menuOpen && (
        <div className="md:hidden bg-hadei-white flex flex-col animate-in slide-in-from-top-2 duration-300 shadow-lg">
          <Link 
            to="/#how-it-works" 
            className="text-hadei-black text-base font-bold border-b border-surface-light px-6 py-4 transition-colors duration-300 hover:text-hadei-yellow active:bg-hadei-yellow" 
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/#for-freelancers" 
            className="text-hadei-black text-base font-bold border-b border-surface-light px-6 py-4 transition-colors duration-300 hover:text-hadei-yellow active:bg-hadei-yellow" 
            onClick={() => setMenuOpen(false)}
          >
            Freelancers
          </Link>
          <Link 
            to="/#for-clients" 
            className="text-hadei-black text-base font-bold px-6 py-4 transition-colors duration-300 hover:text-hadei-yellow active:bg-hadei-yellow" 
            onClick={() => setMenuOpen(false)}
          >
            Clients
          </Link>
          
          {!isAuthPage && (
            <div className="bg-surface-light p-6 flex flex-col gap-4">
              <Link 
                to="/login" 
                className="text-hadei-black bg-transparent text-center text-base font-bold py-3 rounded-md transition-all duration-300 hover:bg-hadei-yellow shadow-sm" 
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="bg-hadei-yellow text-hadei-black text-center text-base font-bold py-3 rounded-md shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0" 
                onClick={() => setMenuOpen(false)}
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}