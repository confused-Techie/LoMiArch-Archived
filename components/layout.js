import { Box, Flex, ThemeProvider } from '@primer/components'
import Navbar from './navbar'

export default function Layout({ children }) {

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}
