import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="mt-12 py-8 text-sm text-white/60 border-t border-white/4">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div>© VeriSight — built for MumbaiHacks 2025</div>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>
    </footer>
  )
}