import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    // Base layout: Dominated by White (70%), using 8-pt grid spacing
    <section className="relative min-h-screen bg-hadei-white flex items-center pt-14 pb-16 overflow-hidden font-sans">
      
      {/* Maximum content width of 1440px for scalability */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 w-full">
        
        {/* Structured 12-column grid layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN (Spans 7 columns): Core Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
         

            {/* Headline - Hero Size (72px), Weight 800, Left-aligned */}
            <h1 className="font-extrabold text-hadei-black leading-[1.1] mb-8 text-5xl md:text-[72px] tracking-tight">
              Professional <br />
              Creative Talent. <br />
              {/* Primary Yellow used for highlighting */}
              <span className="bg-hadei-yellow px-2 inline-block mt-2">Delivered.</span>
            </h1>

            {/* Subheadline - Re-written for professionalism and clarity */}
            <p className="text-hadei-black text-base md:text-lg font-medium max-w-xl leading-relaxed mb-12">
              <span className="font-bold">Hadei</span> is not another crowded marketplace. We are a managed talent network built on reliability. We connect industry-leading clients with strictly vetted creative professionals to ensure quality over quantity.
            </p>

            {/* CTAs - Strict Button System mappings */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {/* Primary Button */}
              <Link 
                to="/signup" 
                className="w-full sm:w-auto text-center bg-hadei-yellow text-hadei-black text-base font-bold px-8 py-4 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:shadow-none"
              >
                Hire Freelancers
              </Link>
              {/* Secondary Button */}
              <Link 
                to="/signup" 
                className="w-full sm:w-auto text-center bg-hadei-black text-hadei-white text-base font-bold px-8 py-4 rounded-md transition-all duration-300 ease-in-out hover:bg-hadei-white hover:text-hadei-black border-2 border-hadei-black"
              >
                Apply as Freelancer
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN (Spans 5 columns): The Trust Card */}
          <div className="lg:col-span-5 w-full">
            {/* Standard HADEI Card: White bg, Black border, 24px radius (rounded-xl) */}
            <div className="bg-hadei-white border-2 border-hadei-black rounded-xl p-8 lg:p-12 shadow-sm flex flex-col gap-8">
              
              <h3 className="text-2xl font-bold text-hadei-black border-b-2 border-surface-border pb-6">
                Why Trust HADEI?
              </h3>

              <div className="flex flex-col gap-8">
                {/* Trust Indicator 1 */}
                <div>
                  <h4 className="text-hadei-black text-base font-bold uppercase tracking-wider mb-2">
                    Strictly Vetted
                  </h4>
                  <p className="text-hadei-black text-sm font-medium leading-relaxed">
                    Every creative professional passes rigorous capability and professionalism checks before joining the network.
                  </p>
                </div>

                {/* Trust Indicator 2 */}
                <div>
                  <h4 className="text-hadei-black text-base font-bold uppercase tracking-wider mb-2">
                    Managed Workflows
                  </h4>
                  <p className="text-hadei-black text-sm font-medium leading-relaxed">
                    Projects are structured and monitored to ensure milestones are hit, preventing ghosting and delays.
                  </p>
                </div>

                {/* Trust Indicator 3 */}
                <div>
                  <h4 className="text-hadei-black text-base font-bold uppercase tracking-wider mb-2">
                    Secure Ecosystem
                  </h4>
                  <p className="text-hadei-black text-sm font-medium leading-relaxed">
                    Reliable payment protections and clear communication channels prioritize your operational safety.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}