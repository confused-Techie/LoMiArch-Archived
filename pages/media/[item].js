import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const { item, place } = context.query;

  var curPage = determinePage(place);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/gallery/${item}?page=${curPage}`);
  const apiDataCur = await res.json();

  var apiDataLast = "";
  if (curPage != 1) {
    var lastPage = parseInt(curPage)-1;
    const resLast = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/gallery/${item}?page=${lastPage}`);
    apiDataLast = await resLast.json();
  }

  var nextPage = parseInt(curPage)+1;
  const resNext = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/gallery/${item}?page=${nextPage}`);
    const apiDataNext = await resNext.json();

  return { props: { apiDataCur, apiDataLast, apiDataNext } };
}

const Media = ( { apiDataCur, apiDataLast, apiDataNext }) => {
  const router = useRouter();
  const { item, place, uuid } = router.query

  const arrowRightPress = useKeyPress("ArrowRight");
  const arrowLeftPress = useKeyPress("ArrowLeft");
  const dPress = useKeyPress("d");
  const aPress = useKeyPress("a");
  const escPress = useKeyPress("Escape");

  console.log(`arrowRight: ${arrowRightPress} || arrowLeft: ${arrowLeftPress} || dPress: ${dPress} || aPress = ${aPress} || escPress = ${escPress}`);

  var currentPage = determinePage(place);

  var nextHref = returnNextImageV2(place, uuid, apiDataCur, apiDataNext);
  var lastHref = returnLastImage(place, uuid, apiDataCur, apiDataLast);

  var nextStatus = true;
  var lastStatus = true;
  try {
    if (nextHref == "false") {
      nextStatus = false;
      console.log(`Media:: Set nextStatus: ${nextStatus}`);
    }
  } catch(ex) {
    console.log(`Media:: Failed to check or set nextHref/nextStatus: ${ex}`);
  }
  try {
    if (lastHref == "false") {
      lastStatus = false;
      console.log(`Media:: Set lastStatus: ${lastStatus}`);
    }
  } catch(ex) {
    console.log(`Media:: Failed to check or set lastHref/lastStatus: ${ex}`);
  }

  if (escPress) {
    console.log("Media:: Attempting to Respond to Escape...");
    try {
      router.push(`/gallery/${item}`);
      // router.push is used here and only here because it seems the dynamic route wasn't loading properly to another directory page
      // And using it elsewhere causes pages to rapidly move foreward for as long as the button is pushed rather than just once
    } catch(ex) {
      console.log(`Media:: Escaping Failed: ${ex}`);
    }
  }
  if (arrowRightPress || dPress) {
    if (nextStatus) {
      console.log("Media:: Attempting to Respond to ArrowRight/KeyD...");
      window.location.assign(`/media/${item}?place=${parseInt(place)+1}&uuid=${nextHref}`);
    }
  }
  if (arrowLeftPress || aPress) {
    if (lastStatus) {
      console.log("Media:: Attempting to Respond to ArrowLeft/KeyA...");
      window.location.assign(`/media/${item}/?place=${parseInt(place)-1}&uuid=${lastHref}`);
    }
  }

  console.log(`Item: ${item} || Place: ${place} || Page: ${currentPage} || UUID: ${uuid}`);

  return (
    <>
      <div className="wrapper">

        <Link href={`/gallery/${item}`} scroll={false}>
          <span className="navClose">
            &times;
          </span>
        </Link>

        <Link href={lastStatus ? `/media/${item}?place=${parseInt(place)-1}&uuid=${lastHref}` : '#'}>
          <span className={lastStatus ? 'navigation prev' : 'navigation prev disabled'}>
            &#10094;
          </span>
        </Link>

        <Link href={nextStatus ? `/media/${item}?place=${parseInt(place)+1}&uuid=${nextHref}` : '#'}>
          <span className={nextStatus ? 'navigation next' : 'navigation next disabled'}>
            &#10095;
          </span>
        </Link>
        <div className="content">
          <img className="image" src={`${process.env.NEXT_PUBLIC_API_HOST}${uuid}`} alt="" />
        </div>
      </div>
    </>
  )
}

export default Media;

function determinePage(place) {
  var returnedPerPage = 10;
  if (place == 0) {
    // page is 1
    console.log("Determine Page:: Place is lowest value. Defaulting to Page 1");
    return 1;
  }  else {
    console.log(`Determine Page:: Math Page Result: ${Math.ceil((parseInt(place) + 1) / returnedPerPage)}`);
    return Math.ceil((parseInt(place) + 1) / returnedPerPage);
  }
}

function returnLastImage(place, uuid, list, listLast) {
  if (parseInt(place) != 0) {
    console.log("returnLastImage:: Within Bounds...");

    try {
      var tempLinkList = [];
      list.media.forEach(function(item, index, array) {
        tempLinkList.push(list.media[index].link);
      });
      var curIndex = tempLinkList.findIndex(item => item === uuid);
      console.log(`returnLastImage:: curIndex: ${curIndex}`);
      // The above returns the current index location we are in.

      if (curIndex == 0) {
        // This means that we need to use the listLast
        console.log("returnLastImage:: First Position: Use listLast...");
        let last = listLast.media[listLast.media.length - 1].link;
        console.log(`returnLastImage:: Last declared: ${last}`);
        return last;
      } else {
        console.log("returnLastImage:: Within Index Bounds...");
        let last = list.media[ curIndex - 1].link;
        console.log(`returnLastImage:: Last declared: ${last}`);
        return last;
      }

    } catch(ex) {
      console.log("returnLastImage:: ERROR: "+ex);
      console.log(`returnLastImage:: ERROR: Passed uuid: ${uuid}`);
      console.log(`returnLastImage:: ERROR: Passed place: ${place}`);
      console.log(`returnLastImage:: ERROR: Passed list: ${list}`);
      console.log(list);
      console.log(`returnLastImage:: ERROR: Passed listLast: ${listLast}`);
      console.log(listLast);
    }

  } else {
    console.log("returnLastImage:: End of Image List...");
    return "false";
  }
}


function returnNextImageV2(place, uuid, list, listNext) {
  // Because the method of working off pages and places has failed. Lets try this is maybe a simplier approach.
  if ( (parseInt(place) + 1)  < list.total) {
    console.log("returnNextImageV2:: Within Bounds...");

    try {
      var tempLinkList = [];
      list.media.forEach(function(item, index, array) {
        tempLinkList.push(list.media[index].link);
      });
      var curIndex = tempLinkList.findIndex(item => item === uuid);
      console.log(`returnNextImageV2:: curIndex: ${curIndex}`);
      // The above should return the index position we are currently in.
      if (curIndex + 1 == list.media.length) {
        // This would mean we are at the last position available, and need to use listNext
        console.log("returnNextImageV2:: Last Position: Use listNext...");
        let next = listNext.media[0].link;
        console.log(`returnNextImageV2:: Next Declared: ${next}`);
        return next;
      } else {
        // This should mean we are somewhere within the total index.
        console.log("returnNextImageV2:: Within Index Bounds...");
        let next = list.media[ curIndex + 1].link;
        console.log(`returnNextImageV2:: Next declared: ${next}`);
        return next;
      }

    } catch(ex) {
      console.log("returnNextImageV2:: ERROR: " + ex);
      console.log(`returnNextImageV2:: ERROR: Passed uuid: ${uuid}`);
      console.log(`returnNextImageV2:: ERROR: Passed place: ${place}`);
      console.log(`returnNextImageV2:: ERROR: Passed list: ${list}`);
      console.log(list);
      console.log(`returnNextImageV2:: ERROR: Passed listNext: ${listNext}`);
      console.log(listNext);
    }

  } else {
    console.log("returnNextImageV2:: Total amount of Items Seen.");
    return "false";
  }
}


//Hook for keypress from usehooks.com
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount && unmount
  return keyPressed;
}
