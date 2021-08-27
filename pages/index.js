import Layout from '../components/layout'
import { TextInput, LabelGroup, Label, Link } from '@primer/components'
import { SearchIcon } from '@primer/octicons-react'

export async function getServerSideProps(context) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/tags`);
  const apiTag = await res.json();

  return { props: { apiTag } };
}

function HomePage( { apiTag } ) {

  return (
    <>
      <Layout>
        <div class="dashboard_main">
          <TextInput width={1/2} variant="large" icon={SearchIcon} aria-label="Image-Search" name="Image-Search" placeholder="Search" />
        </div>
        <div class="dashboard_tag">
          <LabelGroup>
            {apiTag.map((i, index) => (

              <Link href={`/gallery/${i[0]}`}>
                <Label sx={{bg: i[1] }}>{i[0]}</Label>
              </Link>

            ))}

          </LabelGroup>
        </div>
      </Layout>
    </>
  )
}

export default HomePage
