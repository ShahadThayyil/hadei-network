import { useState } from 'react'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  ShieldCheck,
  HelpCircle,
  MoreVertical,
  Download,
  ChevronLeft,
  ChevronRight,
  Landmark
} from 'lucide-react'

export default function Wallet() {
  // -----------------------------
  // MOCK DATA: WALLET & RAZORPAY
  // -----------------------------
  const [walletStats] = useState({
    totalEarned: '₹8,50,000',
    pendingPayments: '₹45,000'
  })

  const [paymentRequests, setPaymentRequests] = useState([
    {
      id: 'req-001',
      client: 'TechNova Solutions',
      project: 'SaaS Dashboard Redesign',
      amount: '₹45,000',
      status: 'Pending',
      completedDate: 'Oct 20, 2026',
      requestedDate: 'Oct 21, 2026',
      reminderSent: false
    },
    {
      id: 'req-002',
      client: 'Alex Mercer',
      project: 'E-commerce Checkout Flow',
      amount: '₹15,000',
      status: 'Pending',
      completedDate: 'Oct 15, 2026',
      requestedDate: 'Oct 16, 2026',
      reminderSent: true // Already sent a reminder
    },
    {
      id: 'req-003',
      client: 'HealthSync Inc.',
      project: 'API Optimization Task',
      amount: '₹8,000',
      status: 'Transferred',
      completedDate: 'Oct 05, 2026',
      requestedDate: 'Oct 06, 2026',
      reminderSent: false
    }
  ])

  // Mocking more transactions for pagination
  const [transactions] = useState([
    { id: 1, desc: 'Payment from TechNova Solutions', date: 'Oct 08, 2026', amount: '+₹45,000', type: 'credit', status: 'Success' },
    { id: 2, desc: 'Payment from HealthSync Inc.', date: 'Oct 05, 2026', amount: '+₹8,000', type: 'credit', status: 'Success' },
    { id: 3, desc: 'Payment from FinFlow', date: 'Sep 28, 2026', amount: '+₹30,000', type: 'credit', status: 'Success' },
    { id: 4, desc: 'Payment from Alex Mercer', date: 'Sep 15, 2026', amount: '+₹12,000', type: 'credit', status: 'Success' },
    { id: 5, desc: 'Payment from Studio Design', date: 'Sep 02, 2026', amount: '+₹22,000', type: 'credit', status: 'Success' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  // Handlers
  const handleRaiseComplaint = (project) => {
    alert(`Reporting an issue regarding the payment for: ${project}\n\nOur support team will review the transaction status.`)
  }

  const handleSendReminder = (reqId) => {
    // Update local state to mark reminder as sent
    setPaymentRequests(prev => prev.map(req => 
      req.id === reqId ? { ...req, reminderSent: true } : req
    ))
    alert("Payment reminder sent to the client successfully.")
  }

  // Pagination Logic
  const filteredTransactions = transactions.filter(txn => 
    txn.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-white text-black font-sans overflow-y-auto custom-scrollbar">
      
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-10 pb-10">
        
        {/* ==================== PAGE HEADER ==================== */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Wallet & Payments</h1>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <ShieldCheck size={16} className="text-blue-600" />
              <span>Payments routed directly via <span className="text-[#072654] font-black tracking-wide">Razorpay</span></span>
            </div>
          </div>
        </header>

        {/* ==================== STATS OVERVIEW ==================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 rounded-sm bg-gray-50">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Earned</p>
            <h2 className="text-4xl font-medium text-black tracking-tight mb-4">{walletStats.totalEarned}</h2>
            <p className="text-xs font-bold text-gray-500">Total earnings accumulated via Hadei Network</p>
          </div>
          
          <div className="p-6 border border-gray-200 rounded-sm bg-white">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock size={14} /> Pending Payment Requests
            </p>
            <h2 className="text-4xl font-medium text-black tracking-tight mb-4">{walletStats.pendingPayments}</h2>
            <p className="text-xs font-bold text-gray-500">Awaiting client transfer</p>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
          
          {/* ==================== LEFT COLUMN: PAYMENT REQUESTS ==================== */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-black">Payment Requests</h3>
            </div>

            <div className="flex flex-col gap-4">
              {paymentRequests.map((req) => (
                <div key={req.id} className="p-5 border border-gray-200 rounded-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Request Info */}
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-black mb-1">{req.project}</h4>
                    <p className="text-sm text-gray-600 font-medium mb-3">Client: <span className="text-black">{req.client}</span></p>
                    
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                      <span>Completed: {req.completedDate}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>Requested: {req.requestedDate}</span>
                    </div>
                  </div>

                  {/* Status & Amount */}
                  <div className="flex flex-col md:items-end gap-2 shrink-0 md:w-32">
                    <span className="text-xl font-bold text-black">{req.amount}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${
                      req.status === 'Transferred' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                    }`}>
                      {req.status === 'Transferred' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {req.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0 md:w-36 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <button 
                      onClick={() => handleSendReminder(req.id)}
                      disabled={req.status === 'Transferred' || req.reminderSent}
                      className={`w-full py-2 rounded-sm text-xs font-bold transition-colors ${
                        req.status === 'Transferred' || req.reminderSent
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-transparent'
                          : 'bg-white border border-gray-200 text-black hover:bg-gray-50'
                      }`}
                    >
                      {req.reminderSent ? 'Reminder Sent' : 'Send Reminder'}
                    </button>
                    
                    <button 
                      onClick={() => handleRaiseComplaint(req.project)}
                      className="w-full py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 transition-colors bg-white text-gray-600 border border-gray-200 hover:text-red-600 hover:border-red-200"
                    >
                      <AlertCircle size={14} /> Report Issue
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: BANK INFO ==================== */}
          <div className="flex flex-col gap-6">
            
            <div className="p-6 border border-gray-200 rounded-sm bg-gray-50">
              <h3 className="text-sm font-bold text-black flex items-center gap-2 mb-4">
                <Landmark size={18} className="text-gray-500" /> Linked Bank Account
              </h3>
              
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-sm mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                    HD
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black">HDFC Bank ****4589</p>
                    <p className="text-[10px] font-bold text-green-600 uppercase">Primary • Verified</p>
                  </div>
                </div>
                <MoreVertical size={16} className="text-gray-400 cursor-pointer" />
              </div>

              <p className="text-[10px] font-medium text-gray-500 mt-2 leading-relaxed">
                Payments marked as "Transferred" are directly credited to this primary bank account. Settled within T+1 days.
              </p>
            </div>

          </div>
        </div>

        {/* ==================== TRANSACTION HISTORY ==================== */}
        <section className="mt-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
            <h3 className="text-xl font-bold text-black">Transaction History</h3>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset to page 1 on search
                  }}
                  className="w-full bg-white border border-gray-200 rounded-sm pl-9 pr-4 py-2 text-sm outline-none focus:border-black transition-colors"
                />
              </div>
              
              <button className="bg-white border border-gray-200 text-black px-4 py-2 rounded-sm text-sm font-bold hover:bg-gray-50 transition-colors flex items-center gap-2 shrink-0">
                <Download size={16} /> <span className="hidden sm:inline">Statement</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction Details</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((txn, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {txn.type === 'credit' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                          </div>
                          <span className="text-sm font-bold text-black">{txn.desc}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-600">
                        {txn.date}
                      </td>
                      <td className={`py-4 px-6 text-sm font-bold text-right ${
                        txn.type === 'credit' ? 'text-green-600' : 'text-black'
                      }`}>
                        {txn.amount}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${
                          txn.status === 'Success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-sm font-medium text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs font-bold text-gray-500">
                Showing page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-200 rounded-sm text-gray-500 hover:text-black hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-200 rounded-sm text-gray-500 hover:text-black hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </section>

      </div>
    </div>
  )
}