import { createContext, useContext, useState } from 'react'

const NavThemeContext = createContext({ onDark: false, setOnDark: () => {} })

export function NavThemeProvider({ children }) {
  const [onDark, setOnDark] = useState(false)
  return (
    <NavThemeContext.Provider value={{ onDark, setOnDark }}>
      {children}
    </NavThemeContext.Provider>
  )
}

export function useNavTheme() {
  return useContext(NavThemeContext)
}
