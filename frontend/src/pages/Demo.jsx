import React from 'react'

export default function Demo(){
  const sample = {
    verdict: 'Likely manipulated',
    score: 0.82,
    reasons: ['Face blending inconsistency', 'Spectral artifact in audio', 'Temporal frame jumps']
  }

  return (
    <section>
      <h2 className="text-4xl font-bold">Demo — See VeriSight in Action</h2>
      <p className="text-white/70 mt-2">Play the sample job and explore evidence without signing in.</p>

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="vs-card p-6 rounded-xl">
          <div className="text-sm">Verdict</div>
          <div className="text-2xl font-bold mt-2">{sample.verdict}</div>
          <div className="mt-4 text-white/70">Confidence: {(sample.score*100).toFixed(0)}%</div>
          <div className="mt-4">
            <button className="btn-primary">Download Pack</button>
          </div>
        </div>

        <div className="vs-card p-6 rounded-xl md:col-span-2">
          <div className="text-sm text-white/60">Video preview (sample)</div>
          <div className="mt-4 bg-black/40 rounded p-4" style={{height:180}}>
            {/* Placeholder for video player */}
            <div className="flex items-center justify-center h-full text-white/50">Video Player Placeholder</div>
          </div>
        </div>
      </div>

      <div className="mt-8 vs-card p-6 rounded-xl">
        <h3 className="font-semibold">Explainability</h3>
        <ul className="mt-3 list-disc ml-5 text-white/70">
          {sample.reasons.map((r,i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </section>
  )
}
