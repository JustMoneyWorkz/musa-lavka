import { create } from 'zustand'
import type { Product } from '@/types'

interface UIState {
  isSearchOpen: boolean
  searchQuery: string
  activeCategory: string | null
  modalProduct: Product | null
  setSearchOpen: (open: boolean) => void
  setSearchQuery: (query: string) => void
  setActiveCategory: (categoryId: string | null) => void
  openProductModal: (product: Product) => void
  closeProductModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  searchQuery: '',
  activeCategory: null,
  modalProduct: null,

  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  openProductModal: (product) => set({ modalProduct: product }),
  closeProductModal: () => set({ modalProduct: null }),
}))
