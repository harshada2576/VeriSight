import React from 'react'

const Plan = ({title, price, children, recommended}) => (
  <div className={`vs-card p-6 rounded-xl ${recommended ? 'border-2 border-[#2A6BFF]' : ''}`}>
    <div className="text-sm text-white/60">{title}</div>
    <div className="text-3xl font-bold mt-2">{price}</div>
    <div className="mt-4 text-sm text-white/70">{children}</div>
    <div className="mt-6">
      <button className="btn-primary">Get started</button>
    </div>
  </div>
)

export default function Pricing(){
  return (
    <section>
      <h2 className="text-4xl font-bold">Pricing</h2>
      <p className="text-white/70 mt-2">Start verifying your videos with powerful AI.</p>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Plan title="Free" price="$0/month">1 video per month, basic signals</Plan>
        <Plan title="Pro" price="$29/month" recommended>20 videos, priority processing</Plan>
        <Plan title="Enterprise" price="Contact">Unlimited usage, SLA & on-prem options</Plan>
      </div>
    </section>
  )
}
