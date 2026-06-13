import { useState, useRef, useEffect } from 'react'
import { 
  Search, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Send, 
  Mic, 
  ArrowLeft, 
  Check, 
  CheckCheck,
  Users,
  Briefcase,
  MessageSquare,
  UploadCloud,
  ChevronRight,
  FileText,
  Link as LinkIcon,
  Image as ImageIcon,
  X,
  AlertOctagon,
  Edit3,
  Download
} from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'

export default function FreelancerChats() {
  const { chatId: activeChatId } = useParams()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const messagesEndRef = useRef(null)

  // UI Toggles
  const [chatDropdownOpen, setChatDropdownOpen] = useState(false)
  const [showMediaPane, setShowMediaPane] = useState(false)
  const [mediaTab, setMediaTab] = useState('media') // 'media', 'docs', 'links'
  const [expandedMediaView, setExpandedMediaView] = useState(false) // Replaces chat pane with full media view

  // Modal States
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [reportMessage, setReportMessage] = useState('')
  
  const [isEditTitleModalOpen, setIsEditTitleModalOpen] = useState(false)
  const [newTitleInput, setNewTitleInput] = useState('')

  // -----------------------------
  // MOCK DATA: CHATS (With image avatars)
  // -----------------------------
  const [chats, setChats] = useState([
    {
      id: 'c1',
      projectId: 'p1',
      projectName: 'E-commerce Redesign',
      chatType: 'client',
      name: 'Sarah Jenkins (Client)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
      lastMessage: 'Sounds perfect, let’s proceed with that layout.',
      time: '10:45 AM',
      unread: 0,
      online: true,
      isCompleted: false
    },
    {
      id: 'c2',
      projectId: 'p1',
      projectName: 'E-commerce Redesign',
      chatType: 'team',
      name: 'E-com Dev Team',
      avatar: '👥',
      lastMessage: 'Aman: I just pushed the backend updates.',
      time: '10:30 AM',
      unread: 2,
      online: false,
      isCompleted: false
    },
    {
      id: 'c3',
      projectId: 'p2',
      projectName: 'React Native MVP',
      chatType: 'client',
      name: 'Marcus Thorne (Client)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
      lastMessage: 'Can we schedule a quick call tomorrow?',
      time: 'Yesterday',
      unread: 1,
      online: false,
      isCompleted: false
    },
    {
      id: 'c4',
      projectId: 'p2',
      projectName: 'React Native MVP',
      chatType: 'team',
      name: 'Mobile App Team',
      avatar: '👥',
      lastMessage: 'Rahul: The new screens are on Figma.',
      time: 'Yesterday',
      unread: 0,
      online: true,
      isCompleted: false
    },
    {
      id: 'c5',
      projectId: 'p3',
      projectName: 'SaaS Dashboard UI',
      chatType: 'client',
      name: 'David Chen (Client)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
      lastMessage: 'Payment has been processed.',
      time: 'Tuesday',
      unread: 0,
      online: false,
      isCompleted: true
    },
    {
      id: 'c6',
      projectId: 'p4',
      projectName: 'Landing Page GSAP',
      chatType: 'client',
      name: 'Elena Rodriguez (Client)',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
      lastMessage: 'Thanks for the quick turnaround!',
      time: 'Monday',
      unread: 0,
      online: false,
      isCompleted: false
    },
    {
      id: 'c7',
      projectId: 'p5',
      projectName: 'Healthcare Auth',
      chatType: 'client',
      name: 'Dr. Anil Kumar (Client)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
      lastMessage: 'Please review the HIPAA compliance doc.',
      time: 'Monday',
      unread: 0,
      online: true,
      isCompleted: false
    },
    {
      id: 'c8',
      projectId: 'p6',
      projectName: 'Admin Redux Refactor',
      chatType: 'client',
      name: 'James Wilson (Client)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
      lastMessage: 'We are cancelling this module for now.',
      time: 'Last Week',
      unread: 0,
      online: false,
      isCompleted: false
    }
  ])

  // -----------------------------
  // MOCK DATA: MESSAGES DICTIONARY
  // -----------------------------
  const [messages, setMessages] = useState({
    'c1': [
      { id: 1, text: 'Hi Sarah, I have uploaded the wireframes for the homepage.', time: '09:00 AM', isMe: true, status: 'read' },
      { id: 2, text: 'Let me check them right now.', time: '09:15 AM', isMe: false },
      { id: 3, text: 'They look really clean. I love the minimalist approach.', time: '10:40 AM', isMe: false },
      { id: 4, text: 'Awesome! Should I apply the same layout to the product pages?', time: '10:42 AM', isMe: true, status: 'read' },
      { id: 5, text: 'Sounds perfect, let’s proceed with that layout.', time: '10:45 AM', isMe: false }
    ],
    'c2': [
      { id: 1, text: 'Hey team, I finished the UI components for the navbar.', time: '08:30 AM', isMe: true, status: 'read', senderName: 'Me' },
      { id: 2, text: 'Great, I will link them to the API endpoints today.', time: '09:00 AM', isMe: false, senderName: 'Aman S.' },
      { id: 3, text: 'Can someone check the hover states on the dropdown? It feels a bit clunky.', time: '09:45 AM', isMe: false, senderName: 'Priya R.' },
      { id: 4, text: 'I just pushed the backend updates.', time: '10:30 AM', isMe: false, senderName: 'Aman S.' }
    ]
  })

  // -----------------------------
  // LOGIC
  // -----------------------------
  const filteredChats = chats.filter(c => 
    c.projectName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeChat = chats.find(c => c.id === activeChatId)
  const currentMessages = messages[activeChatId] || []

  // Auto-scroll to bottom
  useEffect(() => {
    if (!expandedMediaView) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentMessages, activeChatId, expandedMediaView])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.chat-dropdown-container')) {
        setChatDropdownOpen(false)
      }
    }
    window.addEventListener('click', closeDropdown)
    return () => window.removeEventListener('click', closeDropdown)
  }, [])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!messageInput.trim() || !activeChatId || activeChat?.isCompleted) return

    const newMessage = {
      id: Date.now(),
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent'
    }

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }))
    setMessageInput('')
  }

  const handleMarkAsCompleted = () => {
    if (!activeChatId) return
    setChats(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, isCompleted: true } : c
    ))
  }

  const handleReportClient = () => {
    console.log(`Reporting client for chat ${activeChatId}: ${reportMessage}`)
    setIsReportModalOpen(false)
    setReportMessage('')
  }

  const handleSaveNewTitle = () => {
    if (!activeChatId || !newTitleInput.trim()) return
    setChats(prev => prev.map(c => 
      c.id === activeChatId ? { ...c, projectName: newTitleInput.trim() } : c
    ))
    setIsEditTitleModalOpen(false)
  }

  const handleOpenEditTitle = () => {
    setNewTitleInput(activeChat?.projectName || '')
    setIsEditTitleModalOpen(true)
  }

  // Helper to render Avatar
  const renderAvatar = (chat, sizeClass = "w-12 h-12", textClass = "text-lg") => {
    if (chat.chatType === 'team' || chat.avatar === '👥') {
      return (
        <div className={`${sizeClass} bg-black text-[#F5F216] rounded-full flex items-center justify-center font-bold ${textClass} shrink-0`}>
          {chat.avatar}
        </div>
      )
    }
    return (
      <img 
        src={chat.avatar} 
        alt={chat.name} 
        className={`${sizeClass} rounded-full object-cover shrink-0`} 
      />
    )
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="flex h-full w-full bg-white overflow-hidden text-black font-sans">
      
      {/* ==================== LEFT SIDEBAR: CHAT LIST ==================== */}
      <div className={`w-full md:w-[340px] lg:w-[400px] flex-col border-r border-gray-200 bg-white ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-5 bg-gray-50 border-b border-gray-200 shrink-0">
          <h2 className="text-xl font-bold tracking-tight">Messages</h2>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-100 bg-white shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border border-transparent rounded-sm pl-10 pr-4 py-2 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          {filteredChats.map(chat => {
            const isActive = chat.id === activeChatId
            return (
              <div 
                key={chat.id}
                onClick={() => {
                  navigate(`/freelancer/dashboard/messages/${chat.id}`)
                  setShowMediaPane(false)
                  setExpandedMediaView(false)
                }}
                className={`flex items-stretch p-3 border-b border-gray-50 cursor-pointer transition-colors ${
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                {/* Avatar */}
                <div className="mr-3">
                  {renderAvatar(chat)}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <h3 className="text-sm font-bold text-black truncate">
                        {chat.projectName}
                      </h3>
                      {chat.isCompleted && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 bg-green-100 text-green-700 rounded-sm uppercase tracking-wider shrink-0">
                          Completed
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] whitespace-nowrap ml-2 ${chat.unread > 0 ? 'text-black font-bold' : 'text-gray-400 font-medium'}`}>
                      {chat.time}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 truncate text-gray-500">
                      {chat.chatType === 'team' && <Users size={12} className="shrink-0"/>}
                      <p className={`text-sm truncate ${chat.unread > 0 ? 'text-black font-semibold' : ''}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-[#F5F216] text-black rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ml-2">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ==================== CENTER PANE: ACTIVE CHAT OR EXPANDED MEDIA ==================== */}
      <div className={`flex-1 flex-col bg-[#F9F9F9] relative ${!activeChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {!activeChat ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center border-b-[6px] border-[#F5F216] bg-gray-50">
            <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
              <MessageSquare size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-light text-gray-800 tracking-tight mb-2">Hadei Network Messages</h2>
            <p className="text-sm text-gray-500">Select a project or team chat to start messaging.</p>
          </div>
        ) : expandedMediaView ? (
          
          /* Expanded Media View (Replaces Chat) */
          <div className="flex-1 flex flex-col bg-white h-full">
            <div className="h-16 flex items-center gap-4 px-4 bg-gray-50 border-b border-gray-200 shrink-0">
              <button onClick={() => setExpandedMediaView(false)} className="text-gray-500 hover:text-black transition-colors">
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-base font-bold tracking-tight">Media, links and docs</h2>
              <div className="ml-auto relative w-64 hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="w-full bg-white border border-gray-200 rounded-sm pl-9 pr-4 py-1.5 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
            
            {/* Media Tabs inside Expanded View */}
            <div className="flex border-b border-gray-200 shrink-0">
              {['media', 'docs', 'links'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setMediaTab(tab)}
                  className={`flex-1 py-3 text-sm font-bold capitalize transition-colors border-b-2 ${mediaTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
               {mediaTab === 'media' && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {[
                      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=200&auto=format&fit=crop',
                    ].map((img, i) => (
                      <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center rounded-sm overflow-hidden cursor-pointer">
                        <img src={img} alt="media" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {mediaTab === 'docs' && (
                  <div className="flex flex-col gap-2 max-w-3xl">
                    {[
                      { name: 'Wireframes_v2.pdf', size: '2.4 MB', date: 'Oct 12' },
                      { name: 'API_Docs_Final.docx', size: '1.1 MB', date: 'Oct 10' },
                      { name: 'Requirements_Specs.txt', size: '15 KB', date: 'Oct 08' },
                      { name: 'Invoice_004.pdf', size: '340 KB', date: 'Oct 01' }
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-sm cursor-pointer">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="bg-black text-[#F5F216] p-2 rounded-sm"><FileText size={18}/></div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold text-black truncate">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size} • {doc.date}</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-black px-2"><Download size={18}/></button>
                      </div>
                    ))}
                  </div>
                )}
                {mediaTab === 'links' && (
                  <div className="flex flex-col gap-2 max-w-3xl">
                    {[
                      { url: 'https://figma.com/design/ecommerce-v2', desc: 'Updated Figma Designs', date: 'Oct 12' },
                      { url: 'https://github.com/org/repo/pull/42', desc: 'PR for Authentication Module', date: 'Oct 09' }
                    ].map((link, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-sm cursor-pointer">
                        <div className="bg-gray-200 text-gray-600 p-2 rounded-sm"><LinkIcon size={18}/></div>
                        <div className="overflow-hidden flex-1">
                          <p className="text-sm font-bold text-blue-600 hover:underline truncate">{link.url}</p>
                          <p className="text-xs text-gray-500 truncate">{link.desc} • {link.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

        ) : (

          /* Active Chat Layout */
          <>
            {/* Chat Header */}
            <div className="h-16 flex items-center justify-between px-4 bg-gray-50 border-b border-gray-200 shrink-0 z-10">
              
              {/* Profile Clickable Area */}
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-1.5 -ml-1.5 rounded-sm transition-colors"
                onClick={() => setShowMediaPane(true)}
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/freelancer/dashboard/messages') }}
                  className="md:hidden text-gray-500 hover:text-black mr-1"
                >
                  <ArrowLeft size={24} />
                </button>
                
                {renderAvatar(activeChat, "w-10 h-10", "text-base")}

                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-black">{activeChat.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {activeChat.chatType === 'client' 
                      ? (activeChat.online ? 'Online' : 'Last seen recently') 
                      : `${activeChat.projectName} Team Group`}
                  </p>
                </div>
              </div>
              
              {/* Action Icons */}
              <div className="flex items-center gap-4 text-gray-500 chat-dropdown-container relative">
                
                {!activeChat.isCompleted && activeChat.chatType === 'client' && (
                  <button 
                    onClick={handleMarkAsCompleted}
                    className="bg-black text-[#F5F216] px-3 py-1.5 text-xs font-bold rounded-sm hover:bg-gray-800 transition-colors hidden sm:block"
                  >
                    Mark Completed
                  </button>
                )}

                <button 
                  onClick={() => setChatDropdownOpen(!chatDropdownOpen)}
                  className="hover:text-black transition-colors p-1"
                >
                  <MoreVertical size={20} />
                </button>

                {/* 3 Dots Dropdown */}
                {chatDropdownOpen && (
                  <div className="absolute right-0 top-10 bg-white border border-gray-200 shadow-md w-48 z-50 rounded-sm py-1">
                    {!activeChat.isCompleted && activeChat.chatType === 'client' && (
                      <button 
                        onClick={() => { handleMarkAsCompleted(); setChatDropdownOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm font-bold text-black hover:bg-gray-50 sm:hidden border-b border-gray-100"
                      >
                        Mark Completed
                      </button>
                    )}
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Clear Chat
                    </button>
                    {activeChat.chatType === 'client' && (
                      <button 
                        onClick={() => { setIsReportModalOpen(true); setChatDropdownOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                      >
                        Report Client
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar relative bg-[#EFEAE2]">
              
              {currentMessages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full">
  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">
    — Start of Conversation —
  </p>
</div>
              ) : (
                currentMessages.map((msg) => {
                  const showSenderName = activeChat.chatType === 'team' && !msg.isMe
                  
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] md:max-w-[65%] rounded-sm p-2.5 relative shadow-sm border ${
                          msg.isMe 
                            ? 'bg-[#F5F216] text-black border-[#E5E200]' 
                            : 'bg-white text-black border-gray-200'
                        }`}
                      >
                        {showSenderName && (
                          <p className="text-[10px] font-black text-gray-800 mb-1">{msg.senderName}</p>
                        )}
                        
                        <p className="text-sm leading-relaxed pr-12 whitespace-pre-wrap">
                          {msg.text}
                        </p>
                        
                        <div className="absolute bottom-1 right-2 flex items-center gap-1">
                          <span className="text-[9px] font-medium opacity-60">
                            {msg.time}
                          </span>
                          {msg.isMe && (
                            <span className="text-gray-600 opacity-80">
                              {msg.status === 'read' ? <CheckCheck size={14} className="text-blue-500" /> : <Check size={14} />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area / Completed State */}
            {activeChat.isCompleted ? (
              <div className="p-5 bg-white border-t border-gray-200 flex flex-col items-center justify-center gap-3 text-center shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
                <p className="text-sm text-gray-500 font-medium">This project has been marked as completed. The chat is now read-only.</p>
                <button className="bg-black text-[#F5F216] px-6 py-3 rounded-sm text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <UploadCloud size={18} /> Upload Final Output to Client Cloud
                </button>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 border-t border-gray-200 shrink-0 flex items-end gap-2">
                <button className="p-2.5 text-gray-500 hover:text-black transition-colors rounded-sm shrink-0">
                  <Smile size={22} />
                </button>
                <button className="p-2.5 text-gray-500 hover:text-black transition-colors rounded-sm shrink-0">
                  <Paperclip size={20} />
                </button>
                
                <form onSubmit={handleSendMessage} className="flex-1 flex relative">
                  <textarea 
                    rows={1}
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(e)
                      }
                    }}
                    className="w-full bg-white border border-gray-300 rounded-sm pl-4 pr-10 py-3 text-sm text-black outline-none focus:border-black transition-colors resize-none max-h-32 custom-scrollbar"
                  />
                </form>

                {messageInput.trim() ? (
                  <button 
                    onClick={handleSendMessage}
                    className="p-2.5 bg-black text-[#F5F216] hover:bg-gray-800 transition-colors rounded-sm shrink-0 shadow-sm"
                  >
                    <Send size={20} className="ml-0.5" />
                  </button>
                ) : (
                  <button className="p-2.5 text-gray-500 hover:text-black transition-colors rounded-sm shrink-0">
                    <Mic size={22} />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* ==================== RIGHT PANE: CONTACT / MEDIA INFO ==================== */}
      {showMediaPane && activeChat && !expandedMediaView && (
        <div className="absolute inset-0 z-30 md:static w-full md:w-[320px] lg:w-[360px] bg-white border-l border-gray-200 flex flex-col shadow-xl md:shadow-none animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="h-16 flex items-center gap-4 px-4 bg-gray-50 border-b border-gray-200 shrink-0">
            <button onClick={() => setShowMediaPane(false)} className="text-gray-500 hover:text-black transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-base font-bold tracking-tight">Contact Info</h2>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
            
            {/* Profile Summary */}
            <div className="flex flex-col items-center justify-center p-6 border-b border-gray-100 bg-white text-center">
              {renderAvatar(activeChat, "w-32 h-32", "text-5xl")}
              
              <h2 className="text-xl font-bold text-black mt-4">{activeChat.name}</h2>
              
              {/* Editable Project Title */}
<div className="flex items-center justify-center gap-2 mt-1 group">
  <p className="text-sm text-gray-500">{activeChat.projectName}</p>
<button 
    onClick={handleOpenEditTitle}
    className="text-gray-400 hover:text-black transition-colors"
    title="Edit Project Title (Local)"
  >
    <Edit3 size={14} />
  </button>
</div>
            </div>

            {/* Media Tabs */}
            <div className="p-4 bg-white border-b border-gray-100">
              <div 
                className="flex items-center justify-between mb-4 cursor-pointer group"
                onClick={() => setExpandedMediaView(true)}
              >
                <h3 className="text-sm font-bold text-gray-800 group-hover:underline decoration-2 underline-offset-2">Media, links and docs</h3>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-black transition-colors" />
              </div>
              
              <div className="flex gap-1 bg-gray-100 p-1 rounded-sm mb-4">
                <button 
                  onClick={() => setMediaTab('media')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-colors ${mediaTab === 'media' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  Media
                </button>
                <button 
                  onClick={() => setMediaTab('docs')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-colors ${mediaTab === 'docs' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  Docs
                </button>
                <button 
                  onClick={() => setMediaTab('links')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-sm transition-colors ${mediaTab === 'links' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                >
                  Links
                </button>
              </div>

              {/* Tab Content (Preview size) */}
              <div className="min-h-[160px]">
                {mediaTab === 'media' && (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=200&auto=format&fit=crop'
                    ].map((img, i) => (
                      <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center rounded-sm overflow-hidden">
                        <img src={img} alt="media preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {mediaTab === 'docs' && (
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Wireframes_v2.pdf', size: '2.4 MB' },
                      { name: 'API_Docs.docx', size: '1.1 MB' }
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-sm">
                        <div className="bg-black text-[#F5F216] p-2 rounded-sm"><FileText size={16}/></div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-black truncate">{doc.name}</p>
                          <p className="text-[10px] text-gray-500">{doc.size} • PDF Document</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {mediaTab === 'links' && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-sm">
                      <div className="bg-gray-200 text-gray-600 p-2 rounded-sm"><LinkIcon size={16}/></div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-blue-600 hover:underline truncate">https://figma.com/design/ecommerce</p>
                        <p className="text-[10px] text-gray-500">Figma Design File</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1" />

            {/* Report Button (Bottom of Pane) */}
            {activeChat.chatType === 'client' && (
              <div className="p-4 border-t border-gray-100">
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 bg-white border border-gray-200 font-bold py-3 rounded-sm transition-colors text-sm"
                >
                  <AlertOctagon size={16} /> Report Client
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== MODALS ==================== */}

      {/* Report Client Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black flex items-center gap-2">
                <AlertOctagon size={18} className="text-red-500" /> Report Client
              </h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4">
                This report will be sent directly to the Hadei Network trust & safety team for review. The client will not be notified.
              </p>
              <textarea 
                rows={4}
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="Please describe the issue..."
                className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2.5 text-sm text-black transition-colors focus:border-black focus:outline-none resize-none"
              />
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleReportClient}
                disabled={!reportMessage.trim()}
                className={`px-6 py-2 text-xs font-bold rounded-sm transition-colors ${
                  !reportMessage.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Title Modal */}
      {isEditTitleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-sm border border-gray-200 flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-black flex items-center gap-2">
                <Edit3 size={18} /> Edit Chat Label
              </h3>
              <button onClick={() => setIsEditTitleModalOpen(false)} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Project Display Name</p>
              <input 
                type="text"
                value={newTitleInput}
                onChange={(e) => setNewTitleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveNewTitle()}
                className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2 text-sm text-black transition-colors focus:border-black focus:outline-none"
              />
              <p className="text-[10px] text-gray-400 mt-2">This change is local and only visible in your chat list.</p>
            </div>

            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsEditTitleModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNewTitle}
                disabled={!newTitleInput.trim() || newTitleInput === activeChat?.projectName}
                className={`px-6 py-2 text-xs font-bold rounded-sm transition-colors ${
                  !newTitleInput.trim() || newTitleInput === activeChat?.projectName
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-[#F5F216] hover:bg-gray-800'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}