import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>

    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 lg:px-10">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🛍️ MyStore
        </Link>
      </div>
    </header>


    </div>
  )
}

export default Header