import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-deep-trust text-white antialiased">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="vs-hero-title text-5xl">AI Fake Video<br/>Detection System</h1>
            <p className="mt-4 text-white/70 max-w-xl">Detect deepfakes and manipulated media with explainable edge AI. Fast preprocessing, multimodal signals, and a signed verification pack for provenance.</p>

            <div className="mt-6 flex gap-3">
              <Link to="/app/upload" className="btn-primary">Upload Video</Link>
              <Link to="/demo" className="btn-primary">Try the Demo</Link>
              <Link to="/how-it-works" className="btn-ghost">How it works</Link>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}           </div>
            <div className="mt-4 text-sm text-white/60">Demo preview — secure playback</div>
          </div>
        </div>
      </div>
    </section>
  )
}
