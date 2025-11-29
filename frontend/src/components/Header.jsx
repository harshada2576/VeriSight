import React from 'react'

export default function Header({ onNavigate = ()=>{} }){
  return (
    <header className="py-4 px-6 border-b border-white/4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#123157] to-[#062033] flex items-center justify-center text-sm font-bold">VS</div>
          <div>
            <div className="text-lg font-semibold">VeriSight</div>
            <div className="text-xs text-white/60">AI Fake Video Detection</div>
          </div>
        </div>

        <nav className="flex gap-4 items-center text-sm">
          <button onClick={()=>onNavigate('home')} className="hover:underline">Home</button>
          <button onClick={()=>onNavigate('how')} className="hover:underline">How It Works</button>
          <button onClick={()=>onNavigate('pricing')} className="hover:underline">Pricing</button>
          <button onClick={()=>onNavigate('demo')} className="hover:underline">Demo</button>
        </nav>
      </div>
    </header>
  )
}
