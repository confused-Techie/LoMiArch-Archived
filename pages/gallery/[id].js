import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import React, { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from 'next/image'
import { Box } from '@primer/components'
import Link from 'next/link'

export async function getServerSideProps(context) {
  const { id } = context.query;

  // this serves as the init query to the db for retreiving data.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/gallery/${id}?page=1`);
  const data = await res.json();
  const trunData = data.media;

  // check for first content request excedding return limit
  var hasMoreTemp = true;
  if (data.total < 10) {
    hasMoreTemp = false;
  }
  return { props: { trunData, hasMoreTemp } };
}


const Gallery = ( { trunData, hasMoreTemp } ) => {
  const router = useRouter();
  const { id } = router.query;

  var [items, setItems ] = useState( trunData );
  var [page, setPage ] = useState(2);
  var [ hasMore, sethasMore ] = useState( hasMoreTemp );

  const fetchMoreData = () => {
    console.log("Items: ");
    console.log(items);

    setPage(page + 1);
    console.log("page: "+page);
    if (!hasMore) {
      // explicitly checking hasMore because of failures to recognize it when set to prevent double loading.
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}/gallery/${id}?page=${page}`)
        .then(response => response.json())
        .then(data => {
          setItems( items.concat(data.media));
          if (items.length >= data.total) {
            console.log("Total Items: "+data.total+" and total items shown: "+items.length+". Have resulted in hasMore to be false");
            sethasMore(false);
          }
        });
    }
  };


  return (
    <>
      <Layout>
        <p>NewGallery type: { id}</p>

        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: 0 }}>
          {items.map((i, index) => (
              <Box sx={{ p: 1, borderColor: 'border.primary', borderWidth: 1, borderStyle: 'solid', bg: "border.primary"}}>

                <Link href={`/media/${id}?place=${index}&uuid=${i.link}`}>
                  <div style={{ position: 'relative', width: '100%', height: '400px'}} >
                    <Image src={`${process.env.NEXT_PUBLIC_API_HOST}${i.link}`} alt="Testing picture"  layout={"fill"} objectFit={"cover"} unoptimized={"true"}/>
                  </div>
                </Link>

              </Box>
          ))}
          </Box>
        </InfiniteScroll>
      </Layout>
    </>
  );
}

export default Gallery;
