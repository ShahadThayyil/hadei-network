import { useState, useRef } from 'react'
import { Edit2, Award, Briefcase, Camera, Save, X } from 'lucide-react'

export default function ClientProfile() {
  const [isEditing, setIsEditing] = useState(false)
  
  // Dummy State for Form
  const [profileData, setProfileData] = useState({
    name: 'Muhammed Shahad',
    title: 'Enterprise Account Director',
    email: 'client@demo.com',
    phone: '+91 98765 43210',
    company: 'TechNova Solutions'
  })

  const fileInputRef = useRef(null)
  const profilePic = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"

  const handleSave = () => {
    // API logic goes here
    setIsEditing(false)
  }

  const handleImageClick = () => {
    if(isEditing && fileInputRef.current) fileInputRef.current.click()
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-gray-50/30 text-black font-sans overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight">Account Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="bg-white border border-gray-300 text-black px-4 py-2 rounded-sm text-xs font-bold hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Edit2 size={14} /> Edit Profile
            </button>
          ) : (
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-black transition-colors flex items-center gap-1 text-sm font-bold">
              <X size={16} /> Cancel
            </button>
          )}
        </div>

        {/* Top Profile Card */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-black p-1" />
            {isEditing && (
              <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
          </div>
          <div className="flex-1 text-center md:text-left w-full">
            {isEditing ? (
              <div className="flex flex-col gap-3 max-w-sm mx-auto md:mx-0">
                <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="text-xl font-bold border border-gray-300 rounded-sm px-3 py-1.5 outline-none focus:border-black" />
                <input type="text" value={profileData.title} onChange={e => setProfileData({...profileData, title: e.target.value})} className="text-sm font-medium border border-gray-300 rounded-sm px-3 py-1.5 outline-none focus:border-black" />
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-sm text-gray-500 font-medium mb-4">{profileData.title}</p>
              </>
            )}
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-sm flex items-center gap-2">
                <Award size={16} className="text-[#F5F216] fill-black" />
                <div><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Hadei Points</p><p className="text-sm font-black">1,450 XP</p></div>
              </div>
              <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-sm flex items-center gap-2">
                <Briefcase size={16} className="text-gray-600" />
                <div><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Projects Posted</p><p className="text-sm font-black">12</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
          <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-500">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} disabled={!isEditing} className={`w-full border p-2.5 rounded-sm text-sm outline-none transition-colors ${isEditing ? 'border-gray-300 focus:border-black bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
              <input type="tel" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} disabled={!isEditing} className={`w-full border p-2.5 rounded-sm text-sm outline-none transition-colors ${isEditing ? 'border-gray-300 focus:border-black bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
              <input type="text" value={profileData.company} onChange={e => setProfileData({...profileData, company: e.target.value})} disabled={!isEditing} className={`w-full border p-2.5 rounded-sm text-sm outline-none transition-colors ${isEditing ? 'border-gray-300 focus:border-black bg-white' : 'border-transparent bg-gray-50 text-gray-600'}`} />
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end pt-4 border-t border-gray-100">
              <button onClick={handleSave} className="bg-black text-[#F5F216] px-8 py-2.5 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}