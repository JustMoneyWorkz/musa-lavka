import { useEffect, useState, useCallback } from 'react'
import type { TelegramUser } from '@/types'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: TelegramUser
          query_id?: string
          auth_date?: number
          hash?: string
        }
        ready: () => void
        expand: () => void
        close: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          setText: (text: string) => void
          setParams: (params: { text?: string; color?: string; text_color?: string; is_active?: boolean; is_visible?: boolean }) => void
        }
        BackButton: {
          isVisible: boolean
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
        }
        themeParams: {
          bg_color?: string
          text_color?: string
          hint_color?: string
          link_color?: string
          button_color?: string
          button_text_color?: string
        }
        colorScheme: 'light' | 'dark'
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        platform: string
        sendData: (data: string) => void
        openLink: (url: string) => void
        openTelegramLink: (url: string) => void
        showPopup: (params: { title?: string; message: string; buttons?: Array<{ type?: string; text?: string; id?: string }> }, callback?: (buttonId: string) => void) => void
        showAlert: (message: string, callback?: () => void) => void
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
      }
    }
  }
}

const ADMIN_IDS = [123456789] // Replace with actual admin Telegram IDs

export function useTelegram() {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isTelegramApp, setIsTelegramApp] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp

    if (tg) {
      setIsTelegramApp(true)
      tg.ready()
      tg.expand()

      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }
      setIsReady(true)
    } else {
      setIsReady(true)
    }
  }, [])

  const isAdmin = user ? ADMIN_IDS.includes(user.id) : false

  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(type)
  }, [])

  const showAlert = useCallback((message: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showAlert(message)
    } else {
      alert(message)
    }
  }, [])

  const showConfirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showConfirm(message, resolve)
      } else {
        resolve(confirm(message))
      }
    })
  }, [])

  const close = useCallback(() => {
    window.Telegram?.WebApp?.close()
  }, [])

  return {
    user,
    isReady,
    isTelegramApp,
    isAdmin,
    hapticFeedback,
    showAlert,
    showConfirm,
    close,
    tg: window.Telegram?.WebApp,
  }
}
