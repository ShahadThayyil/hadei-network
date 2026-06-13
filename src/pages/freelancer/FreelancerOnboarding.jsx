import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Plus, X, Upload, Linkedin, FacebookIcon, InstagramIcon, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

export default function FreelancerOnboarding() {
  const navigate = useNavigate()

  // Stepper State
  const [step, setStep] = useState(1)

  const [currentLanguage, setCurrentLanguage] = useState('')
  const [currentSkill, setCurrentSkill] = useState('')

  // State mapping for dependent dropdowns
  const countryStateMap = {
    'India': ['Kerala', 'Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu'],
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Washington'],
    'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland']
  }

  // Form State
  const [formData, setFormData] = useState({
    // Personal Details
    profileImage: null,
    displayName: 'Muhammed Shahad T.',
    about: '',
    languages: [],
    education: [], 
    certificates: [], 
    aadhaarImage: [], // Changed to array to hold multiple file names
    dob: '',
    country: '',
    state: '',
    district: '',
    
    // Profession
    portfolioLink: '',
    portfolioFiles: [], // Changed to array to hold multiple file names
    category: 'development',
    customCategory: '',
    experience: '',
    skills: [],
    socials: {
      instagram: '',
      facebook: '',
      linkedin: ''
    }
  })

  const availableStates = formData.country ? countryStateMap[formData.country] || [] : []

  // Validation to allow proceeding to Step 2
  const isPersonalDetailsComplete = 
    formData.displayName.trim() !== '' && 
    formData.about.trim() !== '' && 
    formData.dob !== '' && 
    formData.country !== '' && 
    formData.state !== '' && 
    formData.district.trim() !== '';

  const handleNext = () => {
    if (isPersonalDetailsComplete) setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = () => {
    navigate('/freelancer/tutorial')
  }

  // Dynamic Array Handlers
  const handleAddItem = (e, item, setItem, arrayName) => {
    e.preventDefault()
    if (item.trim() && !formData[arrayName].includes(item.trim())) {
      setFormData({ ...formData, [arrayName]: [...formData[arrayName], item.trim()] })
      setItem('')
    }
  }

  const handleRemoveItem = (itemToRemove, arrayName) => {
    setFormData({ ...formData, [arrayName]: formData[arrayName].filter(i => i !== itemToRemove) })
  }

  // Education Handlers
  const handleAddEducation = () => {
    setFormData({ ...formData, education: [...formData.education, { country: '', school: '', type: '', year: '' }] })
  }

  const handleUpdateEducation = (index, field, value) => {
    const newEdu = [...formData.education]
    newEdu[index][field] = value
    setFormData({ ...formData, education: newEdu })
  }

  const handleRemoveEducation = (index) => {
    const newEdu = formData.education.filter((_, i) => i !== index)
    setFormData({ ...formData, education: newEdu })
  }

  // File Upload Handlers
  const handleProfileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, profileImage: e.target.files[0] })
    }
  }

  const handleAadhaarUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => f.name)
      const unique = newFiles.filter(name => !formData.aadhaarImage.includes(name))
      setFormData({ ...formData, aadhaarImage: [...formData.aadhaarImage, ...unique] })
    }
  }

  const handleCertificateUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newCerts = Array.from(e.target.files).map(f => f.name)
      const unique = newCerts.filter(name => !formData.certificates.includes(name))
      setFormData({ ...formData, certificates: [...formData.certificates, ...unique] })
    }
  }

  const handlePortfolioUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => f.name)
      const unique = newFiles.filter(name => !formData.portfolioFiles.includes(name))
      setFormData({ ...formData, portfolioFiles: [...formData.portfolioFiles, ...unique] })
    }
  }

  // Styling classes
  const inputClass = "w-full bg-white border border-gray-300 rounded-md px-3 py-2.5 text-sm text-black transition-colors focus:border-black focus:ring-1 focus:ring-black focus:outline-none placeholder:text-gray-400"
  const labelClass = "block text-sm font-semibold text-black mb-1.5"

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans flex flex-col text-black">
      
      {/* Minimal Top Navbar */}
      <header className="sticky top-0 w-full   border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between z-30 ">
     <div className="flex items-center">
  <img
    src="https://res.cloudinary.com/dmtzmgbkj/image/upload/v1780479006/f_webp/WhatsApp_Image_2026-05-22_at_2.18.05_PM__1_-removebg-preview_befo5g.png"
    alt="Platform Logo"
    className="h-10 w-auto object-contain"
  />
