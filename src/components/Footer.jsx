import { Link } from 'react-router-dom'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    // Base layer: Uses HADEI Yellow for maximum impact
    <footer className="bg-hadei-yellow border-t-2 border-hadei-black pt-16 md:pt-24 pb-8 font-sans overflow-hidden">
      
      {/* Maximum content width container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Section: 2-Column Flex Layout for a cleaner, balanced look */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16 md:mb-24">
          
          {/* Left Column: WhatsApp & CTA ("Say Hi!") */}
          <div className="flex flex-col items-start gap-5">
            
            {/* WhatsApp Link / Icon */}
            <a 
              href="https://wa.me/yourwhatsappnumber" 
              target="_blank" 
              rel="noreferrer"
              className="text-hadei-black bg-transparent border-2 border-hadei-black p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-hadei-black hover:text-hadei-yellow hover:-translate-y-1 hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0 active:shadow-none"
              aria-label="Chat on WhatsApp"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>

            <div>
              <h4 className="text-hadei-black text-3xl md:text-4xl font-black mb-2 tracking-tight">Say Hi!</h4>
              <p className="text-hadei-black/80 text-sm md:text-base font-medium max-w-[250px] leading-relaxed">
                Interested in hiring top creative talent or joining the network?
              </p>
            </div>
            
            {/* CTA Button */}
            <Link 
              to="/contact" 
              className="mt-2 bg-hadei-black text-hadei-white text-base font-bold px-8 py-3.5 rounded-md border-2 border-hadei-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,0.3)] active:bg-hadei-white active:text-hadei-black active:translate-y-0 active:shadow-none"
            >
              Let's Chat
            </Link>
          </div>

          {/* Right Column: Back to Top, Socials & Copyright */}
          <div className="flex flex-col items-start md:items-end gap-8 md:text-right w-full md:w-auto">
            
            <div className="flex flex-col-reverse md:flex-row items-start md:items-center gap-8 md:gap-6 w-full md:w-auto">
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full border-2 border-hadei-black flex items-center justify-center text-hadei-black hover:bg-hadei-black hover:text-hadei-yellow transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full border-2 border-hadei-black flex items-center justify-center text-hadei-black hover:bg-hadei-black hover:text-hadei-yellow transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="w-12 h-12 rounded-full border-2 border-hadei-black flex items-center justify-center text-hadei-black hover:bg-hadei-black hover:text-hadei-yellow transition-colors duration-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>

              {/* Back to Top Button */}
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 bg-transparent text-hadei-black border-2 border-hadei-black px-6 py-3 rounded-md text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:bg-hadei-black hover:text-hadei-yellow hover:-translate-y-1 hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-0 active:shadow-none"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
                Back to Top
              </button>
            </div>

            {/* Meta Information */}
            <div className="flex flex-col gap-4 items-start md:items-end mt-4">
              <div className="px-4 py-2 border-2 border-hadei-black rounded-md text-sm font-bold bg-transparent">
                W Built for Creative Professionals
              </div>
              <p className="text-hadei-black text-base font-black tracking-wide">
                © {new Date().getFullYear()} HADEI Network. All rights reserved.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section: Space for Massive Logo Image */}
        <div className="w-full border-t-4 border-hadei-black pt-8 md:pt-12 flex justify-center items-center overflow-hidden">
          {/* 
            REPLACE src with your actual wide logo path. 
            Object-contain and max-height ensure it scales beautifully without stretching.
          */}
          <img 
            src="https://res.cloudinary.com/dmtzmgbkj/image/upload/f_webp/v1780479006/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png" 
            alt="HADEI Logo" 
            className="w-full max-h-[100px] md:max-h-[160px] lg:max-h-[220px] object-contain object-center"
            onError={(e) => {
              // Fallback styling if image path is empty/broken
              e.target.style.display = 'none';
            }}
          />
        </div>

      </div>
    </footer>
  )
}