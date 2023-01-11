import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import theme from './theme'

const MuiThemeProvider = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider