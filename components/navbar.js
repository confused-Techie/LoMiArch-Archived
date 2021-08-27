import { Header, Avatar, Dropdown, useTheme } from '@primer/components'
import { useEffect, useState } from "react";

function Navbar() {

  const { setColorMode, resolvedColorMode } = useTheme();
  // setColorMode: Allows changes of the current ColorMode
  // resolvedColorMode: is the currently used ColorMode [ night, day, auto]
  // colorMode: seems to mirror resolvedColorMode
  // colorScheme: is the currently used ColorScheme [ light, dark, dark_dimmed ]
  // nightScheme: The colorScheme used when ColorMode == night
  // dayScheme: The ColorScheme used when ColorMode == day

  const [ cookieTheme, setCookieTheme ] = useState('day');

  useEffect(() => {
    const tempTheme = localStorage.getItem("theme") || 'day'
    setCookieTheme(tempTheme)
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", cookieTheme);
    setColorMode(cookieTheme);
  }, [cookieTheme])

  function setDarkMode() {
    setCookieTheme('night');
  }

  function setLightMode() {
    setCookieTheme('day');
  }




  return (
    <>
      <Header>
        <Header.Item>
          <Header.Link href="/" fontSize={2}>
            <span>LoMiArch</span>
          </Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/">Dashboard</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/albums">Albums</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/gallery/default">Gallery</Header.Link>
        </Header.Item>
        <Header.Item full={true}>
          <Header.Link href="/tools">Tools</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/about">About</Header.Link>
        </Header.Item>
        <Header.Item>
          <Dropdown>
            <Dropdown.Button>
              <span>Theme</span>
            </Dropdown.Button>
            <Dropdown.Menu direction="sw">
              <Dropdown.Item onClick={setDarkMode}>Dark Mode</Dropdown.Item>
              <Dropdown.Item onClick={setLightMode}>Light Mode</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Header.Item>
        <Header.Item mr={0}>
          <Dropdown>
            <Dropdown.Button>
              <Avatar src="https://avatars.githubusercontent.com/github" sx={{mr: 1}}/>
              <span>Andy</span>
            </Dropdown.Button>
            <Dropdown.Menu direction="sw">
              <Dropdown.Item>Account</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Header.Item>
      </Header>
    </>
  )
}

export default Navbar
