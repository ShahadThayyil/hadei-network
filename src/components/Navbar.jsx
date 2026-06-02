import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hadei-white border-b-2 border-hadei-black transition-all">
      {/* Enforced 1440px max width and 8-pt grid padding (px-8 = 32px, py-4 = 16px) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        
        {/* Logo - Removed thin fonts, utilizing strong contrast */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="bg-hadei-black text-hadei-white text-xl font-black px-3 py-1 uppercase tracking-tight">
            HADEI
          </span>
          <span className="text-hadei-black text-xl font-bold uppercase tracking-widest">
            Network
          </span>
        </Link>

        {/* Desktop nav - Utilizing 14px (text-sm) weight 500, bold hover blocks */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/#how-it-works"
            className="text-hadei-black text-sm font-medium px-4 py-2 rounded-md hover:bg-hadei-yellow transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="/#for-freelancers"
            className="text-hadei-black text-sm font-medium px-4 py-2 rounded-md hover:bg-hadei-yellow transition-colors"
          >
            Freelancers
          </Link>
          <Link
            to="/#for-clients"
            className="text-hadei-black text-sm font-medium px-4 py-2 rounded-md hover:bg-hadei-yellow transition-colors"
          >
            Clients
          </Link>
        </div>

        {/* CTA buttons */}
        {!isAuthPage && (
          <div className="hidden md:flex items-center gap-4">
            {/* Ghost Button styling */}
            <Link
              to="/login"
              className="text-hadei-black text-sm font-bold px-4 py-2 rounded-md hover:bg-surface-light transition-colors"
            >
              Log In
            </Link>
            {/* Primary Button styling - 16px (rounded-md) border radius */}
            <Link
              to="/signup"
              className="bg-hadei-yellow text-hadei-black text-sm font-bold border-2 border-hadei-black rounded-md px-6 py-2.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none"
            >
              Join Now
            </Link>
          </div>
        )}

        {/* Mobile hamburger - Changed to HADEI black */}
        <button
          className="md:hidden text-hadei-black p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu - Rebuilt with white background and structural borders */}
      {menuOpen && (
        <div className="md:hidden bg-hadei-white border-t-2 border-hadei-black flex flex-col">
          <Link 
            to="/#how-it-works" 
            className="text-hadei-black text-base font-bold border-b border-surface-border px-6 py-4 hover:bg-hadei-yellow active:bg-hadei-yellow transition-colors" 
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/#for-freelancers" 
            className="text-hadei-black text-base font-bold border-b border-surface-border px-6 py-4 hover:bg-hadei-yellow active:bg-hadei-yellow transition-colors" 
            onClick={() => setMenuOpen(false)}
          >
            Freelancers
          </Link>
          <Link 
            to="/#for-clients" 
            className="text-hadei-black text-base font-bold border-b border-hadei-black px-6 py-4 hover:bg-hadei-yellow active:bg-hadei-yellow transition-colors" 
            onClick={() => setMenuOpen(false)}
          >
            Clients
          </Link>
          
          {!isAuthPage && (
            <div className="bg-surface-light p-6 flex flex-col gap-4">
              <Link 
                to="/login" 
                className="text-hadei-black text-center text-base font-bold py-3 border-2 border-hadei-black rounded-md hover:bg-hadei-white transition-colors" 
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="bg-hadei-yellow text-hadei-black text-center text-base font-bold py-3 border-2 border-hadei-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all" 
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