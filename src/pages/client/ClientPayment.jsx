import { CreditCard, ShieldCheck, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ClientPayment() {
  const transactionHistory = [
    { id: 'TX-9021', type: 'Escrow Funded', contract: 'CON-2026-90', freelancer: 'Arjun Kumar', date: 'Oct 12, 2026', amount: '₹2,50,000' },
    { id: 'TX-8842', type: 'Escrow Funded', contract: 'CON-2026-94', freelancer: 'Neha Mathews', date: 'Sep 28, 2026', amount: '₹1,80,000' },
    { id: 'TX-7710', type: 'Payment Released', contract: 'CON-2026-80', freelancer: 'David Chen', date: 'Aug 15, 2026', amount: '₹85,000' },
  ]

  return (
    <div className="w-full h-full p-4 md:p-6 lg:p-10 bg-gray-50/30 text-black font-sans overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Escrow Wallet & Payments</h1>
            <p className="text-sm text-gray-500">Securely fund milestones and approve admin payment requests.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard size={20}/> Fund New Contract Escrow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Select Contract</label>
                <select className="w-full border border-gray-300 p-2.5 rounded-sm text-sm outline-none bg-white">
                  <option>CON-2026-90: Senior React Dev</option>
                  <option>CON-2026-94: MERN Stack Dev</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Amount (₹)</label>
                <input type="text" value="2,50,000" readOnly className="w-full border border-gray-300 p-2.5 rounded-sm text-sm bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
            </div>
            <div className="border border-gray-200 rounded-sm p-4 mb-4 bg-gray-50 flex items-center gap-3">
              <ShieldCheck className="text-green-600" size={24} />
              <p className="text-xs text-gray-600">Payments are encrypted and stored in an isolated escrow vault. Freelancers cannot access funds until approved.</p>
            </div>
            <button className="bg-black text-[#F5F216] px-6 py-3 rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors w-full md:w-auto">
              Proceed to Gateway Securely
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Release Milestone Funds</h2>
            
            <div className="border border-green-200 bg-green-50 rounded-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-green-900 flex items-center gap-2">
                  <CheckCircle2 size={16}/> Admin Verified: SaaS Dashboard Phase 3
                </h4>
                <p className="text-xs text-green-700 mt-1">Admin has verified the deliverables from Arjun Kumar. Safe to release funds.</p>
              </div>
              <button className="bg-black text-[#F5F216] px-4 py-2.5 rounded-sm text-xs font-bold hover:bg-gray-800 shrink-0">
                Authorize Escrow Release
              </button>
            </div>

            <div className="border border-gray-200 bg-gray-50 rounded-sm p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle size={16} className="text-gray-500"/> Pending Verification: E-commerce MVP
                </h4>
                <p className="text-xs text-gray-500 mt-1">Work submitted by Neha M. Admin is currently reviewing code quality.</p>
              </div>
              <button disabled className="bg-gray-200 text-gray-400 px-4 py-2.5 rounded-sm text-xs font-bold cursor-not-allowed shrink-0 border border-gray-300">
                Awaiting Admin Verification
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm h-full">
            <h2 className="text-sm font-bold mb-4 uppercase tracking-wider text-gray-500">Transaction History</h2>
            <div className="flex flex-col gap-4">
              {transactionHistory.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <ArrowUpRight size={14} className="text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none mb-1">{tx.type}</p>
                      <p className="text-[10px] text-gray-500 font-mono mb-0.5">{tx.contract}</p>
                      <p className="text-xs text-gray-600">To: {tx.freelancer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-black block">{tx.amount}</span>
                    <span className="text-[9px] text-gray-400">{tx.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}