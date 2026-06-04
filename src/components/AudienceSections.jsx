import { Link } from 'react-router-dom'

const freelancerFeatures = [
  'Exclusive managed talent network',
  'Guaranteed milestone payments',
  'Premium editorial & media portfolio support',
  'Performance-based tier progression',
  'Structured client communication tools',
  'Vetted, high-budget project access',
]

const clientFeatures = [
  'Precision matching with vetted talent',
  'Managed project milestones & deliverables',
  'Secure escrow payment protection',
  'Clear revision tracking & dispute resolution',
  'Dedicated account managers for critical builds',
  'Streamlined creative brief generation',
]

// Updated FeatureList to strictly use 14px (text-sm) and bold weights
function FeatureList({ items }) {
  return (
    <ul className="space-y-4 mt-8">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-4">
          <span className="mt-0.5 text-hadei-yellow text-lg">◆</span>
          <span className="text-hadei-black text-sm font-medium leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function AudienceSections() {
  return (
    <div className="font-sans">
      
      {/* FOR FREELANCERS SECTION */}
      {/* Uses White background to maintain the 70% ratio */}
      <section id="for-freelancers" className="bg-hadei-white py-24 md:py-32 border-t-2 border-hadei-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Content */}
            <div className="order-2 lg:order-1">
             
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-hadei-black leading-[1.05] tracking-tight mb-6">
                Your craft.<br />
                <span className="bg-hadei-yellow px-2 inline-block mt-2">Elevated.</span>
              </h2>
              <p className="text-hadei-black/80 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                Join a network built for top-tier visual creatives. Showcase your capacity for cinematic storytelling and premium design. We handle the logistics; you focus on the craft.
              </p>
              
              <FeatureList items={freelancerFeatures} />
              
              <div className="mt-12">
                <Link 
                  to="/signup"
                  className="inline-block bg-hadei-yellow text-hadei-black text-base font-bold px-8 py-4 border-2 border-hadei-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-none active:translate-y-0"
                >
                  Apply as Talent
                </Link>
              </div>
            </div>

            {/* Right: Premium Visual Panel */}
            <div className="order-1 lg:order-2 relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              {/* Standard HADEI Card formatting used as a creative display */}
              <div className="aspect-square bg-surface-light border-2 border-hadei-black rounded-xl relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-12 shadow-sm group hover:-translate-y-2 transition-transform duration-500">
                
                {/* Simulated Tags / Badges */}
                <div className="flex flex-col gap-4 w-full relative z-10">
                  <div className="bg-hadei-yellow border-2 border-hadei-black px-6 py-4 rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                    <span className="text-hadei-black text-sm font-black tracking-widest uppercase">CINEMATIC STORYTELLING</span>
                  </div>
                  <div className="bg-hadei-white border-2 border-hadei-black px-6 py-4 rounded-md transform translate-x-8 opacity-90">
                    <span className="text-hadei-black text-sm font-bold tracking-widest uppercase">PREMIUM BRANDING</span>
                  </div>
                  <div className="bg-hadei-black border-2 border-hadei-black px-6 py-4 rounded-md transform -translate-x-4 opacity-80">
                    <span className="text-hadei-white text-sm font-bold tracking-widest uppercase">HIGH-END EDITORIAL</span>
                  </div>
                </div>

                {/* Floating Trust Stat */}
                <div className="absolute bottom-0 right-0 bg-hadei-yellow border-t-2 border-l-2 border-hadei-black p-6 rounded-tl-xl flex flex-col items-end">
                  <div className="text-4xl font-black text-hadei-black leading-none">4.9<span className="text-2xl">★</span></div>
                  <div className="text-sm font-bold tracking-wider text-hadei-black mt-1 uppercase">Avg Rating</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOR CLIENTS SECTION */}
      {/* Uses Light Gray background for structural separation */}
      <section id="for-clients" className="bg-surface-light py-24 md:py-32 border-t-2 border-hadei-black">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Creative Roster Visual Panel (Swapped sides for rhythm) */}
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              <div className="bg-hadei-white border-2 border-hadei-black rounded-xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'Arjun V.', tag: 'CINEMATIC', score: '98', active: true },
                    { name: 'Priya M.', tag: 'EDITORIAL', score: '95', active: false },
                    { name: 'Ravi S.', tag: 'LUXURY', score: '91', active: false },
                  ].map((card, index) => (
                    <div 
                      key={card.name} 
                      className={`flex items-center justify-between p-5 rounded-md border-2 transition-all duration-300 ${
                        card.active 
                          ? 'bg-hadei-yellow border-hadei-black transform scale-105 shadow-sm' 
                          : 'bg-surface-soft border-surface-border hover:border-hadei-black'
                      }`}
                    >
                      <div>
                        <p className={`text-base font-bold ${card.active ? 'text-hadei-black' : 'text-hadei-black/80'}`}>{card.name}</p>
                        <p className={`text-sm font-bold tracking-widest mt-1 ${card.active ? 'text-hadei-black/70' : 'text-hadei-black/50'}`}>{card.tag}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`text-2xl font-black ${card.active ? 'text-hadei-black' : 'text-hadei-black/40'}`}>{card.score}</div>
                        <div className={`text-sm font-bold ${card.active ? 'text-hadei-black' : 'text-transparent'}`}>MATCH</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overlapping Badge */}
                <div className="absolute -top-6 -right-6 bg-hadei-black border-2 border-hadei-black p-6 rounded-xl shadow-lg transform rotate-3">
                  <div className="text-3xl font-black text-hadei-yellow">2.4K</div>
                  <div className="text-sm font-bold tracking-wider text-hadei-white uppercase mt-1">Vetted Pros</div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
             
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-hadei-black leading-[1.05] tracking-tight mb-6">
                Hire for impact,<br />
                <span className="text-hadei-black border-b-8 border-hadei-yellow pb-2">not just skill.</span>
              </h2>
              <p className="text-hadei-black/80 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                Stop gambling on unverified portfolios. Our structured network pairs you strictly with capable, professional creatives who understand your specific aesthetic vision and operational requirements.
              </p>
              
              <FeatureList items={clientFeatures} />
              
              <div className="mt-12">
                <Link 
                  to="/signup"
                  className="inline-block bg-hadei-black text-hadei-white text-base font-bold px-8 py-4 border-2 border-hadei-black rounded-md transition-all duration-300 hover:bg-hadei-white hover:text-hadei-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                >
                  Start Hiring
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}