import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    // Base layer: HADEI White to maintain the 70% color ratio across the page
    <section className="bg-hadei-white py-24 md:py-32 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* 
          The CTA Banner Card: 
          Uses Primary Yellow (20% ratio), strict black border, 24px radius (rounded-xl), 
          and a hard offset shadow for a bold, structural aesthetic.
        */}
        <div className="bg-hadei-yellow rounded-xl border-2 border-hadei-black p-10 md:p-16 lg:p-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-8">
          
          {/* Content Block - Strictly left-aligned to adhere to typography rules */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-hadei-black leading-[1.05] tracking-tight mb-6">
              Ready to elevate your standard?
            </h2>
            <p className="text-hadei-black/80 text-lg md:text-xl font-medium leading-relaxed">
              Join the managed talent network built on trust, reliability, and premium quality. Stop dealing with chaotic marketplaces and start working with true professionals.
            </p>
          </div>

          {/* Action Block - Using 16px (rounded-md) border radius for buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
            
            {/* 
              Secondary Button Styling (Black bg/White text) 
              Used as the primary action here for maximum contrast against the yellow background.
            */}
            <Link 
              to="/signup"
              className="w-full text-center bg-hadei-black text-hadei-white text-base font-bold px-8 py-4 border-2 border-hadei-black rounded-md transition-all duration-300 hover:bg-surface-light hover:text-hadei-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none"
            >
              Apply to the Network
            </Link>
            
            {/* Ghost Button Styling - Transparent background, structural border */}
            <Link 
              to="/login"
              className="w-full text-center bg-transparent text-hadei-black text-base font-bold px-8 py-4 border-2 border-hadei-black rounded-md transition-all duration-300 hover:bg-hadei-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none"
            >
              Log in to account
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}