import React, { useEffect, useState } from 'react'
import { query } from '../../slices/UserDataSlice'
import { useSelector } from 'react-redux'
import { apiConnecter } from '../../services/apiconnecter';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/bundle';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SongList from './SongList';
import SkeletonLoading from './SkeletonLoading';

import { FaPlay, FaPause, FaRegHeart, FaHeart } from 'react-icons/fa';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import AlbumRootSkeleton from './AlbumRootSkeleton';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';
import SongCard from './SongCard';
import { useNavigate } from 'react-router-dom';
const SearchResult = () => {
  const query = useSelector((state) => state.User.query);
  const [loader, setLoader] = useState(false);
  const nevigate = useNavigate();
  const [card, setCard] = useState(0);
  const names = ["Songs", "Artist", "Albums"];

  const search = useSelector((state) => state.User.search);
  const formdata = new FormData();
  formdata.append("Name", query);
  const [tracks, settTracks] = useState([]);
  const [artist, setArtist] = useState([]);
  const [albums, setAlbum] = useState([]);
  async function searchQuery() {
    try {
      setLoader(true);
      const res = await apiConnecter("post", "tracks/getTrack", formdata);
      //console.log(res, "this is result");
      const songlist = res.data.tracks;
      const Songs = songlist.filter((song, index, self) =>
        index === self.findIndex((s) => s.Name === song.Name)
      );
      settTracks(Songs);
      setArtist(res.data.Artist);
      setAlbum(res.data.Albums);
      setLoader(false);
      //console.log(tracks[0]);
    }
    catch (e) {
      //console.log(e);
    }
  }
  useEffect(() => {
    searchQuery();
  }, [search])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);

  };

  useEffect(() => {
    if (windowWidth < 300) {
      setCard(2);
    }
    else if (windowWidth < 500) {
      setCard(3);
    }
    else if (windowWidth < 800) {
      setCard(4);
    }
    else if (windowWidth < 1000) {
      setCard(3);
    }
    else if (windowWidth < 1200) {
      setCard(4);
    }
    else setCard(6)
    // Add event listener to update window width on resize
    // getAlbums();
    searchQuery();
    window.addEventListener('resize', updateWindowWidth);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, [card, window.innerWidth, search]);


  return (
    <>
      {loader ?
        <div className='flex flex-col'>
          <div className='  opacity-40 m-3 gap-2 flex flex-col '>
         <Skeleton height={20} width={180}  baseColor='gray' />
          <Skeleton height={140} width={180} baseColor='gray'   />
          </div>
          <AlbumRootSkeleton></AlbumRootSkeleton>
          <AlbumRootSkeleton></AlbumRootSkeleton>
          <AlbumRootSkeleton></AlbumRootSkeleton>
        </div>
        : <div className='mb-[100px]'>
          <div className='flex items-start ml-3  flex-col  text-white '>
          <h1 className='text-gray-300  m-2 text-xl font-bold   '>
             {search == "" ? "For You" :"Top Result"
             }
            </h1>
           <div className='w-[150px] lg:max-w-[200px] '>
           {tracks && tracks.slice(0,1).map((album, index) => (
                      <SongCard song={album} />
                  ))}
           </div>
            
          </div>
          <div className=' flex flex-col gap-2'>
            <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
              {tracks.length > 2 && names[0]}
            </h1>
            {
              windowWidth < 500 ?
                <Swiper
                  slidesPerView={card}
                  spaceBetween={15}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {tracks.slice(0,tracks.length-1).map((album, index) => (
                    <SwiperSlide key={index}>
                      <SongCard song={album} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                :
                <Swiper
                  slidesPerView={card}
                  spaceBetween={20}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {tracks.slice(1,tracks.length).map((album, index) => (
                    <SwiperSlide key={index}>
                      <SongCard song={album} />
                    </SwiperSlide>
                  ))}
                </Swiper>
            }
          </div>
          <div className='mt-5 flex flex-col gap-2'>
            <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
              {artist.length > 0 && names[1]}
            </h1>
            {
              windowWidth < 500 ?
                <Swiper
                  slidesPerView={card}
                  spaceBetween={24}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {artist.map((artist, index) => (
                    <SwiperSlide key={index}>
                      <div key={artist._id} className=' flex flex-col gap-2 group relative p-2    items-center justify-center  min-h-[100px] lg:w-[200px]    lg:h-[200px]  sm:max-h-[125px]  rounded-md  hover:scale-105 transition-all duration-200 shadow-md   w-[125px] ' onClick={() => {

                        //console.log("clicked");
                        nevigate(`/Artist/${artist.Name}`);
                      }}>
                        {/* Use a common image for all artists, or apply a common styling */}
                        <div className='relative   flex  items-center justify-center  rounded-full object- object-center bg-repeat-round  h-[80px] w-[80px] object-contain' style={{ backgroundImage: `url(${artist.Image})` }}>

                          {/* <img src={artist.Image} alt='Artist' className='max-w-[100px] h-full max-h-[100px]  rounded-full ' /> */}
                          <button className='bg-sky-500 rounded-full p-3  group-hover:opacity-100 opacity-0 absolute  group-hover:-translate-Z-full transition-all duration-1000'>
                            <FaPlay />
                          </button>
                        </div>
                        <span className='mx-auto  text-center  text-white text-xs'>{artist.Name}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                :
                <Swiper
                  slidesPerView={card}
                  spaceBetween={20}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {artist.map((artist, index) => (
                    <SwiperSlide key={index}>
                      <div key={artist._id} className=' flex flex-col gap-2 group relative p-2    items-center justify-center    rounded-md  hover:scale-105 transition-all duration-200 shadow-md   ' onClick={() => {

                        //console.log("clicked");
                        nevigate(`/Artist/${artist.Name}`);
                      }}>
                        {/* Use a common image for all artists, or apply a common styling */}
                        <div className='relative   flex  items-center justify-center '
                        // style={{ backgroundImage: `url(${artist.Image})` }}
                        >
                          <img src={artist.Image} className='rounded-full max-w-[150px]' />

                          {/* <img src={artist.Image} alt='Artist' className='max-w-[100px] h-full max-h-[100px]  rounded-full ' /> */}

                          <button className='bg-sky-500 rounded-full p-3  group-hover:opacity-100 opacity-0 absolute  group-hover:-translate-Z-full transition-all duration-1000'>
                            <FaPlay />
                          </button>
                        </div>
                        <span className='mx-auto  text-center  text-white text-xs'>{artist.Name}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
            }
          </div>
          <div className='mt-5 flex flex-col gap-2'>
            <h1 className='text-gray-300  mt-2 ml-2 text-xl font-bold   '>
              {albums.length > 0 && names[2]}
            </h1>
            {
              windowWidth < 500 ?
                <Swiper
                  slidesPerView={card}
                  spaceBetween={24}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {albums.slice(10, 15).map((album, index) => (
                    <SwiperSlide key={index}>
                      <AlbumCard Image={album.Image} Title={album.Name} Songs={album.Songs} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                :
                <Swiper
                  slidesPerView={card}
                  spaceBetween={20}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                    delay: 2500,
                  }}
                  modules={[FreeMode, Pagination]}
                  className='w-full'
                >
                  {albums.slice(0).map((album, index) => (
                    <SwiperSlide key={index}>
                      <AlbumCard Image={album.Image} Title={album.Name} Songs={album.Songs} />
                    </SwiperSlide>
                  ))}
                </Swiper>
            }
          </div>
        </div>
      }

    </>
  )
}

export default SearchResult
