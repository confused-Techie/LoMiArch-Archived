import Layout from '../components/layout';
import Image from 'next/image';
import { Box } from '@primer/components';
import Link from 'next/link';

export async function getServerSideProps(context) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/albums`);
  const apiAlbum = await res.json();

  return { props: { apiAlbum } };
}

function Albums( { apiAlbum }) {

  return (
    <>
      <Layout>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: 0 }}>
          {apiAlbum.map(( i, index) => (
            <Box sx={{ p: 1, borderColor: 'border.primary', borderWidth: 1, borderStyle: 'solid', bg: "border.primary"}}>

              <Link href={`/gallery/${i.uuid}`}>
                <div style={{ position: 'relative', width: '100%', height: '400px'}} >
                  <Image src={`${process.env.NEXT_PUBLIC_API_HOST}${i.preview}`} alt="Testing picture" layout={ "fill"} objectFit={"cover"} unoptimized={"true"} />
                </div>
              </Link>
            </Box>
          ))}
        </Box>
      </Layout>
    </>
  )
}

export default Albums;
