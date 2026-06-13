import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react'

export default function RequestCoworker() {
  const navigate = useNavigate()

  // Form States
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    type: 'Fixed Price',
    deadline: '',
    requirements: [],
    files: []
  })

  const [reqInput, setReqInput] = useState('')

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Requirement Handlers
  const handleAddRequirement = (e) => {
    e.preventDefault()
    if (reqInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, reqInput.trim()]
      }))
      setReqInput('')
    }
  }

  const handleRemoveRequirement = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, index) => index !== indexToRemove)
    }))
  }

  // Mock File Upload Handler
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type.startsWith('image/') ? 'image' : 'document'
    }))
    
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...uploadedFiles]
    }))
  }

  const handleRemoveFile = (idToRemove) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(file => file.id !== idToRemove)
    }))
  }

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting Co-worker Request:', formData)
    // Here you would normally send the data to your backend.
    
    // Redirect back to My Projects after submission
    navigate('/freelancer/dashboard/my-jobs')
  }

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[800px] mx-auto flex flex-col gap-6 pb-12">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors w-fit mb-2"
        >
          <ArrowLeft size={16} /> Back to Projects
        </button>

        {/* Page Header */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Request a Co-worker</h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            Need help completing a project? Post a sub-job to find a qualified co-worker within the Hadei Network. Define the scope, budget cut (%), and requirements below.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* 1. Job Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="title"
              name="title"
              required
              placeholder="e.g., Frontend Developer for UI Integration"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3.5 text-sm text-black transition-colors focus:border-black focus:outline-none"
            />
          </div>

          {/* 2. Job Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="description"
              name="description"
              required
              rows={5}
              placeholder="Describe exactly what you need help with..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3.5 text-sm text-black transition-colors focus:border-black focus:outline-none resize-y"
            />
          </div>

          {/* 3. Budget, Type, Deadline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50/50 border border-gray-200 rounded-sm">
            
            {/* Amount / Percentage */}
            <div>
              <label htmlFor="amount" className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                Job Amount (%) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  id="amount"
                  name="amount"
                  min="1"
                  max="100"
                  required
                  placeholder="e.g., 30"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-sm pl-4 pr-10 py-3.5 text-sm text-black transition-colors focus:border-black focus:outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 font-medium">Cut of the total project budget.</p>
            </div>

            {/* Job Type */}
            <div>
              <label htmlFor="type" className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select 
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3.5 text-sm text-black transition-colors focus:border-black focus:outline-none appearance-none"
              >
                <option value="Fixed Price">Fixed Price</option>
                <option value="Hourly">Hourly</option>
                <option value="Milestone">Milestone Based</option>
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                id="deadline"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-sm px-4 py-3.5 text-sm text-black transition-colors focus:border-black focus:outline-none"
              />
            </div>
            
          </div>

          {/* 4. Requirements Builder */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Requirements & Skills
            </label>
            <div className="flex gap-3 mb-4">
              <input 
                type="text" 
                placeholder="e.g., Must have 3+ years experience in Node.js"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddRequirement(e)}
                className="flex-1 bg-white border border-gray-300 rounded-sm px-4 py-3.5 text-sm text-black transition-colors focus:border-black focus:outline-none"
              />
              <button 
                type="button"
                onClick={handleAddRequirement}
                className="bg-black text-[#F5F216] px-5 rounded-sm text-sm font-bold flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0"
              >
                <Plus size={18} /> Add
              </button>
            </div>

            {/* Requirements List */}
            {formData.requirements.length > 0 && (
              <ul className="flex flex-col gap-2">
                {formData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start justify-between gap-3 bg-gray-50 border border-gray-200 px-4 py-3 rounded-sm group">
                    <div className="flex items-start gap-2 text-sm text-gray-800">
                      <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-gray-400" />
                      <span className="leading-relaxed">{req}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="text-gray-400 hover:text-red-600 transition-colors shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 5. Image & Files Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              Project Files & References
            </label>
            
            {/* Upload Zone */}
            <div className="relative border-2 border-dashed border-gray-300 rounded-sm bg-gray-50/50 hover:bg-gray-50 hover:border-black transition-colors group">
              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center pointer-events-none">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:border-black transition-colors">
                  <UploadCloud size={20} className="text-gray-500 group-hover:text-[#F5F216] transition-colors" />
                </div>
                <p className="text-sm font-bold text-black mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 font-medium">SVG, PNG, JPG, PDF or DOCX (max. 10MB)</p>
              </div>
            </div>

            {/* File List */}
            {formData.files.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-sm bg-white">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 bg-gray-100 text-gray-600 flex items-center justify-center rounded-sm shrink-0">
                        {file.type === 'image' ? <ImageIcon size={14} /> : <FileText size={14} />}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-gray-900 truncate">{file.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{file.size}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors shrink-0 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 w-full sm:w-auto">
              <AlertCircle size={14} />
              <span>Co-workers must be verified Hadei users.</span>
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto bg-black text-[#F5F216] px-10 py-4 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              Submit Request
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}