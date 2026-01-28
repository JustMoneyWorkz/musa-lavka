import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Icon } from '@/components/ui/Icon'
import { useUIStore } from '@/store/uiStore'
import { products, popularSearches } from '@/data/products'

const SEARCH_HISTORY_KEY = 'lavka-search-history'

function getSearchHistory(): string[] {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch {
    return []
  }
}

function saveSearchHistory(query: string) {
  try {
    const history = getSearchHistory()
    const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 5)
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  } catch {}
}

function clearSearchHistory() {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  } catch {}
}

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useUIStore()
  const [isFocused, setIsFocused] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchHistory(getSearchHistory())
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return products
      .filter(p => p.name.toLowerCase().includes(query))
      .slice(0, 5)
      .map(p => p.name)
  }, [searchQuery])

  const handleClear = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  const handleSelectSuggestion = (text: string) => {
    setSearchQuery(text)
    saveSearchHistory(text)
    setSearchHistory(getSearchHistory())
    setShowDropdown(false)
    inputRef.current?.blur()
  }

  const handleFocus = () => {
    setIsFocused(true)
    setShowDropdown(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setTimeout(() => setShowDropdown(false), 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      saveSearchHistory(searchQuery.trim())
      setSearchHistory(getSearchHistory())
      setShowDropdown(false)
      inputRef.current?.blur()
    }
  }

  const handleClearHistory = () => {
    clearSearchHistory()
    setSearchHistory([])
  }

  const showSuggestions = searchQuery.trim() && suggestions.length > 0
  const showHistory = !searchQuery.trim() && searchHistory.length > 0
  const showPopular = !searchQuery.trim() && !showHistory

  return (
    <div className="px-4 py-2 relative">
      <motion.div
        ref={containerRef}
        animate={{
          boxShadow: isFocused
            ? '0 0 0 2px rgba(252, 211, 77, 0.6)'
            : '0 0 0 0px rgba(252, 211, 77, 0)',
        }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center bg-gray-100 rounded-full overflow-hidden"
      >
        <Icon 
          name="search" 
          size={20} 
          className={`absolute left-4 transition-colors duration-200 ${isFocused ? 'text-lavka-yellow-hover' : 'text-gray-400'}`}
        />
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Найти орехи, сухофрукты..."
          className="w-full h-12 pl-12 pr-10 bg-transparent text-base placeholder:text-gray-400 outline-none"
        />
        
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClear}
              className="absolute right-3 p-1.5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
            >
              <Icon name="close" size={12} className="text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showDropdown && (showSuggestions || showHistory || showPopular) && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {showSuggestions && (
              <div className="p-2">
                {suggestions.map((text, idx) => (
                  <button
                    key={idx}
                    onMouseDown={() => handleSelectSuggestion(text)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <Icon name="search" size={16} className="text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{text}</span>
                  </button>
                ))}
              </div>
            )}

            {showHistory && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-1.5">
                  <span className="text-xs font-medium text-gray-500">Недавние</span>
                  <button 
                    onMouseDown={handleClearHistory}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Очистить
                  </button>
                </div>
                {searchHistory.map((text, idx) => (
                  <button
                    key={idx}
                    onMouseDown={() => handleSelectSuggestion(text)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <Icon name="clock" size={16} className="text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-700 truncate">{text}</span>
                  </button>
                ))}
              </div>
            )}

            {showPopular && (
              <div className="p-2">
                <div className="px-3 py-1.5">
                  <span className="text-xs font-medium text-gray-500">Популярное</span>
                </div>
                <div className="flex flex-wrap gap-2 px-3 pb-2">
                  {popularSearches.map((text, idx) => (
                    <button
                      key={idx}
                      onMouseDown={() => handleSelectSuggestion(text)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
