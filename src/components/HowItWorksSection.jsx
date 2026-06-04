const steps = [
  {
    number: '01',
    title: 'Profile & Vetting',
    description:
      'Submit your portfolio for review. Once your capabilities are verified by our team, build your professional profile and set your availability.',
    forFreelancer: true,
  },
  {
    number: '02',
    title: 'Targeted Matching',
    description:
      'Clients are paired directly with vetted creatives based on precise project requirements, ensuring capability, reliability, and exact skill fit.',
    forFreelancer: false,
  },
  {
    number: '03',
    title: 'Structured Delivery',
    description:
      'Execute projects with clear milestone tracking, defined revision protocols, and secure payments to protect both time and capital.',
    forFreelancer: true,
  },
  {
    number: '04',
    title: 'Long-term Growth',
    description:
      'Build lasting professional relationships. Top performance unlocks premium tier projects and dedicated recurring client accounts.',
    forFreelancer: false,
  },
]

export default function HowItWorksSection() {
  return (
    // Used surface-light to subtly separate this section from the white Hero section
    <section id="how-it-works" className="bg-surface-light py-24 md:py-32 border-t-2 border-hadei-black font-sans">
      
      {/* Enforced 1440px max width and standard padding */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-[56px] font-extrabold text-hadei-black leading-[1.1] tracking-tight">
              Built for <span className="bg-hadei-yellow px-2 inline-block mt-2 md:mt-0">Reliability.</span>
            </h2>
            <p className="text-hadei-black text-base md:text-lg font-medium max-w-md leading-relaxed md:text-right">
              From discovery to final delivery, every workflow step is engineered to build absolute trust between creators and clients.
            </p>
          </div>
        </div>

        {/* Steps Grid - Uses 8-pt gap scale (gap-8 = 32px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              // Standard HADEI Card: White bg, Black border, 24px radius
              className="bg-hadei-white border-2 border-hadei-black rounded-xl p-8 flex flex-col hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              {/* Step Number block - Uses HADEI Yellow for highlights */}
              <div className="w-16 h-16 bg-hadei-yellow border-2 border-hadei-black rounded-md flex items-center justify-center text-2xl font-black text-hadei-black mb-8 shrink-0">
                {step.number}
              </div>

              {/* Tag - Functional indicator using extended palette borders */}
              <div className="mb-4">
                <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1.5 border-2 rounded-sm ${
                  step.forFreelancer 
                    ? 'border-hadei-yellow bg-surface-soft text-hadei-black' 
                    : 'border-hadei-black bg-hadei-black text-hadei-white'
                }`}>
                  {step.forFreelancer ? 'For Talent' : 'For Clients'}
                </span>
              </div>

              <h3 className="text-hadei-black font-bold text-xl mb-4 leading-tight">
                {step.title}
              </h3>
              
              <p className="text-hadei-black font-medium text-sm leading-relaxed flex-grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}