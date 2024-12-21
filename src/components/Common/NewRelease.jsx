import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiConnecter } from "../../services/apiconnecter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AlbumRootSkeleton from "./AlbumRootSkeleton";
import ReleaseCard from "./ReleaseCard";

const NewRelease = () => {
  const query = useSelector((state) => state.User.query);
  const search = useSelector((state) => state.User.search);
  const [loader, setLoader] = useState(false);
  const [card, setCard] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [chunks, setChunks] = useState([]); // State for chunked tracks
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const formdata = new FormData();
  formdata.append("Name", query);

  // Helper function to shuffle the tracks using Fisher-Yates algorithm
  const shuffleTracks = (trackList) => {
    for (let i = trackList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trackList[i], trackList[j]] = [trackList[j], trackList[i]]; // Swap elements
    }
    return trackList;
  };

  // Helper function to chunk tracks
  const chunkTracks = (trackList) => {
    const chunked = [];
    for (let i = 0; i < trackList.length; i += 3) {
      chunked.push(trackList.slice(i, i + 3));
    }
    return chunked;
  };

  // Fetch tracks, shuffle them, and create chunks
  async function searchQuery() {
    try {
      setLoader(true);
      const res = await apiConnecter("post", "tracks/getTrack", formdata);
      let songlist = res.data.tracks;

      // Shuffle tracks before setting them
      songlist = shuffleTracks(songlist);

      // Update tracks and chunked state
      setTracks(songlist);
      setChunks(chunkTracks(songlist));
    } catch (e) {
      console.error("Error fetching tracks:", e);
    } finally {
      setLoader(false);
    }
  }

  // Handle window resize
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // Adjust Swiper slides based on window width
  useEffect(() => {
    if (windowWidth < 300) {
      setCard(1);
    } else if (windowWidth < 500) {
      setCard(2);
    } else if (windowWidth < 800) {
      setCard(4);
    } else if (windowWidth < 1000) {
      setCard(3);
    } else if (windowWidth < 1200) {
      setCard(4);
    } else {
      setCard(4);
    }
  }, [windowWidth]);

  // Initial fetch and event listeners
  useEffect(() => {
    searchQuery();
    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, [search]);

  return (
    <>
      {loader ? (
        <div className="flex flex-col">
          <div className="opacity-40 m-3 gap-2 flex flex-col">
            <Skeleton height={20} width={180} baseColor="gray" />
            <Skeleton height={140} width={180} baseColor="gray" />
          </div>
          <AlbumRootSkeleton />
        </div>
      ) : (
        <div className="mb-[10px]">
          <div className="flex items-start ml-3 flex-col text-white"></div>
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-300 mt-2 ml-2 text-xl font-bold">
              {tracks.length > 0 && "Songs"}
            </h1>
            <Swiper
              slidesPerView={card}
              spaceBetween={1}
              loop={true}
              freeMode={true}
              autoplay={{
                delay: 2500,
              }}
              className="w-full"
            >
              {chunks.map((chunk, index) => (
                <SwiperSlide key={index}>
                  <ReleaseCard song={chunk} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default NewRelease;
