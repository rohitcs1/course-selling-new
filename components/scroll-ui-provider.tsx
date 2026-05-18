'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type ScrollUiContextValue = {
  headerHidden: boolean
}

const ScrollUiContext = createContext<ScrollUiContextValue | null>(null)

export function ScrollUiProvider({ children }: { children: React.ReactNode }) {
  const [headerHidden, setHeaderHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY <= 48) {
        setHeaderHidden(false)
        return
      }

      if (currentScrollY >= 120) {
        setHeaderHidden(true)
        return
      }

      setHeaderHidden(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const value = useMemo(() => ({ headerHidden }), [headerHidden])

  return <ScrollUiContext.Provider value={value}>{children}</ScrollUiContext.Provider>
}

export function useScrollUi() {
  const context = useContext(ScrollUiContext)
  if (!context) {
    throw new Error('useScrollUi must be used within ScrollUiProvider')
  }
  return context
}