</div>

        <button className="text-sm font-semibold text-black border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
          Save & Exit
        </button>
      </header>

      {/* Main Content Form Wrapper */}
      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Progress Indicator */}
        <div className="w-full max-w-3xl mb-8">
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-6 text-sm font-medium">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 1 ? 'bg-[#F5F216] text-black' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className="hidden sm:inline">Personal Details</span>
            </div>
            <div className={`w-12 sm:w-24 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-[#F5F216]' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className="hidden sm:inline">Professional Setup</span>
            </div>
          </div>
        </div>

        {/* Central Form Card */}
        <div className="w-full max-w-3xl bg-white rounded-xl border border-gray-300 overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">

            {/* ==================== STEP 1: PERSONAL DETAILS ==================== */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
                  <p className="text-sm text-gray-500">Let's start with your core identity data. Fields marked with * are required.</p>
                </div>

                <div className="space-y-8">
                  {/* Image & Name */}
                  <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                    <label className="relative w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-black flex flex-col items-center justify-center cursor-pointer group rounded-full transition-colors shrink-0 overflow-hidden">
                      <input type="file" accept="image/*" onChange={handleProfileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {formData.profileImage ? (
                        <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Camera className="w-6 h-6 text-gray-400 group-hover:text-black mb-1" />
                          <span className="text-[10px] font-semibold text-gray-500 group-hover:text-black uppercase tracking-wider">Upload</span>
                        </>
                      )}
                    </label>
                    <div className="flex-1">
                      <label className={labelClass}>Display Name *</label>
                      <input type="text" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} className={inputClass} />
                    </div>
                  </div>

                  {/* About */}
                  <div>
                    <label className={labelClass}>Biography *</label>
                    <textarea rows={4} placeholder="Summarize your professional drive..." value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} className={`${inputClass} resize-none`} />
                  </div>

                  {/* Logistics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Date of Birth *</label>
                      <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Country *</label>
                      <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value, state: ''})} className={inputClass}>
                        <option value="" disabled>Select Country</option>
                        {Object.keys(countryStateMap).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>State/Province *</label>
                      <select value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} disabled={!formData.country} className={`${inputClass} ${!formData.country ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
                        <option value="" disabled>Select State</option>
                        {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>District *</label>
                      <input type="text" placeholder="e.g. Malappuram" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className={inputClass} />
                    </div>
                  </div>

                  {/* Verification */}
                 <div>
  <label className={labelClass}>
    Identity Verification (Aadhaar) *
  </label>

  <div className="relative border-2 border-dashed border-gray-300 hover:border-black bg-gray-50/50 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
    <input
      type="file"
      multiple
      onChange={handleAadhaarUpload}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />

    <Upload className="w-6 h-6 text-gray-500 mb-2" />

    <span className="text-sm font-semibold">
      Upload Front & Back
    </span>

    <p className="text-xs text-gray-400 mt-1">
      PNG, JPG or PDF up to 5MB
    </p>
  </div>

  {/* Verification Notice */}
  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
    <h4 className="text-sm font-semibold text-gray-900 mb-2">
      Verification Required
    </h4>

    <p className="text-xs text-gray-600 leading-relaxed">
      Your Aadhaar document is required to verify your identity and
      maintain a trusted freelancer community. Your information will be
      securely stored and used only for verification purposes. After
      successful verification, you will be eligible to apply for jobs
      and connect with clients on the platform.
    </p>

    <label className="flex items-start gap-2 mt-3 cursor-pointer">
      <input
        type="checkbox"
        required
        className="mt-0.5"
      />
      <span className="text-xs text-gray-600">
        I agree to the verification process and consent to the secure
        storage of my identity documents for account verification.
        {' '}
        <a
          href="/verification-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black font-semibold underline hover:text-gray-700"
        >
          Read Verification Policy
        </a>
      </span>
    </label>
  </div>

  {formData.aadhaarImage.length > 0 && (
    <div className="flex flex-col gap-2 mt-3">
      {formData.aadhaarImage.map((file, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm"
        >
          <span className="text-sm text-gray-700 font-medium truncate">
            {file}
          </span>

          <button
            onClick={() =>
              handleRemoveItem(file, 'aadhaarImage')
            }
            className="hover:text-red-600 ml-4 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )}
</div>

                  {/* Languages */}
                  <div>
                    <label className={labelClass}>Known Languages *</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="e.g., English, Malayalam" value={currentLanguage} onChange={(e) => setCurrentLanguage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddItem(e, currentLanguage, setCurrentLanguage, 'languages')} className={inputClass} />
                      <button onClick={(e) => handleAddItem(e, currentLanguage, setCurrentLanguage, 'languages')} className="bg-black text-white px-6 text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors">Add</button>
                    </div>
                    {formData.languages.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.languages.map((lang, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-[#F5F216] px-3 py-1.5 rounded-md shadow-sm">
                            <span className="text-sm font-semibold">{lang}</span>
                            <button onClick={() => handleRemoveItem(lang, 'languages')} className="hover:text-black/60 transition-colors"><X size={14}/></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className={labelClass} style={{marginBottom: 0}}>Education</label>
                      <button onClick={handleAddEducation} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"> <Plus size={16} /> Add Education </button>
                    </div>
                    {formData.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 bg-gray-50/50 p-4 rounded-lg mb-4 relative group">
                        <button onClick={() => handleRemoveEducation(index)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"><X size={16}/></button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          <input type="text" placeholder="School/College" value={edu.school} onChange={(e) => handleUpdateEducation(index, 'school', e.target.value)} className={inputClass} />
                          <input type="text" placeholder="Degree Type" value={edu.type} onChange={(e) => handleUpdateEducation(index, 'type', e.target.value)} className={inputClass} />
                          <input type="text" placeholder="Country" value={edu.country} onChange={(e) => handleUpdateEducation(index, 'country', e.target.value)} className={inputClass} />
                          <input type="number" placeholder="Year" value={edu.year} onChange={(e) => handleUpdateEducation(index, 'year', e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Certificates */}
                  <div>
                    <label className={labelClass}>Certifications (Optional files)</label>
                    <div className="relative border-2 border-dashed border-gray-300 hover:border-black bg-gray-50/50 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                      <input type="file" multiple onChange={handleCertificateUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Upload className="w-6 h-6 text-gray-500 mb-2" />
                      <span className="text-sm font-semibold">Upload Certificate Files</span>
                    </div>
                    {formData.certificates.length > 0 && (
                      <div className="flex flex-col gap-2 mt-3">
                        {formData.certificates.map((cert, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm">
                            <span className="text-sm text-gray-700 font-medium truncate">{cert}</span>
                            <button onClick={() => handleRemoveItem(cert, 'certificates')} className="hover:text-red-600 ml-4 transition-colors"><X size={16}/></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Step 1 Actions */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={handleNext} 
                    disabled={!isPersonalDetailsComplete}
                    className={`flex items-center gap-2 px-8 py-3 rounded-md text-sm font-bold transition-all ${isPersonalDetailsComplete ? 'bg-black text-white hover:bg-gray-800 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                  >
                    Next Step <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ==================== STEP 2: PROFESSIONAL DETAILS ==================== */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Professional Stack</h2>
                  <p className="text-sm text-gray-500">Define your capabilities to align with client searches and projects.</p>
                </div>

                <div className="space-y-8">
                  {/* Category & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Market Category *</label>
                      <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className={inputClass}>
                        <option value="development">Software Development</option>
                        <option value="design">UI/UX & Graphic Design</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="video">Video & Animation</option>
                        <option value="custom">Other (Custom Entry)</option>
                      </select>
                      {formData.category === 'custom' && (
                        <input type="text" placeholder="Specify domain..." value={formData.customCategory} onChange={(e) => setFormData({...formData, customCategory: e.target.value})} className={`mt-3 ${inputClass}`} />
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Experience Bracket *</label>
                      <select value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className={inputClass}>
                        <option value="" disabled>Select Level</option>
                        <option value="entry">Entry Level (0 - 2 Years)</option>
                        <option value="mid">Mid Level (3 - 5 Years)</option>
                        <option value="senior">Senior Level (5+ Years)</option>
                      </select>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="p-6 bg-gray-50/50 border border-gray-200 rounded-xl">
                    <h3 className="text-sm font-bold mb-4">Portfolio & Proof of Work</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Portfolio Link</label>
                        <input type="url" placeholder="https://your-portfolio.com" value={formData.portfolioLink} onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Direct Uploads</label>
                        <div className="relative border-2 border-dashed border-gray-300 hover:border-black rounded-lg flex items-center justify-center cursor-pointer bg-white transition-colors py-4">
                          <input type="file" multiple onChange={handlePortfolioUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <span className="text-sm font-semibold flex items-center gap-2"><Upload size={18}/> Select Files to Upload</span>
                        </div>
                        {formData.portfolioFiles.length > 0 && (
                          <div className="flex flex-col gap-2 mt-3">
                            {formData.portfolioFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-white px-4 py-3 rounded-md border border-gray-200 shadow-sm">
                                <span className="text-sm text-gray-700 font-medium truncate">{file}</span>
                                <button onClick={() => handleRemoveItem(file, 'portfolioFiles')} className="hover:text-red-600 ml-4 transition-colors"><X size={16}/></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className={labelClass}>Technical Skills *</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="e.g. React, Node.js" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddItem(e, currentSkill, setCurrentSkill, 'skills')} className={inputClass} />
                      <button onClick={(e) => handleAddItem(e, currentSkill, setCurrentSkill, 'skills')} className="bg-black text-white px-6 text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors">Add</button>
                    </div>
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {formData.skills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-md shadow-sm">
                            <span className="text-sm font-medium">{skill}</span>
                            <button onClick={() => handleRemoveItem(skill, 'skills')} className="hover:text-[#F5F216] transition-colors"><X size={14} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Social Media */}
                  <div>
                    <label className={labelClass}>Social Links (Optional)</label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center shrink-0"><Linkedin size={20} className="text-[#0A66C2]"/></div>
                        <input type="url" placeholder="LinkedIn URL" value={formData.socials.linkedin} onChange={(e) => setFormData({...formData, socials: {...formData.socials, linkedin: e.target.value}})} className={inputClass} />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center shrink-0"><InstagramIcon size={20} className="text-[#E4405F]"/></div>
                        <input type="url" placeholder="Instagram URL" value={formData.socials.instagram} onChange={(e) => setFormData({...formData, socials: {...formData.socials, instagram: e.target.value}})} className={inputClass} />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center shrink-0"><FacebookIcon size={20} className="text-[#1877F2]"/></div>
                        <input type="url" placeholder="Facebook URL" value={formData.socials.facebook} onChange={(e) => setFormData({...formData, socials: {...formData.socials, facebook: e.target.value}})} className={inputClass} />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Step 2 Actions */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between gap-4">
                  <button 
                    onClick={handleBack} 
                    className="flex justify-center items-center gap-2 px-6 py-3 rounded-md text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="flex justify-center items-center gap-2 w-full sm:w-auto bg-[#F5F216] text-black text-sm font-bold px-8 py-3 rounded-md hover:brightness-95 transition-colors "
                  >
                    Complete Setup & Go To Tutorial <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}