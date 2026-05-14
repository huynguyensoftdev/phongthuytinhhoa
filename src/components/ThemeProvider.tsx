'use client'

import { createContext, useContext, useCallback, useState } from 'react'

export type Theme = 'cream' | 'dark' | 'jade'

const STORAGE_KEY = 'tinhhoa-theme'
const THEME_LABEL: Record<Theme, string> = { cream: 'Kem', dark: 'Huyền', jade: 'Ngọc' }
const THEME_DOT: Record<Theme, string> = { cream: 'bg-[#b8860b]', dark: 'bg-[#c4952e]', jade: 'bg-[#0d7377]' }

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'cream',
  setTheme: () => {},
})

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode; initialTheme: Theme }) {
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem(STORAGE_KEY, t)
    document.documentElement.setAttribute('data-theme', t)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-1.5">
      {(Object.keys(THEME_LABEL) as Theme[]).map(t => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`theme-dot ${THEME_DOT[t]} ${theme === t ? 'active' : 'opacity-50 hover:opacity-80'}`}
          title={THEME_LABEL[t]}
          aria-label={THEME_LABEL[t]}
        />
      ))}
    </div>
  )
}
