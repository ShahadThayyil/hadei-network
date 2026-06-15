import { useState } from 'react'
import { Search, Send, Paperclip, CheckCheck } from 'lucide-react'

export default function ClientChats() {
  const [activeChat, setActiveChat] = useState('usr-1')

  const contacts = [
    { id: 'usr-1', name: 'Arjun Kumar', role: 'React Developer', lastMsg: 'I have uploaded the files.', time: '10:42 AM', online: true },
    { id: 'usr-2', name: 'Neha Mathews', role: 'Backend Dev', lastMsg: 'Let me know when approved.', time: 'Yesterday', online: false }
  ]

  return (
    <div className="flex h-full w-full bg-white overflow-hidden">
      
      {/* Contacts Sidebar */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col h-full bg-gray-50/50">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Search contacts..." className="w-full bg-white border border-gray-200 rounded-sm pl-8 pr-3 py-2 text-xs outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map(c => (
            <div key={c.id} onClick={() => setActiveChat(c.id)} className={`p-4 border-b border-gray-100 cursor-pointer transition-colors flex items-center gap-3 ${activeChat === c.id ? 'bg-gray-100' : 'hover:bg-white'}`}>
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{c.name}</h4>
                  <span className="text-[9px] text-gray-400">{c.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{c.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-col flex-1 h-full bg-white relative">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div>
              <h3 className="text-sm font-bold">Arjun Kumar</h3>
              <p className="text-[10px] text-green-600 font-medium">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 flex flex-col gap-4">
          <div className="flex items-end gap-2 max-w-[70%]">
            <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0"></div>
            <div className="bg-white border border-gray-200 p-3 rounded-tr-xl rounded-b-xl shadow-sm text-sm text-gray-700">
              Hello! I've completed the integration of Redux for the dashboard. Please review the PR.
            </div>
          </div>
          <div className="flex items-end gap-2 max-w-[70%] self-end">
            <div className="bg-black text-white p-3 rounded-tl-xl rounded-b-xl shadow-sm text-sm">
              Great work Arjun. Let me check it out and get back to you shortly.
              <div className="flex justify-end mt-1"><CheckCheck size={12} className="text-yellow-400" /></div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-200 shrink-0 flex items-center gap-3">
          <button className="text-gray-400 hover:text-black p-2"><Paperclip size={18} /></button>
          <input type="text" placeholder="Type your message..." className="flex-1 bg-gray-50 border border-gray-200 rounded-sm px-4 py-2.5 text-sm outline-none focus:border-black" />
          <button className="bg-black text-[#F5F216] p-2.5 rounded-sm hover:bg-gray-800 transition-colors"><Send size={16} /></button>
        </div>
      </div>
    </div>
  )
}