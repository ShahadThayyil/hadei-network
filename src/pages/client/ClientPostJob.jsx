import { useNavigate } from 'react-router-dom'
import { PlusCircle, UploadCloud, ArrowLeft } from 'lucide-react'

export default function ClientPostJob() {
  const navigate = useNavigate()

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-gray-50/30 text-black font-sans overflow-y-auto">
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6">
        
        {/* Header Area */}
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit mb-4"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <PlusCircle size={24} /> Post a New Job
          </h1>
          <p className="text-sm text-gray-500 mt-1">Fill out the brief below to connect with top-tier vetted talent.</p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col">
          <div className="p-6 md:p-8 flex flex-col gap-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
              <input type="text" placeholder="e.g. Senior React Developer" className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black bg-white transition-colors">
                  <option>Web Development</option>
                  <option>UI/UX Design</option>
                  <option>App Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget (₹)</label>
                <input type="text" placeholder="e.g. 50,000" className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea rows="5" placeholder="Describe the project scope, goals, and deliverables..." className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black resize-none transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Requirements (Skills)</label>
              <input type="text" placeholder="e.g. React, Node.js, Figma (Comma separated)" className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Deadline</label>
                <input type="date" className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location / Timezone</label>
                <input type="text" placeholder="e.g. Remote (IST)" className="w-full border border-gray-300 p-3 rounded-sm text-sm outline-none focus:border-black transition-colors" />
              </div>
            </div>
            
            {/* File Upload Optional */}
            <div className="mt-2 border-2 border-dashed border-gray-300 p-8 flex flex-col items-center justify-center rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <UploadCloud size={32} className="text-gray-400 mb-3" />
              <p className="text-sm font-bold text-gray-700">Upload Files or Documents (Optional)</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX, JPG up to 10MB</p>
            </div>

          </div>

          <div className="bg-gray-50 px-6 py-5 border-t border-gray-100 flex justify-end gap-3 rounded-b-sm">
            <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-black transition-colors">
              Cancel
            </button>
            <button className="px-8 py-2.5 text-sm font-bold bg-black text-[#F5F216] rounded-sm hover:bg-gray-800 transition-colors">
              Publish Job
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}