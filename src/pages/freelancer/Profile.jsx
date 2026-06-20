import { useState } from 'react'
import { 
  MapPin, 
  Map,
  Building,
  Star, 
  CheckCircle2, 
  Globe,
  Award,
  ExternalLink,
  ThumbsUp,
  FileText,
  Briefcase,
  Link as LinkIcon,
  Edit3,
  GraduationCap,
  Calendar,
  X,
  Plus,
  Save,
  Eye,
  Camera,
  Image as ImageIcon
} from 'lucide-react'

export default function MyProfile() {
  // -----------------------------
  // MOCK DATA: PROFILE
  // -----------------------------
  const [profile, setProfile] = useState({
    // Read-only Personal
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    displayName: 'Muhammed Shahad T.',
    role: 'Senior Full-Stack Developer',
    dob: '15 May 1998',
    
    // Editable Location
    country: 'India',
    state: 'Kerala',
    district: 'Malappuram',
    
    // Editable
    about: `I am a passionate Full-Stack Developer specializing in the MERN stack, Next.js, and modern system architecture. My primary focus is building scalable, accessible, and highly performant web applications from the ground up.\n\nOver the last 6 years, I have successfully delivered enterprise-grade SaaS platforms, real-time dashboards, and secure e-commerce solutions. I pride myself on writing clean, maintainable code and translating complex business requirements into seamless user experiences.`,
    languages: ['English', 'Malayalam', 'Hindi'],
    education: [
      { degree: 'Diploma in Computer Engineering', institution: 'SSM Polytechnic College, Tirur', year: '2027' }
    ],
    certificates: [
      { name: 'AWS_Certified_Architect.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }, 
      { name: 'React_Advanced_Course.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ],
    
    // Portfolio
    portfolioLink: 'https://shahad.dev',
    portfolioFiles: ['Architecture_Diagram.pdf'],
    portfolioImages: [
      { id: 1, title: 'E-commerce App', url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=400&auto=format&fit=crop' },
      { id: 2, title: 'SaaS Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop' }
    ],

    skills: ['React', 'Node.js', 'Next.js', 'MongoDB', 'Tailwind CSS'],
    socials: {
      instagram: 'https://instagram.com/shahad',
      facebook: 'https://facebook.com/shahad',
      linkedin: 'https://linkedin.com/in/shahad'
    },

    // Read-only Professional & Stats
    category: 'Software Development',
    experience: 'Senior Level (5+ Years)',
    badge: 'E-commerce Expert', 
    level: 4,
    stats: {
      completedProjects: 84,
      successRate: '100%',
      rating: 5.0
    }
  })

  // -----------------------------
  // EDIT MODES STATE
  // -----------------------------
  const [editMode, setEditMode] = useState({
    personal: false,
    about: false,
    portfolio: false,
    skills: false,
    languages: false,
    education: false,
    certificates: false,
    socials: false
  })

  const [tempInput, setTempInput] = useState('')

  // Handlers
  const toggleEdit = (section) => {
    setTempInput('') // Clear buffer on toggle
    setEditMode(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleInputChange = (e, field, nestedObj = null) => {
    if (nestedObj) {
      setProfile(prev => ({ ...prev, [nestedObj]: { ...prev[nestedObj], [field]: e.target.value } }))
    } else {
      setProfile(prev => ({ ...prev, [field]: e.target.value }))
    }
  }

  const handleAddArrayItem = (e, arrayName) => {
    e.preventDefault()
    if (tempInput.trim() && !profile[arrayName].includes(tempInput.trim())) {
      setProfile(prev => ({ ...prev, [arrayName]: [...prev[arrayName], tempInput.trim()] }))
      setTempInput('')
    }
  }

  const handleRemoveArrayItem = (itemToRemove, arrayName) => {
    setProfile(prev => ({ ...prev, [arrayName]: prev[arrayName].filter(i => i !== itemToRemove) }))
  }

  const handleRemoveCertificate = (certName) => {
    setProfile(prev => ({ ...prev, certificates: prev.certificates.filter(c => c.name !== certName) }))
  }

  const handleEducationChange = (index, field, value) => {
    const newEdu = [...profile.education]
    newEdu[index][field] = value
    setProfile(prev => ({ ...prev, education: newEdu }))
  }

  // Avatar Upload Handler
  const handleAvatarUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0])
      setProfile(prev => ({ ...prev, avatar: imageUrl }))
    }
  }

  // Portfolio Upload Handlers
  const handlePortfolioImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file, i) => ({
        id: Date.now() + i,
        title: file.name,
        url: URL.createObjectURL(file)
      }))
      setProfile(prev => ({ ...prev, portfolioImages: [...prev.portfolioImages, ...newImages] }))
    }
  }

  const handlePortfolioFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => file.name)
      setProfile(prev => ({ ...prev, portfolioFiles: [...prev.portfolioFiles, ...newFiles] }))
    }
  }

  // Common Input Styles
  const inputClass = "w-full bg-white border border-gray-300 rounded-sm px-3 py-2 text-sm text-black focus:border-black focus:outline-none mb-3"

  return (
    <main className="w-full h-full p-4 md:p-6 lg:p-8 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col">

        {/* ==================== HERO SECTION (READ ONLY + AVATAR UPLOAD) ==================== */}
        <header className="relative flex flex-col md:flex-row items-start md:items-center gap-6 border-b border-gray-200 pb-8 mb-8 mt-2 group">
          
          <div className="relative shrink-0 group/avatar">
            <img 
              src={profile.avatar} 
              alt={profile.displayName} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover aspect-square border border-gray-200"
            />
            {/* Avatar Upload Overlay */}
            <label className="absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
              <Camera size={24} className="text-white mb-1" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
            <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5" title="Identity Verified">
              <CheckCircle2 size={24} className="text-blue-600 fill-blue-50" />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                {profile.displayName}
              </h1>
              
              {/* Level & Badge Display */}
              <p className="text-lg text-gray-800 font-medium mb-4 flex items-center gap-2">
                <Star size={20} className="fill-yellow-500 text-yellow-500" />
                {profile.badge} • Level {profile.level}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {profile.district}, {profile.state}, {profile.country}</span>
              </div>
            </div>

            {/* Completed Jobs Stat moved to Header Right */}
            <div className="md:ml-auto mt-4 md:mt-0">
               <div className="flex flex-col items-center border-b border-gray-200 px-6 py-4 text-center">
                 <span className="text-3xl font-black text-black leading-none mb-1">{profile.stats.completedProjects}</span>
                 <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Completed Jobs</span>
               </div>
            </div>
          </div>
        </header>

        {/* ==================== CONTENT GRID ==================== */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: MAIN CONTENT */}
          <div className="flex-1 w-full flex flex-col lg:border-r lg:border-gray-200 lg:pr-8 xl:pr-12">
            
            {/* About / Bio (EDITABLE) */}
            <section className="mb-10 relative group">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Biography</h2>
                {!editMode.about && (
                  <button onClick={() => toggleEdit('about')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={16} /></button>
                )}
              </div>
              
              {editMode.about ? (
                <div className="flex flex-col gap-2">
                  <textarea 
                    rows={6} 
                    maxLength={1000}
                    value={profile.about} 
                    onChange={(e) => handleInputChange(e, 'about')} 
                    className={`${inputClass} resize-y mb-0`} 
                  />
                  <div className="text-right text-xs text-gray-400 font-medium mb-3">
                    {profile.about.length} / 1000 characters
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleEdit('about')} className="bg-black text-[#F5F216] p-2 rounded-sm flex items-center gap-1 hover:bg-gray-800 transition-colors">
                      <Save size={16}/>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                  {profile.about}
                </div>
              )}
            </section>

            {/* Portfolio Links & Files (EDITABLE) */}
            <section className="mb-10 relative group">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Portfolio & Proof of Work</h2>
                {!editMode.portfolio && (
                  <button onClick={() => toggleEdit('portfolio')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={16} /></button>
                )}
              </div>

              {editMode.portfolio ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Portfolio Website Link</label>
                    <input type="url" value={profile.portfolioLink} onChange={(e) => handleInputChange(e, 'portfolioLink')} className={inputClass} />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Upload Images & Videos</label>
                    <label className="relative border-2 border-dashed border-gray-300 py-4 text-center flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors rounded-sm mb-3">
                      <input type="file" multiple accept="image/*,video/*" onChange={handlePortfolioImageUpload} className="hidden" />
                      <ImageIcon size={20} className="text-gray-400 mb-1" />
                      <span className="text-xs font-bold text-gray-500">Click to upload Images/Videos</span>
                    </label>

                    {profile.portfolioImages.map((img) => (
                      <div key={img.id} className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded-sm border border-gray-200">
                        <span className="text-sm font-medium truncate max-w-[80%]">{img.title}</span>
                        <button onClick={() => setProfile(p => ({ ...p, portfolioImages: p.portfolioImages.filter(i => i.id !== img.id)}))} className="text-red-500 hover:text-red-700"><X size={16}/></button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Upload Documents</label>
                    <label className="relative border-2 border-dashed border-gray-300 py-4 text-center flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors rounded-sm mb-3">
                      <input type="file" multiple accept=".pdf,.doc,.docx" onChange={handlePortfolioFileUpload} className="hidden" />
                      <FileText size={20} className="text-gray-400 mb-1" />
                      <span className="text-xs font-bold text-gray-500">Click to upload Document Files</span>
                    </label>

                    {profile.portfolioFiles.map((file, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 mb-2 rounded-sm border border-gray-200">
                        <span className="text-sm font-medium truncate max-w-[80%]">{file}</span>
                        <button onClick={() => handleRemoveArrayItem(file, 'portfolioFiles')} className="text-red-500 hover:text-red-700"><X size={16}/></button>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => toggleEdit('portfolio')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Web Link */}
                  {profile.portfolioLink && (
                    <a href={profile.portfolioLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline w-fit">
                      <Globe size={16} /> {profile.portfolioLink} <ExternalLink size={12} />
                    </a>
                  )}
                  
                  {/* Images Grid */}
                  {profile.portfolioImages.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profile.portfolioImages.map((img) => (
                        <div key={img.id} className="cursor-pointer">
                          <div className="w-full h-40 bg-gray-100 rounded-sm mb-2 overflow-hidden border border-gray-200 relative">
                            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-white p-1 rounded-sm shadow-sm"><ImageIcon size={14} className="text-gray-600"/></div>
                          </div>
                          <p className="text-sm font-bold text-black truncate">{img.title}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Document Files List */}
                  {profile.portfolioFiles.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Documents</h3>
                      {profile.portfolioFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 bg-gray-50 rounded-sm w-full sm:w-2/3">
                          <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm shrink-0 shadow-sm border border-gray-100">
                            <FileText size={16} className="text-blue-500" />
                          </div>
                          <span className="text-sm font-bold truncate text-gray-800 cursor-pointer">{file}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Certificates with PDF Previews (EDITABLE) */}
            <section className="relative group">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Certifications</h2>
                {!editMode.certificates && (
                  <button onClick={() => toggleEdit('certificates')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={16} /></button>
                )}
              </div>

              {editMode.certificates ? (
                <div className="flex flex-col gap-3">
                  {profile.certificates.map((cert, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 border border-gray-200 rounded-sm">
                      <span className="text-sm font-medium">{cert.name}</span>
                      <button onClick={() => handleRemoveCertificate(cert.name)} className="text-red-500 hover:text-red-700"><X size={16}/></button>
                    </div>
                  ))}
                  <div className="relative border-2 border-dashed border-gray-300 py-6 text-center cursor-pointer hover:border-black transition-colors rounded-sm">
                    <span className="text-xs font-bold text-gray-500">Upload new PDF certificate</span>
                  </div>
                  <button onClick={() => toggleEdit('certificates')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit mt-2 flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.certificates.length > 0 ? profile.certificates.map((cert, idx) => (
                    <div key={idx} className="flex flex-col border border-gray-200 rounded-sm overflow-hidden group/pdf cursor-pointer relative bg-gray-50">
                      {/* Stylized PDF Preview Box */}
                      <div className="h-32 w-full bg-gray-100 flex flex-col items-center justify-center relative overflow-hidden border-b border-gray-200">
                        <iframe src={`${cert.url}#toolbar=0&navpanes=0`} className="absolute inset-0 w-full h-full opacity-50 pointer-events-none" title={cert.name}></iframe>
                        <FileText size={32} className="text-gray-400 z-10" />
                        
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover/pdf:opacity-100 transition-opacity flex items-center justify-center z-20">
                           <span className="text-white text-xs font-bold flex items-center gap-1.5"><Eye size={14}/> Preview</span>
                        </a>
                      </div>
                      <div className="p-3 bg-white flex items-start gap-2">
                        <Award size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-gray-900 truncate block">{cert.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Verified PDF</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <span className="text-sm text-gray-500 italic">No certificates uploaded.</span>
                  )}
                </div>
              )}
            </section>

          </div>

          {/* RIGHT COLUMN: META DETAILS */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col shrink-0 mt-8 lg:mt-0">
            
            {/* Personal Details (EDITABLE) */}
            <section className="mb-8 relative group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Personal Details</h3>
                {!editMode.personal && <button onClick={() => toggleEdit('personal')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={14}/></button>}
              </div>

              {editMode.personal ? (
                <div className="flex flex-col gap-3">
                  <div><label className="text-[10px] font-bold text-gray-500 uppercase">Country</label><input type="text" value={profile.country} onChange={(e) => handleInputChange(e, 'country')} className={inputClass} /></div>
                  <div><label className="text-[10px] font-bold text-gray-500 uppercase">State</label><input type="text" value={profile.state} onChange={(e) => handleInputChange(e, 'state')} className={inputClass} /></div>
                  <div><label className="text-[10px] font-bold text-gray-500 uppercase">City</label><input type="text" value={profile.district} onChange={(e) => handleInputChange(e, 'district')} className={inputClass} /></div>
                  
                  {/* DOB is Read-Only even in Edit Mode */}
                  <div className="flex justify-between items-end border-t border-gray-100 pt-3 pb-2 mt-1">
                    <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Calendar size={16} /> Date of Birth</span>
                    <span className="text-sm font-bold text-black">{profile.dob}</span>
                  </div>

                  <button onClick={() => toggleEdit('personal')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit mt-1 flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><MapPin size={16} /> Country</span>
                    <span className="text-sm font-bold text-black">{profile.country}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Map size={16} /> State</span>
                    <span className="text-sm font-bold text-black">{profile.state}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Building size={16} /> City</span>
                    <span className="text-sm font-bold text-black">{profile.district}</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Calendar size={16} /> Date of Birth</span>
                    <span className="text-sm font-bold text-black">{profile.dob}</span>
                  </div>
                </div>
              )}
            </section>

            {/* Professional Details (READ ONLY) */}
            <section className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Professional Details</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Briefcase size={16} /> Category</span>
                  <span className="text-sm font-bold text-black text-right truncate max-w-[150px]">{profile.category}</span>
                </div>
                <div className="flex justify-between items-end pb-2">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Award size={16} /> Experience</span>
                  <span className="text-sm font-bold text-black">{profile.experience}</span>
                </div>
              </div>
            </section>

            {/* Performance Stats (READ ONLY) */}
            <section className="mb-8">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Performance</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><CheckCircle2 size={16} /> Completed Jobs</span>
                  <span className="text-sm font-bold text-black">{profile.stats.completedProjects}</span>
                </div>
                <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><ThumbsUp size={16} /> Job Success</span>
                  <span className="text-sm font-bold text-black">{profile.stats.successRate}</span>
                </div>
                <div className="flex justify-between items-end pb-2">
                  <span className="text-sm font-bold text-gray-600 flex items-center gap-2"><Star size={16} /> Average Rating</span>
                  <span className="text-sm font-bold text-black">{profile.stats.rating}</span>
                </div>
              </div>
            </section>

            {/* Skills (EDITABLE) */}
            <section className="mb-8 relative group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Skills</h3>
                {!editMode.skills && <button onClick={() => toggleEdit('skills')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={14}/></button>}
              </div>

              {editMode.skills ? (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Add skill..." value={tempInput} onChange={(e) => setTempInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddArrayItem(e, 'skills')} className={`${inputClass} mb-0`} />
                    <button onClick={(e) => handleAddArrayItem(e, 'skills')} className="bg-black text-[#F5F216] px-3 rounded-sm hover:bg-gray-800 transition-colors"><Plus size={16}/></button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 border border-gray-200 text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1">
                        {skill} <X size={12} className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveArrayItem(skill, 'skills')}/>
                      </span>
                    ))}
                  </div>
                  <button onClick={() => toggleEdit('skills')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-50 border border-gray-200 text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Languages (EDITABLE) */}
            <section className="mb-8 relative group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Globe size={16} /> Languages
                </h3>
                {!editMode.languages && <button onClick={() => toggleEdit('languages')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={14}/></button>}
              </div>

              {editMode.languages ? (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Add language..." value={tempInput} onChange={(e) => setTempInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddArrayItem(e, 'languages')} className={`${inputClass} mb-0`} />
                    <button onClick={(e) => handleAddArrayItem(e, 'languages')} className="bg-black text-[#F5F216] px-3 rounded-sm hover:bg-gray-800 transition-colors"><Plus size={16}/></button>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {profile.languages.map((lang, index) => (
                      <li key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 border border-gray-100 rounded-sm">
                        <span className="font-bold">{lang}</span>
                        <X size={14} className="cursor-pointer text-red-400 hover:text-red-600" onClick={() => handleRemoveArrayItem(lang, 'languages')}/>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => toggleEdit('languages')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit mt-1 flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {profile.languages.map((lang, index) => (
                    <span key={index} className="text-sm font-bold text-gray-800">{lang}</span>
                  ))}
                </div>
              )}
            </section>

            {/* Education (EDITABLE) */}
            <section className="mb-8 relative group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap size={16} /> Education
                </h3>
                {!editMode.education && <button onClick={() => toggleEdit('education')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={14}/></button>}
              </div>

              {editMode.education ? (
                <div className="flex flex-col gap-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-3 border border-gray-200 rounded-sm">
                      <input type="text" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} placeholder="Degree" className={inputClass} />
                      <input type="text" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} placeholder="Institution" className={inputClass} />
                      <input type="text" value={edu.year} onChange={(e) => handleEducationChange(index, 'year', e.target.value)} placeholder="Year" className={inputClass} />
                    </div>
                  ))}
                  <button onClick={() => toggleEdit('education')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {profile.education.map((edu, index) => (
                    <li key={index} className="flex flex-col border-b border-gray-100 pb-3 last:border-0">
                      <span className="text-sm font-bold text-black">{edu.degree}</span>
                      <span className="text-xs font-medium text-gray-700">{edu.institution}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">{edu.year}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Socials (EDITABLE) */}
            <section className="relative group mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <LinkIcon size={16} /> Social Links
                </h3>
                {!editMode.socials && <button onClick={() => toggleEdit('socials')} className="text-gray-400 hover:text-black transition-colors md:opacity-0 md:group-hover:opacity-100"><Edit3 size={14}/></button>}
              </div>

              {editMode.socials ? (
                <div className="flex flex-col gap-3">
                  <div><label className="text-[10px] font-bold text-gray-500">LinkedIn</label><input type="text" value={profile.socials.linkedin} onChange={(e) => handleInputChange(e, 'linkedin', 'socials')} className={inputClass} /></div>
                  <div><label className="text-[10px] font-bold text-gray-500">Instagram</label><input type="text" value={profile.socials.instagram} onChange={(e) => handleInputChange(e, 'instagram', 'socials')} className={inputClass} /></div>
                  <div><label className="text-[10px] font-bold text-gray-500">Facebook</label><input type="text" value={profile.socials.facebook} onChange={(e) => handleInputChange(e, 'facebook', 'socials')} className={inputClass} /></div>
                  <button onClick={() => toggleEdit('socials')} className="bg-black text-[#F5F216] p-2 rounded-sm w-fit mt-1 flex items-center hover:bg-gray-800 transition-colors"><Save size={16}/></button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {Object.entries(profile.socials).map(([platform, url], index) => {
                    if(!url) return null;
                    return (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline capitalize break-all">
                        <ExternalLink size={14} className="text-gray-400 shrink-0" /> {url}
                      </a>
                    )
                  })}
                </div>
              )}
            </section>

          </div>

        </div>
      </div>
    </main>
  )
}