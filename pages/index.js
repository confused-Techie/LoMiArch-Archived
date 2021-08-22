import Layout from '../components/layout'
import { TextInput, LabelGroup, Label, Link } from '@primer/components'
import { SearchIcon } from '@primer/octicons-react'

function HomePage() {

  return (
    <>
      <Layout>
        <div class="dashboard_main">
          <TextInput width={1/2} variant="large" icon={SearchIcon} aria-label="Image-Search" name="Image-Search" placeholder="Search" autoComplete="postal-code" />
        </div>
        <div class="dashboard_tag">
          <LabelGroup>
            <Link href="#">
              <Label>Default Label</Label>
            </Link>
            <Link href="#">
              <Label sx={{bg: 'purple' }}>Testing Purple</Label>
            </Link>
          </LabelGroup>
        </div>
      </Layout>
    </>
  )
}

export default HomePage
