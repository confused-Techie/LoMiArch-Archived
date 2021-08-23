import { Box, Flex, ThemeProvider, theme, themeGet } from '@primer/components'
import deepmerge from 'deepmerge';
import Navbar from './navbar'

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

    }
  });

  return (
    <>
      <ThemeProvider theme={customTheme} colorMode="night" dayScheme="light" nightScheme="dark">
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}
