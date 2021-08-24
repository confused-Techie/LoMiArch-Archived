import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { logging } from '../../components/logger';

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

  logging('media', `arrowRight: ${arrowRightPress} || arrowLeft: ${arrowLeftPress} || dPress: ${dPress} || aPress = ${aPress} || escPress = ${escPress}`);

  var currentPage = determinePage(place);

  var nextHref = returnNextImageV2(place, uuid, apiDataCur, apiDataNext);
  var lastHref = returnLastImage(place, uuid, apiDataCur, apiDataLast);

  var nextStatus = true;
  var lastStatus = true;
  try {
    if (nextHref == "false") {
      nextStatus = false;
      logging('media', `Set nextStatus: ${nextStatus}`);
    }
  } catch(ex) {
    logging('media', `Failed to check or set nextHref/nextStatus: ${ex}`);
  }
  try {
    if (lastHref == "false") {
      lastStatus = false;
      logging('media', `Set lastStatus: ${lastStatus}`);
    }
  } catch(ex) {
    logging('media', `Failed to check or set lastHref/lastStatus: ${ex}`);
  }

  if (escPress) {
    logging('media', "Attempting to Respond to Escape...");
    try {
      router.push(`/gallery/${item}`);
      // router.push is used here and only here because it seems the dynamic route wasn't loading properly to another directory page
      // And using it elsewhere causes pages to rapidly move foreward for as long as the button is pushed rather than just once
    } catch(ex) {
      logging('media', `Escaping Failed: ${ex}`);
    }
  }
  if (arrowRightPress || dPress) {
    if (nextStatus) {
      logging('media', "Attempting to Respond to ArrowRight/KeyD...");
      window.location.assign(`/media/${item}?place=${parseInt(place)+1}&uuid=${nextHref}`);
    }
  }
  if (arrowLeftPress || aPress) {
    if (lastStatus) {
      logging('media', "Attempting to Respond to ArrowLeft/KeyA...");
      window.location.assign(`/media/${item}/?place=${parseInt(place)-1}&uuid=${lastHref}`);
    }
  }

  logging('media', `Item: ${item} || Place: ${place} || Page: ${currentPage} || UUID: ${uuid}`);

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
    logging('determinePage', "Place is lowest value. Defaulting to Page 1");
    return 1;
  }  else {
    logging('determinePage', `Math Page Result: ${Math.ceil((parseInt(place) + 1) / returnedPerPage)}`);
    return Math.ceil((parseInt(place) + 1) / returnedPerPage);
  }
}

function returnLastImage(place, uuid, list, listLast) {
  if (parseInt(place) != 0) {
    logging('returnlastimage', "Within Bounds...");

    try {
      var tempLinkList = [];
      list.media.forEach(function(item, index, array) {
        tempLinkList.push(list.media[index].link);
      });
      var curIndex = tempLinkList.findIndex(item => item === uuid);
      logging('returnlastimage', `curIndex: ${curIndex}`);
      // The above returns the current index location we are in.

      if (curIndex == 0) {
        // This means that we need to use the listLast
        logging('returnlastimage', "First Position: Use listLast...");
        let last = listLast.media[listLast.media.length - 1].link;
        logging('returnlastimage', `Last declared: ${last}`);
        return last;
      } else {
        logging('returnlastimage', "Within Index Bounds...");
        let last = list.media[ curIndex - 1].link;
        logging('returnlastimage', `Last declared: ${last}`);
        return last;
      }

    } catch(ex) {
      logging('returnlastimage', ex, 'error');
      logging('returnlastimage', `Passed uuid: ${uuid}`, 'error');
      logging('returnlastimage', `Passed place: ${place}`, 'error');
      logging('returnlastimage', `Passed list: ${list}`, 'error');
      console.log(list);
      logging('returnlastimage', `Passed listLast: ${listLast}`, 'error');
      console.log(listLast);
    }

  } else {
    logging('returnlastimage', "End of Image List...", 'info');
    return "false";
  }
}


function returnNextImageV2(place, uuid, list, listNext) {
  // Because the method of working off pages and places has failed. Lets try this is maybe a simplier approach.
  if ( (parseInt(place) + 1)  < list.total) {
    logging('returnnextimagev2', "Within Bounds...");

    try {
      var tempLinkList = [];
      list.media.forEach(function(item, index, array) {
        tempLinkList.push(list.media[index].link);
      });
      var curIndex = tempLinkList.findIndex(item => item === uuid);
      logging('returnnextimagev2', `curIndex: ${curIndex}`);
      // The above should return the index position we are currently in.
      if (curIndex + 1 == list.media.length) {
        // This would mean we are at the last position available, and need to use listNext
        logging('returnnextimagev2', "Last Position: Use listNext...");
        let next = listNext.media[0].link;
        logging('returnnextimagev2', `Next Declared: ${next}`);
        return next;
      } else {
        // This should mean we are somewhere within the total index.
        logging('returnnextimagev2', "Within Index Bounds...");
        let next = list.media[ curIndex + 1].link;
        logging('returnnextimagev2', `Next declared: ${next}`);
        return next;
      }

    } catch(ex) {
      logging('returnnextimagev2', ex, 'error');
      logging('returnnextimagev2', `Passed uuid: ${uuid}`, 'error');
      logging('returnnextimagev2', `Passed place: ${place}`, 'error');
      logging('returnnextimagev2', `Passed list: ${list}`, 'error');
      console.log(list);
      logging('returnnextimagev2', `Passed listNext: ${listNext}`, 'error');
      console.log(listNext);
    }

  } else {
    logging('returnnextimagev2', "Total amount of Items Seen.", 'info');
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
