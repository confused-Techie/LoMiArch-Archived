import Layout from '../components/layout';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { uuid } = context.query;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/details/${uuid.replace('/media/', '')}`);
  const apiDetails = await res.json();

  return { props: { apiDetails } };
}

const contentInfo = ( { apiDetails } ) => {
  // This page can be used to create albums, add things to tags/create tags, or it can go ahead and be used to delete or lock and image. 
  const router = useRouter();
  const { uuid } = router.query;

  return (
    <>
      <Layout>
        <p>{uuid}</p>
        <p>{apiDetails.gallery}</p>
      </Layout>
    </>
  )
}

export default contentInfo;
