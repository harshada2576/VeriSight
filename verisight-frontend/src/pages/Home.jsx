import React from 'react'

export default function Home({ go }) {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="vs-hero-title text-5xl">AI Fake Video<br/>Detection System</h1>
        <p className="mt-4 text-white/70 max-w-xl">Detect deepfakes and manipulated media with explainable edge AI. Fast preprocessing, multimodal signals, and a signed verification pack for provenance.</p>

        <div className="mt-6 flex gap-3">
          <button onClick={()=>go('demo')} className="btn-primary">Try the Demo</button>
          <button onClick={()=>go('how')} className="btn-ghost">How it works</button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-white/60">
          <div className="vs-card">Fast pipeline — FFmpeg</div>
          <div className="vs-card">Lightweight vision models</div>
          <div className="vs-card">Signed verification pack</div>
        </div>
      </div>

      <div className="relative">
        <div className="rounded-xl p-6 vs-card" style={{height:360, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div className="text-center">
            <div className="w-48 h-48 rounded-full border-2 border-white/6 flex items-center justify-center mx-auto" style={{boxShadow:'0 8px 40px rgba(42,107,255,0.08)'}}>
              {/* Placeholder circular visual */}
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="38" stroke="#2A6BFF" strokeWidth="2" opacity="0.9"/>
                <circle cx="60" cy="60" r="52" stroke="#35E2FF" strokeWidth="1" opacity="0.06"/>
              </svg>
            </div>
            <div className="mt-4 text-sm text-white/60">Demo preview — secure playback</div>
          </div>
        </div>
      </div>
    </section>
  )
}
