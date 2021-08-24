import { Flex, ThemeProvider, theme, themeGet } from '@primer/components'
import deepmerge from 'deepmerge';
import Navbar from './navbar'

import { GlobalStyles } from '../css/global';


export default function Layout({ children }) {
  // ThemeProvider: colorMode:[ day (default), night, auto (Changes with system clock)]
  // ColorScheme: Scheme associated with the colorMode, changed the mode changes which scheme is used.
  // ColorScheme: light, dark, dark_dimmed

  const customTheme = deepmerge(theme, {
    colorSchemes: {
      // customize an existing theme
      dark: {
        colors: {
          bg: {
            primary: 'coral'
          }
        }
      },
      // Adding a custom scheme
      lomiarchDark: {
        colors: {
          primary: '#30363d'
        }
      }
    }
  });

  return (
    <>
      <ThemeProvider theme={customTheme} dayScheme="light" nightScheme="dark" colorMode='day'>
        <GlobalStyles />
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}
