'use client'
import React, { ReactNode, createContext, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles';
import Navbar from './navbar';
interface ThemeProviderUpProps {
  children: ReactNode;
}
export const SearchContext = createContext({})
export default function ThemeProviderUp({children}: ThemeProviderUpProps) {
    const [mode,setMode] = useState('light')
    const [search,setSearch] = useState('')

    const theme1 = createTheme({
      palette:{
        mode:'dark'
      }
    });
    const theme2 = createTheme({
      palette:{
        mode:'light'
      }
    });
  return (
    <ThemeProvider theme={mode ==='light'?theme2:theme1}>
      <SearchContext.Provider value={{search,setSearch}}>
      <Navbar setMode={setMode} mode={mode}/>
      {children}
      </SearchContext.Provider>
    </ThemeProvider>
  )
}
