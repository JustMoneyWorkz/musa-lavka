import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTelegram } from '@/hooks/useTelegram'

function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  return (
    <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-base">🎁</span>
        <p className="text-sm font-medium text-gray-900">
          Промокод <span className="font-bold bg-white/30 px-1.5 py-0.5 rounded">NUTS15</span> — скидка 15%
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-gray-900/60 hover:text-gray-900 p-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export function Header() {
  const { user, isAdmin } = useTelegram()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100/50">
      <PromoBanner />
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center shadow-md">
            <span className="text-lg">🥜</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-tight">Мини-Лавка</span>
            <span className="text-[10px] text-gray-400 leading-tight">сухофрукты и орехи</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin">
              <div className="px-2 py-1 text-xs font-medium text-white bg-lavka-blue rounded-full">
                Admin
              </div>
            </Link>
          )}
          
          <div className="w-9 h-9 rounded-full overflow-hidden shadow-md cursor-pointer bg-gradient-to-br from-purple-500 to-pink-500">
            {user?.photo_url ? (
              <img 
                src={user.photo_url} 
                alt={user.first_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
                {user?.first_name?.[0] || '👤'}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
