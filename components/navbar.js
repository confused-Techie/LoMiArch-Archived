import { Header, Avatar, Dropdown } from '@primer/components'

function Navbar() {
  return (
    <>
      <Header>
        <Header.Item>
          <Header.Link href="#" fontSize={2}>
            <span>LoMiArch</span>
          </Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/">Dashboard</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="#">Albums</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/gallery/default">Gallery</Header.Link>
        </Header.Item>
        <Header.Item full={true}>
          <Header.Link href="#">Tools</Header.Link>
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
