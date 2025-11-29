import React from 'react'

const Step = ({title, children}) => (
  <div className="vs-card p-6 rounded-xl">
    <div className="text-lg font-semibold">{title}</div>
    <div className="mt-2 text-sm text-white/70">{children}</div>
  </div>
)

export default function HowItWorks(){
  return (
    <section>
      <h2 className="text-4xl font-bold">How It Works</h2>
      <p className="text-white/70 mt-2 max-w-2xl">A concise visual pipeline: Upload → Preprocess → AI Analysis → Fusion → Decision → Signed Pack</p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Step title="Upload">Drop or paste a URL. Files can be uploaded directly or presigned to storage.</Step>
        <Step title="Preprocessing">FFmpeg extracts frames, audio features and metadata.</Step>
        <Step title="AI Analysis">Multiple lightweight vision & audio models generate explainable signals.</Step>
        <Step title="Fusion">Signals are fused to compute a confidence score and reasons.</Step>
        <Step title="Decision">Auto decision + human reviewer workflow for sensitive cases.</Step>
        <Step title="Verification Pack">Pack contains JSON, hashes, and a signature for provenance.</Step>
      </div>
    </section>
  )
}
